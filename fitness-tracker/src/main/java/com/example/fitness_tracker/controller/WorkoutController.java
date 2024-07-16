package com.example.fitness_tracker.controller;

import com.example.fitness_tracker.entity.WorkoutEntity;
import com.example.fitness_tracker.entity.TemplateEntity;
import com.example.fitness_tracker.service.WorkoutService;
import com.example.fitness_tracker.service.TemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;
    private final TemplateService templateService; // Add this line

    @Autowired
    public WorkoutController(WorkoutService workoutService, TemplateService templateService) {
        this.workoutService = workoutService;
        this.templateService = templateService; // Add this line
    }

    @GetMapping("/{id}")
    public ResponseEntity<WorkoutEntity> getWorkoutById(@PathVariable Long id) {
        Optional<WorkoutEntity> workout = workoutService.getWorkoutById(id);
        return workout.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<WorkoutEntity> createWorkout(@RequestBody WorkoutEntity workoutEntity) {
        WorkoutEntity createdWorkout = workoutService.createWorkout(workoutEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkout);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutEntity> updateWorkout(@PathVariable Long id, @RequestBody WorkoutEntity updatedWorkoutEntity) {
        // Handle template association
        if (updatedWorkoutEntity.getTemplate() != null && updatedWorkoutEntity.getTemplate().getId() != null) {
            Optional<TemplateEntity> template = templateService.getTemplateById(updatedWorkoutEntity.getTemplate().getId());
            if (template.isPresent()) {
                updatedWorkoutEntity.setTemplate(template.get());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }
        WorkoutEntity updatedWorkout = workoutService.updateWorkout(id, updatedWorkoutEntity);
        return ResponseEntity.ok(updatedWorkout);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<WorkoutEntity> partialUpdateWorkout(@PathVariable Long id, @RequestBody WorkoutEntity updatedWorkoutEntity) {
        WorkoutEntity updatedWorkout = workoutService.partialUpdateWorkout(id, updatedWorkoutEntity);
        return ResponseEntity.ok(updatedWorkout);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<WorkoutEntity>> getAllWorkouts() {
        List<WorkoutEntity> workouts = workoutService.getAllWorkouts();
        return ResponseEntity.ok(workouts);
    }
}
