package com.demo.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;

@XmlAccessorType(XmlAccessType.FIELD)
public class Disponibilite {
    private String date;
    private boolean etat;

    public Disponibilite() {
    }

    public Disponibilite(String date, boolean etat) {
        this.date = date;
        this.etat = etat;
    }

    public String getDate() {
        return this.date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isEtat() {
        return this.etat;
    }

    public void setEtat(boolean etat) {
        this.etat = etat;
    }
}
