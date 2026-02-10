package com.demo.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlElement;
import java.util.ArrayList;
import java.util.List;

@XmlRootElement(name = "employes")
@XmlAccessorType(XmlAccessType.FIELD)
public class Employes {

    @XmlElement(name = "employe")
    private List<Employe> employe = new ArrayList<>();

    public List<Employe> getEmploye() {
        return employe;
    }

    public void addEmploye(Employe e) {
        employe.add(e);
    }

    public boolean removeEmploye(Employe employe) {
        return this.employe.remove(employe);
    }

    public void setEmploye(List<Employe> employe) {
        this.employe = employe;
    }
}
