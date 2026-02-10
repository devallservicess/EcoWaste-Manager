package com.demo.service;

import com.demo.model.Vehicule;
import com.demo.model.Vehicules;
import com.demo.repository.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculeService {

    @Autowired
    private VehiculeRepository vehiculeRepository;

    public List<Vehicule> getAllVehicules() {
        Vehicules vehicules = vehiculeRepository.read();
        return vehicules != null ? vehicules.getVehicules() : List.of();
    }

    public void saveVehicule(Vehicule vehicule) {
        Vehicules vehicules = vehiculeRepository.read();
        if (vehicules == null) {
            vehicules = new Vehicules();
        }

        Optional<Vehicule> existing = vehicules.getVehicules().stream()
                .filter(v -> v.getId() == vehicule.getId())
                .findFirst();

        if (existing.isPresent()) {
            vehicules.removeVehicule(existing.get());
        }

        vehicules.addVehicule(vehicule);
        vehiculeRepository.write(vehicules);
    }

    public void deleteVehicule(int id) {
        Vehicules vehicules = vehiculeRepository.read();
        if (vehicules != null) {
            Optional<Vehicule> existing = vehicules.getVehicules().stream()
                    .filter(v -> v.getId() == id)
                    .findFirst();
            if (existing.isPresent()) {
                vehicules.removeVehicule(existing.get());
                vehiculeRepository.write(vehicules);
            }
        }
    }
}
