package com.demo.service;

import com.demo.model.Employe;
import com.demo.model.Employes;
import com.demo.repository.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeService {

    @Autowired
    private EmployeRepository employeRepository;

    public List<Employe> getAllEmployes() {
        Employes employes = employeRepository.read();
        return employes != null ? employes.getEmploye() : List.of();
    }

    public Employe getEmployeByCin(String cin) {
        Employes employes = employeRepository.read();
        if (employes != null) {
            return employes.getEmploye().stream()
                    .filter(e -> e.getCin().equals(cin))
                    .findFirst()
                    .orElse(null);
        }
        return null;
    }

    public void saveEmploye(Employe employe) {
        Employes employes = employeRepository.read();
        if (employes == null) {
            employes = new Employes();
        }
        // Remove existing if present (update)
        Employe existing = getEmployeByCin(employe.getCin());
        if (existing != null) {
            employes.removeEmploye(existing);
        }
        employes.addEmploye(employe);
        employeRepository.write(employes);
    }

    public void deleteEmploye(String cin) {
        Employes employes = employeRepository.read();
        if (employes != null) {
            Optional<Employe> existing = employes.getEmploye().stream()
                    .filter(e -> e.getCin().equals(cin))
                    .findFirst();
            if (existing.isPresent()) {
                employes.removeEmploye(existing.get());
                employeRepository.write(employes);
            }
        }
    }

    public Employe authenticate(String cin, String password) {
        Employe employe = getEmployeByCin(cin);
        if (employe != null && employe.getPassword().equals(password)) {
            return employe;
        }
        return null;
    }
}
