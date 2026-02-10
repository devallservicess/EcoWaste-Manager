package com.demo.model;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "vehicules")
public class Vehicules {

    private List<Vehicule> vehicules = new ArrayList<>();

    @XmlElement(name = "vehicule")
    public List<Vehicule> getVehicules() {
        return vehicules;
    }

    public void setVehicules(List<Vehicule> vehicules) {
        this.vehicules = vehicules;
    }

    public void addVehicule(Vehicule vehicule) {
        this.vehicules.add(vehicule);
    }

    public boolean removeVehicule(Vehicule vehicule) {
        return this.vehicules.remove(vehicule);
    }
}
