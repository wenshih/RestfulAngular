package com.dao;

import com.model.UserProfile;

public interface IUserProfileDao {
	
	public void insert(UserProfile userProfile) throws Throwable;
	
	public UserProfile getByAccountId(String account) throws Throwable;
}
