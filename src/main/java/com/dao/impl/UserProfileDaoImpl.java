package com.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.dao.IUserProfileDao;
import com.dao.connection.GetConnection;
import com.model.UserProfile;

public class UserProfileDaoImpl implements IUserProfileDao{

	@Override
	public void insert(UserProfile userProfile) throws Throwable {
		
		String sql = "INSERT INTO userProfile (id, name, birthday, account_id, role_id) VALUES (?, ?, ?, ?, ?)";
		GetConnection database= new GetConnection();
	    Connection connection = null;
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			
			ps.setInt(1, userProfile.getId());
			ps.setString(2, userProfile.getName());
			ps.setString(3, userProfile.getBirthday());
			ps.setString(4, userProfile.getAccount_id());
			ps.setInt(5, userProfile.getRole_id());
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

	@Override
	public UserProfile getByAccountId(String accountId) throws Throwable {
		String sql = "SELECT * FROM STOCK.USERPROFILE WHERE ACCOUNT_ID='"+accountId+"'";
		GetConnection database= new GetConnection();
		Connection connection = null;
		UserProfile userProfile = new UserProfile();
		try {
			connection = database.Get_Connection();
			PreparedStatement ps = connection.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			
			int id = 0;
			String name = null;
			String birthday = null;
			String account_id = null;
			int role_id = 0;
			if(rs.next()){
				id = rs.getInt("id");
				name = rs.getString("name");
				birthday = rs.getString("birthday");
				account_id = rs.getString("account_id");
				role_id = rs.getInt("role_id");
			}
			userProfile.setId(id);;
			userProfile.setName(name);
			userProfile.setBirthday(birthday);
			userProfile.setAccount_id(account_id);
			userProfile.setRole_id(role_id);
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
		return userProfile;
	}

}
