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

import com.dao.impl.PermissionDaoImpl;
import com.model.Permission;

@Path("/permission")
public class PermissionController {
	
	PermissionDaoImpl permissionDao = new PermissionDaoImpl();
	
	@GET
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/getPermission")
	public List<Permission> getPermission() {
		
		List<Permission> permissionList = new ArrayList();
		try {
			permissionList = permissionDao.getPermission();
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return permissionList;
    }
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/insertPermission")
	public List<Permission> insertPermission(Permission permission) {
		
		List<Permission> permissionL = new ArrayList();
		try {
			if(!"".equals(permission.getPage()) && !"".equals(permission.getPermission()) && !"".equals(permission.getRole_id())){
				permissionDao.insertPermission(permission);
				permissionL = this.getPermission();
			}
		} catch (Throwable e) {
			e.printStackTrace();
		}
		
		return permissionL;
    }
	
	@POST
    @Produces(MediaType.APPLICATION_JSON)
	@Path("/updatePage")
	public Permission updatePage(Permission permission) {
		
		try {
			permission = permissionDao.updatePage(permission);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return permission;
    }
	
	
	@DELETE
    @Path("/deletePage/{id}")
    @Produces(MediaType.APPLICATION_JSON)
	public Permission deletePage(@PathParam("id") int id) {
		Permission permission = new Permission();
		try {
			permission = permissionDao.deletePage(id);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return permission;
    }
}
