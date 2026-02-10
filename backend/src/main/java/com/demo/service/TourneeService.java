package com.demo.service;

import com.demo.model.Tournee;
import com.demo.model.Tournees;
import com.demo.repository.TourneeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TourneeService {

    @Autowired
    private TourneeRepository tourneeRepository;

    public List<Tournee> getAllTournees() {
        Tournees tournees = tourneeRepository.read();
        return tournees != null ? tournees.getTournees() : List.of();
    }

    public void saveTournee(Tournee tournee) {
        Tournees tournees = tourneeRepository.read();
        if (tournees == null) {
            tournees = new Tournees();
        }

        Optional<Tournee> existing = tournees.getTournees().stream()
                .filter(t -> t.getId() == tournee.getId())
                .findFirst();

        if (existing.isPresent()) {
            tournees.getTournees().remove(existing.get());
        }

        tournees.addTournee(tournee);
        tourneeRepository.write(tournees);
    }

    public void deleteTournee(int id) {
        Tournees tournees = tourneeRepository.read();
        if (tournees != null) {
            Optional<Tournee> existing = tournees.getTournees().stream()
                    .filter(t -> t.getId() == id)
                    .findFirst();
            if (existing.isPresent()) {
                tournees.getTournees().remove(existing.get());
                tourneeRepository.write(tournees);
            }
        }
    }

    @Autowired
    private PointService pointService;
    @Autowired
    private VehiculeService vehiculeService;
    @Autowired
    private EmployeService employeService;

    public Tournee autoPlanTournee(String date) {
        // Simple algorithm: collect all full bins (>75%)
        List<Integer> pointsToCollect = pointService.getAllPoints().stream()
                .filter(p -> p.getNiveauRemplissage() > 75)
                .map(com.demo.model.Point::getId)
                .toList();

        // Find available resources (simplified: just take first available)
        // In real app, check 'Disponibilite' for the specific date
        List<Integer> availableVehicles = vehiculeService.getAllVehicules().stream()
                .limit(1)
                .map(com.demo.model.Vehicule::getId)
                .toList();

        List<String> availableAgents = employeService.getAllEmployes().stream()
                .limit(2)
                .map(com.demo.model.Employe::getCin)
                .toList();

        Tournee proposal = new Tournee();
        proposal.setDate(date);
        proposal.setPoints(pointsToCollect);
        proposal.setVehicules(availableVehicles);
        proposal.setAgents(availableAgents);
        proposal.setDistance(pointsToCollect.size() * 1.5); // Mock distance calculation

        return proposal;
    }
}
