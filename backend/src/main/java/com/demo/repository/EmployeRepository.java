package com.demo.repository;

import com.demo.model.Employes;
import org.springframework.stereotype.Repository;

@Repository
public class EmployeRepository extends XmlRepository<Employes> {

    // Using employe_ins.xml as per original file name, or we can use a new one.
    // Original file was employe_ins.xml in resources.
    // We copied it to data/employe_ins.xml (I assume, from command in step 64:
    // *.xml)
    private static final String FILE_PATH = "data/employe_ins.xml";

    public EmployeRepository() {
        super(Employes.class, FILE_PATH);
    }
}
