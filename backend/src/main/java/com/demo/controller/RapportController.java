package com.demo.controller;

import com.demo.model.Rapport;
import com.demo.service.RapportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rapports")
@CrossOrigin(origins = "http://localhost:5173")
public class RapportController {

    @Autowired
    private RapportService rapportService;

    @GetMapping
    public List<Rapport> getAllRapports() {
        return rapportService.getAllRapports();
    }

    @PostMapping
    public void saveRapport(@RequestBody Rapport rapport) {
        rapportService.saveRapport(rapport);
    }

    @DeleteMapping("/{id}")
    public void deleteRapport(@PathVariable int id) {
        rapportService.deleteRapport(id);
    }
}
