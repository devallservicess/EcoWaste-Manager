package com.demo.model;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "points")
public class Points {
    private List<Point> points = new ArrayList<>();

    public Points() {
    }

    @XmlElement(name = "point")
    public List<Point> getPoints() {
        return this.points;
    }

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public void addPoint(Point point) {
        this.points.add(point);
    }

    public boolean removePoint(Point point) {
        return this.points.remove(point);
    }

    public Point findById(int id) {
        for (Point p : this.points) {
            if (p.getId() == id) {
                return p;
            }
        }
        return null;
    }
}
