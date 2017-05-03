package com.dao;

import com.model.UserProfile;

public interface IUserProfileDao {
	
	public void insert(UserProfile userProfile) throws Throwable;
}
