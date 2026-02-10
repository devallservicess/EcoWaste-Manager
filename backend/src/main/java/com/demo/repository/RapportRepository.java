package com.demo.repository;

import com.demo.model.Rapports;
import org.springframework.stereotype.Repository;

@Repository
public class RapportRepository extends XmlRepository<Rapports> {

    private static final String FILE_PATH = "data/rapports.xml";

    public RapportRepository() {
        super(Rapports.class, FILE_PATH);
    }
}
