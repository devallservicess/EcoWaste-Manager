package com.demo.controller;

import com.demo.model.Vehicule;
import com.demo.service.VehiculeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "http://localhost:5173")
public class VehiculeController {

    @Autowired
    private VehiculeService vehiculeService;

    @GetMapping
    public List<Vehicule> getAllVehicules() {
        return vehiculeService.getAllVehicules();
    }

    @PostMapping
    public void saveVehicule(@RequestBody Vehicule vehicule) {
        vehiculeService.saveVehicule(vehicule);
    }

    @DeleteMapping("/{id}")
    public void deleteVehicule(@PathVariable int id) {
        vehiculeService.deleteVehicule(id);
    }
}
