package com.demo.model;

import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlElement;

import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "rapports")
@XmlAccessorType(XmlAccessType.FIELD)
public class Rapports {

    @XmlElement(name = "rapport")
    private List<Rapport> rapports = new ArrayList<>();

    public List<Rapport> getRapports() {
        return rapports;
    }

    public void setRapports(List<Rapport> rapports) {
        this.rapports = rapports;
    }

    public void addRapport(Rapport r) {
        this.rapports.add(r);
    }

    public boolean removeRapport(Rapport r) {
        return this.rapports.remove(r);
    }

    public Rapport findById(int id) {
        return this.rapports.stream()
                .filter(r -> r.getId() == id)
                .findFirst()
                .orElse(null);
    }
}
