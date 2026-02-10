package com.demo.repository;

import com.demo.model.Admin;
import org.springframework.stereotype.Repository;

@Repository
public class AdminRepository extends XmlRepository<Admin> {
    public AdminRepository() {
        super(Admin.class, "data/admin.xml");
    }
}
