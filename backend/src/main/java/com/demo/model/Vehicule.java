package com.demo.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlElementWrapper;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "vehicule")
@XmlAccessorType(XmlAccessType.FIELD)
public class Vehicule {
    private int capacite;
    @XmlElementWrapper(name = "disponibilites")
    @XmlElement(name = "disponibilite")
    private List<Disponibilite> disponibilites = new ArrayList<>();
    private int id;
    private String matricule;

    public Vehicule() {
    }

    public Vehicule(int capacite, int id, String matricule, List<Disponibilite> disponibilites) {
        this.capacite = capacite;
        this.id = id;
        this.matricule = matricule;
        this.disponibilites = disponibilites;
    }

    public int getCapacite() {
        return this.capacite;
    }

    public void setCapacite(int capacite) {
        this.capacite = capacite;
    }

    public List<Disponibilite> getDisponibilites() {
        return this.disponibilites;
    }

    public void setDisponibilites(List<Disponibilite> disponibilites) {
        this.disponibilites = disponibilites;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMatricule() {
        return this.matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }
}
