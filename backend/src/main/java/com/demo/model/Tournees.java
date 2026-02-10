package com.demo.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "tournees")
@XmlAccessorType(XmlAccessType.FIELD)
public class Tournees {
    @XmlElement(name = "tournee")
    private List<Tournee> tournees = new ArrayList<>();

    public Tournees() {
    }

    public List<Tournee> getTournees() {
        return this.tournees;
    }

    public void addTournee(Tournee t) {
        this.tournees.add(t);
    }

    public void setTournees(List<Tournee> tournees) {
        this.tournees = tournees;
    }
}
