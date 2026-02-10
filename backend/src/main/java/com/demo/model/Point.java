package com.demo.model;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "point")
public class Point {
    private int id;
    private int capacite;
    private String etat;
    private double longitude;
    private double latitude;
    private int niveauRemplissage;
    private String typeDechet;

    public Point() {
    }

    public Point(int id, String typeDechet, int niveauRemplissage) {
        this.id = id;
        this.niveauRemplissage = niveauRemplissage;
        this.typeDechet = typeDechet;
    }

    public Point(int id, int capacite, double longitude, double latitude, int niveauRemplissage, String typeDechet) {
        this.id = id;
        this.capacite = capacite;
        this.longitude = longitude;
        this.latitude = latitude;
        this.niveauRemplissage = niveauRemplissage;
        this.typeDechet = typeDechet;
        this.etat = "inactif";
    }

    @XmlElement
    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @XmlElement
    public int getCapacite() {
        return this.capacite;
    }

    public void setCapacite(int capacite) {
        this.capacite = capacite;
    }

    @XmlElement
    public String getEtat() {
        return this.etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    @XmlElement
    public double getLongitude() {
        return this.longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    @XmlElement
    public double getLatitude() {
        return this.latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    @XmlElement
    public int getNiveauRemplissage() {
        return this.niveauRemplissage;
    }

    public void setNiveauRemplissage(int niveauRemplissage) {
        this.niveauRemplissage = niveauRemplissage;
    }

    @XmlElement
    public String getTypeDechet() {
        return this.typeDechet;
    }

    public void setTypeDechet(String typeDechet) {
        this.typeDechet = typeDechet;
    }

    @Override
    public String toString() {
        return "Point{id=" + this.id + ", capacite=" + this.capacite + ", etat=" + this.etat + ", longitude="
                + this.longitude + ", latitude=" + this.latitude + ", niveauRemplissage=" + this.niveauRemplissage
                + ", typeDechet=" + this.typeDechet + "}";
    }
}
