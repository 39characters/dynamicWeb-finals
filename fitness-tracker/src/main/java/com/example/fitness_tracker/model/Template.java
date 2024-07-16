package com.example.fitness_tracker.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Template {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "template_name")
    private String templateName;

    @OneToMany(mappedBy = "template", cascade = CascadeType.ALL)
    private List<Workout> workouts;

    // Getters and setters
}
