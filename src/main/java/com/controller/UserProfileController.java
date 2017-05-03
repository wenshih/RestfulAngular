package com.controller;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.dao.impl.UserProfileDaoImpl;
import com.model.UserProfile;

@Path("/userProfile")
public class UserProfileController {
	
	UserProfileDaoImpl userProfileDao = new UserProfileDaoImpl();

	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/insert")
	public UserProfile insert(UserProfile userProfile){
		try {
			userProfileDao.insert(userProfile);
			
		} catch (Throwable e) {
			e.printStackTrace();
		}
		
		return userProfile;
		
	}
}
