package com.demo.service;

import com.demo.model.Point;
import com.demo.model.Points;
import com.demo.repository.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    public List<Point> getAllPoints() {
        Points points = pointRepository.read();
        return points != null ? points.getPoints() : List.of();
    }

    public Point getPointById(int id) {
        Points points = pointRepository.read();
        if (points != null) {
            return points.findById(id);
        }
        return null;
    }

    public void savePoint(Point point) {
        Points points = pointRepository.read();
        if (points == null) {
            points = new Points();
        }
        // Check if exists and update
        Point existing = points.findById(point.getId());
        if (existing != null) {
            points.removePoint(existing);
        }
        points.addPoint(point);
        pointRepository.write(points);
    }

    public void deletePoint(int id) {
        Points points = pointRepository.read();
        if (points != null) {
            Point existing = points.findById(id);
            if (existing != null) {
                points.removePoint(existing);
                pointRepository.write(points);
            }
        }
    }
}
