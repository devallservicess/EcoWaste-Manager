package com.demo.service;

import com.demo.model.Rapport;
import com.demo.model.Rapports;
import com.demo.repository.RapportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RapportService {

    @Autowired
    private RapportRepository rapportRepository;

    public List<Rapport> getAllRapports() {
        Rapports rapports = rapportRepository.read();
        return rapports != null ? rapports.getRapports() : List.of();
    }

    public void saveRapport(Rapport rapport) {
        Rapports rapports = rapportRepository.read();
        if (rapports == null) {
            rapports = new Rapports();
        }
        // Update logic: find by ID and replace
        Rapport existing = rapports.findById(rapport.getId());
        if (existing != null) {
            rapports.removeRapport(existing);
        }
        rapports.addRapport(rapport);
        rapportRepository.write(rapports);
    }

    public void deleteRapport(int id) {
        Rapports rapports = rapportRepository.read();
        if (rapports != null) {
            Rapport existing = rapports.findById(id);
            if (existing != null) {
                rapports.removeRapport(existing);
                rapportRepository.write(rapports);
            }
        }
    }
}
