package com.demo.repository;

import com.demo.model.Tournees;
import org.springframework.stereotype.Repository;

@Repository
public class TourneeRepository extends XmlRepository<Tournees> {

    private static final String FILE_PATH = "data/tournees.xml";

    public TourneeRepository() {
        super(Tournees.class, FILE_PATH);
    }
}
