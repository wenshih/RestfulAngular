package com.controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.jsoup.nodes.Element;

import com.github.abola.crawler.CrawlerPack;
import com.model.Stock;

@Path("/stock")
public class StockController{

	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getStock")
	public List<String> getStock(Stock stock) throws Exception{
		
		List<String> key = new ArrayList<String>();
		
		String uri = "https://tw.stock.yahoo.com/q/q?s="+ stock.getStockId();
		
		Element  table;
		//標頭
        table = CrawlerPack.start().setRemoteEncoding("big5").getFromHtml(uri).select("center>table").get(1).select("table").get(0);
        //內容        
        table = CrawlerPack.start().setRemoteEncoding("big5").getFromHtml(uri).select("center>table").get(1).select("table").get(1);
		
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
        return key;
	}
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getStockHistory")
	public List<String> getStockHistory(Stock stock) throws Exception{
		
		String url = "http://www.twse.com.tw/ch/trading/exchange/STOCK_DAY/STOCK_DAYMAIN.php";
		List<String> key = sendReq(url, "", stock.getYear(), stock.getMonth(), stock.getStockId(), "查詢");
		return key;
	}
	
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
		//table = CrawlerPack.start().setRemoteEncoding("big5").htmlToJsoupDoc(result.toString()).select("table").get(0);
		table = CrawlerPack.start().setRemoteEncoding("utf-8").htmlToJsoupDoc(result.toString()).select("table").get(0);
		//table = CrawlerPack.start().htmlToJsoupDoc(result.toString()).select("table").get(0);
		System.out.println(table);
		//Element th;//標頭
		Element td;//內容
		//th = table.select("thead").get(0);
		td = table.select("tbody").get(0);
		/*
		for(int i=0; i<th.select("tr").get(1).getElementsByTag("td").size(); i++){
			//String s1 = th.select("tr").get(1).getElementsByTag("td").eq(i).text();
			//byte[] bytes = s1.getBytes("big5"); // Charset to encode into
			//String s2 = new String(bytes, "big5");
			//key.add(s2);
			key.add(th.select("tr").get(1).getElementsByTag("td").eq(i).text());
		}
		*/
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
