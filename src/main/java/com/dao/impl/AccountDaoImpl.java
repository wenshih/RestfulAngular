package com.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.dao.IAccountDao;
import com.dao.connection.GetConnection;
import com.model.Account;

public class AccountDaoImpl implements IAccountDao{
	
	
	public void insert(Account account) {
		
		String sql = "INSERT INTO account (id, name, pwd, mail, role_id) VALUES (?, ?, ?, ?, ?)";
		GetConnection database= new GetConnection();
	    Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			
			ps.setInt(1, account.getId());
			ps.setString(2, account.getName());
			ps.setString(3, account.getPwd());
			ps.setString(4, account.getMail());
			ps.setInt(5, account.getRole_id());
			ps.executeUpdate();
			ps.close();
		} catch (Exception e) {
			e.printStackTrace();
		}finally {
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {}
			}
		}
	}

	public Account checkMail(String mail) throws Throwable {
		
		Account account = new Account();
		String sql = "SELECT * FROM STOCK.ACCOUNT WHERE MAIL='"+mail+"'";
		GetConnection database= new GetConnection();
		Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			
			String mailStr = null;
			if(rs.next()){
				mailStr = rs.getString("mail");
			}
			account.setMail(mailStr);
			
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
		
		return account;
	}

	public Account login(Account account) throws Throwable {
		
		String sql = "SELECT * FROM STOCK.ACCOUNT WHERE MAIL='"+account.getMail()+"' AND PWD='"+account.getPwd()+"'";
		GetConnection database= new GetConnection();
		Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			
			String mailStr = null;
			String pwdStr = null;
			String nameStr = null;
			int roleIdInt = 0;
			if(rs.next()){
				mailStr = rs.getString("mail");
				pwdStr = rs.getString("pwd");
				nameStr = rs.getString("name");
				roleIdInt = rs.getInt("role_id");
			}
			account.setMail(mailStr);
			account.setPwd(pwdStr);
			account.setName(nameStr);
			account.setRole_id(roleIdInt);
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
		return account;
	}

	public List<Account> getUser() throws Throwable {
		
		String sql = "SELECT * FROM STOCK.ACCOUNT WHERE ROLE_ID='2';";
		GetConnection database= new GetConnection();
		Connection connection = null;
		List<Account> accountList = new ArrayList();
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()){
				Account account = new Account();
				account.setId(rs.getInt("id"));
				account.setMail(rs.getString("mail"));
				account.setPwd(rs.getString("pwd"));
				account.setName(rs.getString("name"));
				account.setRole_id(rs.getInt("role_id"));
				accountList.add(account);
			}
			
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
		return accountList;
	}

public List<Account> getAdmin() throws Throwable {
		
		String sql = "SELECT * FROM STOCK.ACCOUNT WHERE ROLE_ID='1';";
		GetConnection database= new GetConnection();
		Connection connection = null;
		List<Account> accountList = new ArrayList();
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			
			while(rs.next()){
				Account account = new Account();
				account.setId(rs.getInt("id"));
				account.setMail(rs.getString("mail"));
				account.setPwd(rs.getString("pwd"));
				account.setName(rs.getString("name"));
				account.setRole_id(rs.getInt("role_id"));
				accountList.add(account);
			}
			
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
		return accountList;
	}

	public Account updateUser(Account account) throws Throwable {
		
		String sql = "UPDATE STOCK.ACCOUNT SET PWD = ?, NAME=? WHERE ID = ?;";
		GetConnection database= new GetConnection();
		Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ps.setString(1, account.getPwd());
			ps.setString(2, account.getName());
			ps.setInt(3, account.getId());
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
		return account;
	}

	public Account deleteUser(int id) throws Throwable {
		Account account = new Account();
		String sql = "DELETE FROM STOCK.ACCOUNT WHERE ID = '"+id+"';";
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
		
		return account;
	}

	public Account getByMail(Account account) throws Throwable {
		
		String sql = "SELECT * FROM STOCK.ACCOUNT WHERE MAIL='"+account.getMail()+"'";
		GetConnection database= new GetConnection();
		Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			
			int id = 0;
			String mailStr = null;
			String pwdStr = null;
			String nameStr = null;
			int roleIdInt = 0;
			if(rs.next()){
				id = rs.getInt("id");
				mailStr = rs.getString("mail");
				pwdStr = rs.getString("pwd");
				nameStr = rs.getString("name");
				roleIdInt = rs.getInt("role_id");
			}
			account.setId(id);
			account.setMail(mailStr);
			account.setPwd(pwdStr);
			account.setName(nameStr);
			account.setRole_id(roleIdInt);
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
		return account;
	}
		

}
