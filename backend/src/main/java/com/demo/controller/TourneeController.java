package com.demo.controller;

import com.demo.model.Tournee;
import com.demo.service.TourneeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tournees")
@CrossOrigin(origins = "https://melodious-sprite-a21549.netlify.app/")
public class TourneeController {

    @Autowired
    private TourneeService tourneeService;

    @GetMapping
    public List<Tournee> getAllTournees() {
        return tourneeService.getAllTournees();
    }

    @PostMapping
    public void saveTournee(@RequestBody Tournee tournee) {
        tourneeService.saveTournee(tournee);
    }

    @DeleteMapping("/{id}")
    public void deleteTournee(@PathVariable int id) {
        tourneeService.deleteTournee(id);
    }

    @PostMapping("/auto-plan")
    public Tournee autoPlan(@RequestParam String date) {
        return tourneeService.autoPlanTournee(date);
    }
}
