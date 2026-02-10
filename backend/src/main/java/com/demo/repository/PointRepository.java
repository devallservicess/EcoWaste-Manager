package com.demo.repository;

import com.demo.model.Points;
import org.springframework.stereotype.Repository;

import java.io.File;

@Repository
public class PointRepository extends XmlRepository<Points> {

    private static final String FILE_PATH = "data/point.xml";

    public PointRepository() {
        super(Points.class, FILE_PATH);
    }
}
