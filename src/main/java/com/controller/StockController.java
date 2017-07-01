package com.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import com.dao.impl.AccountDaoImpl;
import com.dao.impl.StockDaoImpl;
import com.github.abola.crawler.CrawlerPack;
import com.model.Stock;

@Path("/stock")
public class StockController{

	StockDaoImpl stockDao = new StockDaoImpl();
	AccountDaoImpl accountDao = new AccountDaoImpl();
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getStock")
	public List<String> getStock(Stock stock) throws Exception{
		
		List<String> key = new ArrayList<String>();
		
		String uri = "https://tw.stock.yahoo.com/q/q?s="+ stock.getStockId();
		
		Element  table;
		//標頭
        //table = CrawlerPack.start().setRemoteEncoding("big5").getFromHtml(uri).select("center>table").get(1).select("table").get(0);
        //內容
		Elements tables = CrawlerPack.start().setRemoteEncoding("big5").getFromHtml(uri).select("center>table").get(1).select("table");
		if(tables.size() > 1){
			table = tables.get(1);
			System.out.println("--------------------------------------------------");
	        
	        for(int i=0; i<table.getElementsByTag("th").size();i++){
	        	if(table.getElementsByTag("th").eq(i).hasAttr("align")){
		        	key.add(table.getElementsByTag("th").eq(i).text());
		        }
	        	if(table.getElementsByTag("td").eq(i).hasAttr("align") && !table.getElementsByTag("td").eq(i).hasClass("tt")){
	        		key.add(table.getElementsByTag("td").eq(i).text());
	        	}
	        }
	        System.out.println(key);
		}
        
        return key;
	}
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getStockHistory")
	public List<String> getStockHistory(Stock stock) throws Exception{
		/*舊的url
		String url = "http://www.twse.com.tw/ch/trading/exchange/STOCK_DAY/STOCK_DAYMAIN.php";
		List<String> key = sendReq(url, "", stock.getYear(), stock.getMonth(), stock.getStockId(), "查詢");
		*/
		String searchDate = stock.getYear()+stock.getMonth()+stock.getDate();
		String url = "http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date="+searchDate+"&stockNo="+stock.getStockId()+"&_=1497346180394";
		List<String> key = newUrl(url);
		return key;
	}
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/insert")
	public Stock insert(Stock stock){
		
		try {
			String url = "http://www.twse.com.tw/zh/api/codeQuery?query=0056&_=1498469717093";
			List<String> key = getStockNameUrl(url);
			stock.setStockName(key.get(1).split(" ")[1]);
			//加入的年月日
			Calendar ca = Calendar.getInstance();
		    int year = ca.get(Calendar.YEAR);//年
		    int month = ca.get(Calendar.MONTH);//月 
		    int day = ca.get(Calendar.DATE);//日
			stock.setYear(String.valueOf(year));
			stock.setMonth(String.valueOf(month));
			stock.setDate(String.valueOf(day));
			//insert
			stockDao.insert(stock);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		
		return stock;
	}
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getStockList")
	public List<Stock> getStockList(Stock stock){
		List<Stock> stockList = new ArrayList<Stock>();
		stockList = stockDao.getStockList(stock);
		return stockList;
	}
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/updateStock")
	public Stock updateUser(Stock stock){
		try {
			stock = stockDao.updateStock(stock);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return stock;
	}
	
	@DELETE
    @Path("/deleteStock/{id}")
    @Produces(MediaType.APPLICATION_JSON)
	public Stock deleteStock(@PathParam("id") int id){
		Stock stock = new Stock();
		try {
			stock = stockDao.delete(id);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return stock;
	}
	
	/**
	 * 新的url
	 * @param url
	 * @return
	 */
	public List<String> newUrl(String url){
		List<String> key = new ArrayList<String>();
		Document doc = CrawlerPack.start().setRemoteEncoding("big5").getFromJson(url);
		key.add(doc.select("title").text());
		key.add(doc.select("array").text());
		key.add(doc.select("fields").text());
		return key;
	}
	
	/**
	 * 取得股票名稱
	 * @param url
	 * @return
	 */
	public List<String> getStockNameUrl(String url){
		List<String> key = new ArrayList<String>();
		Document doc = CrawlerPack.start().setRemoteEncoding("big5").getFromJson(url);
		key.add(doc.select("query").text());
		key.add(doc.select("suggestions").text());
		return key;
	}
	
	/**
	 * 舊的url使用
	 * @param url
	 * @param download
	 * @param query_year
	 * @param query_month
	 * @param CO_ID
	 * @param query_button
	 * @return
	 * @throws Exception
	 */
	public List<String> sendReq(String url,String download,String query_year, String query_month, String CO_ID, String query_button) throws Exception{
		
		CloseableHttpClient client = HttpClientBuilder.create().build();
		HttpPost post = new HttpPost(url);

		// add header
		post.setHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");
		//post.setHeader("Accept-Language", "zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4");

		List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
		urlParameters.add(new BasicNameValuePair("download", download));
		urlParameters.add(new BasicNameValuePair("query_year", query_year));
		urlParameters.add(new BasicNameValuePair("query_month", query_month));
		urlParameters.add(new BasicNameValuePair("CO_ID", CO_ID));
		urlParameters.add(new BasicNameValuePair("query-button", query_button));

		post.setEntity(new UrlEncodedFormEntity(urlParameters));

		HttpResponse response = client.execute(post);
		System.out.println("Response Code : "+ response.getStatusLine().getStatusCode());

		BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));

		StringBuffer result = new StringBuffer();
		String line = "";
		while ((line = rd.readLine()) != null) {
			result.append(line);
		}
		
		List<String> key = new ArrayList<String>();
		Element  table;
		//formate
		table = CrawlerPack.start().setRemoteEncoding("utf-8").htmlToJsoupDoc(result.toString()).select("table").get(0);
		System.out.println(table);
		Element td;//內容
		td = table.select("tbody").get(0);
		
		for(int i=0; i<td.getElementsByTag("tr").size(); i++){
			String content = "<tr>";
			for(int j=0; j<td.getElementsByTag("tr").get(i).getElementsByTag("td").size(); j++){
				//key.add(td.getElementsByTag("tr").get(i).getElementsByTag("td").eq(j).text());
				String text = td.getElementsByTag("tr").get(i).getElementsByTag("td").eq(j).text();
				content += "<td class=\"borderCss\">"+text+"</td>";
			}
			content += "</tr>";
			key.add(content);
		}
		System.out.println(key);
		return key;
	 }
    
}
