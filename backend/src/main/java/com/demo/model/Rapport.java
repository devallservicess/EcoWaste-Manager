package com.demo.model;

import jakarta.xml.bind.annotation.*;

@XmlRootElement(name = "rapport")
@XmlAccessorType(XmlAccessType.FIELD)
public class Rapport {

    private int id;
    private int idPoint;
    private String cin;
    private String date;
    private String description;
    private int niveauRemplissage;
    private boolean pendingDeletion = false;
    private int previousNiveau;

    public Rapport() {
    }

    public Rapport(int id, String cin, int idP, String date, String dis, int niveau) {
        this.id = id;
        this.cin = cin;
        this.idPoint = idP;
        this.date = date;
        this.description = dis;
        this.niveauRemplissage = niveau;
        this.pendingDeletion = false;
        this.previousNiveau = niveau;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdPoint() {
        return idPoint;
    }

    public void setIdPoint(int idPoint) {
        this.idPoint = idPoint;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNiveauRemplissage() {
        return niveauRemplissage;
    }

    public void setNiveauRemplissage(int niveauRemplissage) {
        this.niveauRemplissage = niveauRemplissage;
    }

    public boolean isPendingDeletion() {
        return pendingDeletion;
    }

    public void setPendingDeletion(boolean pendingDeletion) {
        this.pendingDeletion = pendingDeletion;
    }

    public int getPreviousNiveau() {
        return previousNiveau;
    }

    public void setPreviousNiveau(int previousNiveau) {
        this.previousNiveau = previousNiveau;
    }
}
