package com.demo.controller;

import com.demo.model.Admin;
import com.demo.model.Employe;
import com.demo.service.AdminService;
import com.demo.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://melodious-sprite-a21549.netlify.app/")
public class AuthController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private EmployeService employeService;

    @PostMapping("/login/admin")
    public ResponseEntity<?> loginAdmin(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Admin admin = adminService.authenticate(username, password);
        if (admin != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("role", "ADMIN");
            response.put("user", admin);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid admin credentials");
    }

    @PostMapping("/login/employe")
    public ResponseEntity<?> loginEmploye(@RequestBody Map<String, String> credentials) {
        String cin = credentials.get("cin");
        String password = credentials.get("password");

        Employe employe = employeService.authenticate(cin, password);
        if (employe != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("role", "EMPLOYE");
            response.put("user", employe);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid employee credentials");
    }
}
