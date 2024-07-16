package com.example.fitness_tracker.service;

import com.example.fitness_tracker.entity.TemplateEntity;
import com.example.fitness_tracker.repository.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TemplateServiceImpl implements TemplateService {

    private final TemplateRepository templateRepository;

    @Autowired
    public TemplateServiceImpl(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @Override
    public TemplateEntity createTemplate(TemplateEntity template) {
        return templateRepository.save(template);
    }

    @Override
    public TemplateEntity updateTemplate(Long id, TemplateEntity updatedTemplate) {
        updatedTemplate.setId(id); // Ensure ID is set for update
        return templateRepository.save(updatedTemplate);
    }

    @Override
    public void deleteTemplate(Long id) {
        templateRepository.deleteById(id);
    }

    @Override
    public Optional<TemplateEntity> getTemplateById(Long id) {
        return templateRepository.findById(id);
    }

    @Override
    public List<TemplateEntity> getAllTemplates() {
        return templateRepository.findAll();
    }
}
