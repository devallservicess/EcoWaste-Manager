package com.demo.controller;

import com.demo.model.Point;
import com.demo.service.PointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/points")
@CrossOrigin(origins = "https://melodious-sprite-a21549.netlify.app/")
public class PointController {

    @Autowired
    private PointService pointService;

    @GetMapping
    public List<Point> getAllPoints() {
        return pointService.getAllPoints();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Point> getPointById(@PathVariable int id) {
        Point point = pointService.getPointById(id);
        if (point != null) {
            return ResponseEntity.ok(point);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public void savePoint(@RequestBody Point point) {
        pointService.savePoint(point);
    }

    @DeleteMapping("/{id}")
    public void deletePoint(@PathVariable int id) {
        pointService.deletePoint(id);
    }
}
