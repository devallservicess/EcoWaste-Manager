package com.demo.service;

import com.demo.model.Admin;
import com.demo.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin authenticate(String username, String password) {
        Admin admin = adminRepository.read();
        if (admin != null && admin.getUsername().equals(username) && admin.getPassword().equals(password)) {
            return admin;
        }
        return null;
    }

    public void updateAdmin(Admin newAdmin) {
        adminRepository.write(newAdmin);
    }
}
