package com.demo.repository;

import com.demo.model.Vehicules;
import org.springframework.stereotype.Repository;

@Repository
public class VehiculeRepository extends XmlRepository<Vehicules> {

    private static final String FILE_PATH = "data/vehicule.xml";

    public VehiculeRepository() {
        super(Vehicules.class, FILE_PATH);
    }
}
