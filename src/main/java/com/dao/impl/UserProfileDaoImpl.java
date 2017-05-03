package com.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
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

}
