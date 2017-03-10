package com.dao;

import java.util.List;

import com.model.Permission;

public interface IPermissionDao {
	
	public List<Permission> getPermission() throws Throwable;
	
	public void insertPermission(Permission permission) throws Throwable;
	
	public Permission updatePage(Permission permission) throws Throwable;
	
	public Permission deletePage(int id) throws Throwable;
}
