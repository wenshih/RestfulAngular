package com.dao;

import java.util.List;

import com.model.Stock;

public interface IStockDao {
	
	public void insert(Stock stock) throws Throwable;
	
	public Stock delete(int id) throws Throwable;
	
	public List<Stock> getStockList(Stock stock) throws Throwable;

}
