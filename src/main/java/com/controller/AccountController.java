package com.controller;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.dao.impl.AccountDaoImpl;
import com.model.Account;

@Path("/account")
public class AccountController{

	AccountDaoImpl accountDao = new AccountDaoImpl();
	/*
	@GET
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getUserList")
	public List<Account> getUserList(){
		
		List<Account> accountList = new ArrayList();
		try {
			accountList = accountDao.getUser();
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return accountList;
	}
	*/
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/insert")
	public Account insert(Account account){
		try {
			if(!"".equals(account.getName()) && !"".equals(account.getPwd()) && !"".equals(account.getPwd())){
				accountDao.insert(account);
				
				List<Account> accountList = new ArrayList();
				if("1".equals(account.getRole_id())){
					accountList = this.getAdmin();
				}else{
					accountList = this.getUser();
				}
				for(Account acc: accountList){
					if(acc.getMail().equals(account.getMail())){
						account.setId(acc.getId());
					}
				}
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return account;
	}
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/updateUser")
	public Account updateUser(Account account){
		try {
			account = accountDao.updateUser(account);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return account;
	}
	
	@DELETE
    @Path("/deleteUser/{id}")
    @Produces(MediaType.APPLICATION_JSON)
	public Account deleteUser(@PathParam("id") int id){
		Account account = new Account();
		try {
			account = accountDao.deleteUser(id);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return account;
	}
	
	@GET
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getAdmin")
	public List<Account> getAdmin() {
		
		List<Account> accountList = new ArrayList();
		try {
			accountList = accountDao.getAdmin();
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return accountList;
    }
	
	@GET
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getUser")
	public List<Account> getUser() {
		
		List<Account> accountList = new ArrayList();
		try {
			accountList = accountDao.getUser();
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return accountList;
    }
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/checkMail")
	public Account checkMail(String mail) {
		Account account = new Account();
		try {
			account = accountDao.checkMail(mail);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		
		return account;
		
    }
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/login")
	public Account login(Account account) {
		
		try {
			account = accountDao.login(account);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return account;
    }
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getByMail")
	public Account getByMail(Account account) {
		
		try {
			account = accountDao.getByMail(account);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return account;
    }
}
