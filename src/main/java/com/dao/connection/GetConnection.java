package com.dao.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class GetConnection {
	
	public Connection Get_Connection() throws Exception
	{
		try{
			String connectionURL = "jdbc:mysql://localhost:3306/stock";
			Connection connection = null;
			Class.forName("com.mysql.jdbc.Driver").newInstance();
			connection = DriverManager.getConnection(connectionURL, "root", "sa123!");
			return connection;
		}
		catch (SQLException e){
			throw e;	
		}
		catch (Exception e){
			throw e;	
		}
	}
}
