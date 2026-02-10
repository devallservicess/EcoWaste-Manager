package com.demo.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlElementWrapper;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "tournee")
@XmlAccessorType(XmlAccessType.FIELD)
public class Tournee {
    private int id;
    private String date;
    @XmlElementWrapper(name = "vehicules")
    @XmlElement(name = "vehicule")
    private List<Integer> vehicules;
    @XmlElementWrapper(name = "agents")
    @XmlElement(name = "agent")
    private List<String> agents;
    @XmlElementWrapper(name = "points")
    @XmlElement(name = "point")
    private List<Integer> points;
    private double distance;

    public Tournee() {
    }

    public Tournee(int id, String date, List<Integer> vehicules, List<String> agents, List<Integer> points,
            double distance) {
        this.id = id;
        this.date = date;
        this.vehicules = vehicules;
        this.agents = agents;
        this.points = points;
        this.distance = distance;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Integer> getVehicules() {
        return this.vehicules;
    }

    public void setVehicules(List<Integer> vehicules) {
        this.vehicules = vehicules;
    }

    public List<String> getAgents() {
        return this.agents;
    }

    public void setAgents(List<String> agents) {
        this.agents = agents;
    }

    public List<Integer> getPoints() {
        return this.points;
    }

    public void setPoints(List<Integer> points) {
        this.points = points;
    }

    public double getDistance() {
        return this.distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }
}
