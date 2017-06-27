package com.dao;

import com.model.Stock;

public interface IStockDao {
	
	public void insert(Stock stock) throws Throwable;
	
	public Stock delete(int id) throws Throwable;

}
