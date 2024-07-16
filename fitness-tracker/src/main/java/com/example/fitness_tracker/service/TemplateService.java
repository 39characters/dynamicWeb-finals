package com.example.fitness_tracker.service;

import com.example.fitness_tracker.entity.TemplateEntity;

import java.util.List;
import java.util.Optional;

public interface TemplateService {

    TemplateEntity createTemplate(TemplateEntity template);

    TemplateEntity updateTemplate(Long id, TemplateEntity updatedTemplate);

    void deleteTemplate(Long id);

    Optional<TemplateEntity> getTemplateById(Long id);

    List<TemplateEntity> getAllTemplates();
}
