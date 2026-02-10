package com.demo.controller;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = "http://localhost:5173")
public class ImportExportController {

    private final String DATA_DIR = "data/";

    @GetMapping("/export/{filename}")
    public ResponseEntity<Resource> exportFile(@PathVariable String filename) {
        File file = new File(DATA_DIR + filename + ".xml");
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_XML)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + ".xml\"")
                .body(resource);
    }

    @PostMapping("/import/{filename}")
    public ResponseEntity<String> importFile(@RequestParam("file") MultipartFile file, @PathVariable String filename) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }

        try {
            Path path = Paths.get(DATA_DIR + filename + ".xml");
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
            return ResponseEntity.ok("File imported successfully: " + filename + ".xml");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Could not import file: " + e.getMessage());
        }
    }
}
