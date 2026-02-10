package com.demo.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlElementWrapper;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "employe")
@XmlAccessorType(XmlAccessType.FIELD)
public class Employe {
    private String nom;
    private String prenom;
    private String cin;
    private String tel;
    private String password;
    private String status;
    private String competence;
    @XmlElementWrapper(name = "disponibilites")
    @XmlElement(name = "disponibilite")
    private List<Disponibilite> disponibilites = new ArrayList<>();

    public Employe() {
    }

    public Employe(String nom, String prenom, String cin, String tel, String password, String status, String competence,
            List<Disponibilite> disponibilites) {
        this.nom = nom;
        this.prenom = prenom;
        this.cin = cin;
        this.tel = tel;
        this.password = password;
        this.status = status;
        this.competence = competence;
        this.disponibilites = disponibilites;
    }

    public String getNom() {
        return this.nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getCin() {
        return this.cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getTel() {
        return this.tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCompetence() {
        return this.competence;
    }

    public void setCompetence(String competence) {
        this.competence = competence;
    }

    public List<Disponibilite> getDisponibilites() {
        return this.disponibilites;
    }

    public void setDisponibilites(List<Disponibilite> disponibilites) {
        this.disponibilites = disponibilites;
    }
}
