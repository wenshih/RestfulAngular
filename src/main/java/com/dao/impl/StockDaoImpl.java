package com.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.dao.IStockDao;
import com.dao.connection.GetConnection;
import com.model.Stock;

public class StockDaoImpl implements IStockDao {

	@Override
	public void insert(Stock stock) throws Throwable {
		
		StringBuilder sql = new StringBuilder();
		sql.append("INSERT INTO STOCK (id, stockId, stockName, account_id, date, month, year, cost, profit) ");
		sql.append("VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
		GetConnection database= new GetConnection();
	    Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql.toString());
			
			ps.setInt(1, stock.getId());
			ps.setString(2, stock.getStockId());
			ps.setString(3, stock.getStockName());
			ps.setInt(4, stock.getAccount_id());
			ps.setString(5, stock.getDate());
			ps.setString(6, stock.getMonth());
			ps.setString(7, stock.getYear());
			ps.setInt(8, stock.getCost());
			ps.setInt(9, stock.getProfit());
			ps.executeUpdate();
			ps.close();
		}catch (Exception e) {
			e.printStackTrace();
		}finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {}
			}
		}
	}

	@Override
	public Stock delete(int id) throws Throwable {
		Stock stock = new Stock();
		String sql = "DELETE FROM STOCK.STOCK WHERE ID = '"+id+"';";
		GetConnection database= new GetConnection();
		Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ps.executeUpdate();
			ps.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
			
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {}
			}
		}
		
		return stock;
	}

	@Override
	public List<Stock> getStockList(Stock stock){
		List<Stock> stockList = new ArrayList<Stock>();
		
		StringBuilder sql = new StringBuilder();
		
		sql.append("SELECT * FROM STOCK.STOCK WHERE ACCOUNT_ID="+stock.getAccount_id());
		GetConnection database= new GetConnection();
		Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql.toString());
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()){
				Stock stockData = new Stock();
				stockData.setId(rs.getInt("id"));
				stockData.setStockId(rs.getString("stockId"));
				stockData.setStockName(rs.getString("stockName"));
				stockData.setAccount_id(rs.getInt("account_id"));
				stockData.setCost(rs.getInt("cost"));
				stockData.setProfit(rs.getInt("profit"));
				stockList.add(stockData);
			}
			
			ps.close();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {}
			}
		}
		
		return stockList;
	}
	
public Stock updateStock(Stock stock) throws Throwable {
		
		String sql = "UPDATE STOCK.STOCK SET COST = ? WHERE ID = ?;";
		GetConnection database= new GetConnection();
		Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ps.setInt(1, stock.getCost());
			ps.setInt(2, stock.getId());
			ps.executeUpdate();
			ps.close();
		} catch (SQLException e) {
			throw new RuntimeException(e);
			
		} finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {}
			}
		}
		return stock;
	}

}
