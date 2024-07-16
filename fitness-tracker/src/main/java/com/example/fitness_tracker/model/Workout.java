package com.example.fitness_tracker.model;

import jakarta.persistence.*;

@Entity
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private Template template;

    @Column(name = "workout_name")
    private String workoutName;

    @Column(name = "workout_sets")
    private int workoutSets;

    @Column(name = "workout_reps")
    private int workoutReps;

    @Column(name = "workout_weight")
    private int workoutWeight;

    @Column(name = "workout_weight_type")
    private String workoutWeightType;

    // Getters and setters
}
