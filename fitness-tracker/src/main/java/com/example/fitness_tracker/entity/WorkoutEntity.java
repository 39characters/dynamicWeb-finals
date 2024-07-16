package com.example.fitness_tracker.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "workouts")
public class WorkoutEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String workoutName;
    private String workoutReps;
    private String workoutSets;
    private double workoutWeight;
    private String workoutWeightType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "template_id")
    @JsonBackReference // Avoid infinite recursion
    private TemplateEntity template;

    // Constructors, getters, setters
    // Omitted for brevity

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkoutName() {
        return workoutName;
    }

    public void setWorkoutName(String workoutName) {
        this.workoutName = workoutName;
    }

    public String getWorkoutReps() {
        return workoutReps;
    }

    public void setWorkoutReps(String workoutReps) {
        this.workoutReps = workoutReps;
    }

    public String getWorkoutSets() {
        return workoutSets;
    }

    public void setWorkoutSets(String workoutSets) {
        this.workoutSets = workoutSets;
    }

    public Double getWorkoutWeight() {
        return workoutWeight;
    }

    public void setWorkoutWeight(Double workoutWeight) {
        this.workoutWeight = workoutWeight;
    }

    public String getWorkoutWeightType() {
        return workoutWeightType;
    }

    public void setWorkoutWeightType(String workoutWeightType) {
        this.workoutWeightType = workoutWeightType;
    }

    public TemplateEntity getTemplate() {
        return template;
    }

    public void setTemplate(TemplateEntity template) {
        this.template = template;
    }

    @Transient
    private Long templateID;

    public Long getTemplateID() {
        return templateID;
    }

    public void setTemplateID(Long templateID) {
        this.templateID = templateID;
    }
}
