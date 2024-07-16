package com.example.fitness_tracker.controller;

import com.example.fitness_tracker.entity.TemplateEntity;
import com.example.fitness_tracker.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {

    private final TemplateService templateService;

    @Autowired
    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TemplateEntity> getTemplateById(@PathVariable Long id) {
        Optional<TemplateEntity> template = templateService.getTemplateById(id);
        return template.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TemplateEntity> createTemplate(@RequestBody TemplateEntity templateEntity) {
        TemplateEntity createdTemplate = templateService.createTemplate(templateEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTemplate);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TemplateEntity> updateTemplate(@PathVariable Long id, @RequestBody TemplateEntity updatedTemplateEntity) {
        TemplateEntity updatedTemplate = templateService.updateTemplate(id, updatedTemplateEntity);
        return ResponseEntity.ok(updatedTemplate);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long id) {
        templateService.deleteTemplate(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TemplateEntity>> getAllTemplates() {
        List<TemplateEntity> templates = templateService.getAllTemplates();
        return ResponseEntity.ok(templates);
    }
}
