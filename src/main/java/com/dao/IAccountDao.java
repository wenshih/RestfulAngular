package com.dao;

import java.util.List;

import com.model.Account;

public interface IAccountDao {
	
	public void insert(Account account) throws Throwable;
	
	public Account checkMail(String mail) throws Throwable;
	
	public Account login(Account account) throws Throwable;
	
	public List<Account> getUser() throws Throwable;
	
	public Account updateUser(Account account) throws Throwable;
	
	public Account deleteUser(int id) throws Throwable;
	
	public List<Account> getAdmin() throws Throwable;
	
	public Account getByMail(Account account) throws Throwable;
}
