package com.demo.controller;

import com.demo.model.Employe;
import com.demo.service.EmployeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employes")
@CrossOrigin(origins = "https://melodious-sprite-a21549.netlify.app/")
public class EmployeController {

    @Autowired
    private EmployeService employeService;

    @GetMapping
    public List<Employe> getAllEmployes() {
        return employeService.getAllEmployes();
    }

    @GetMapping("/{cin}")
    public ResponseEntity<Employe> getEmployeByCin(@PathVariable String cin) {
        Employe employe = employeService.getEmployeByCin(cin);
        if (employe != null) {
            return ResponseEntity.ok(employe);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public void saveEmploye(@RequestBody Employe employe) {
        employeService.saveEmploye(employe);
    }

    @DeleteMapping("/{cin}")
    public void deleteEmploye(@PathVariable String cin) {
        employeService.deleteEmploye(cin);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String cin = credentials.get("cin");
        String password = credentials.get("password");
        Employe employe = employeService.authenticate(cin, password);
        if (employe != null) {
            return ResponseEntity.ok(employe);
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}
