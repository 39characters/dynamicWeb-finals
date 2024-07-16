package com.example.fitness_tracker.service;

import com.example.fitness_tracker.entity.WorkoutEntity;

import java.util.List;
import java.util.Optional;

public interface WorkoutService {

    Optional<WorkoutEntity> getWorkoutById(Long id);

    WorkoutEntity createWorkout(WorkoutEntity workoutEntity);

    WorkoutEntity updateWorkout(Long id, WorkoutEntity updatedWorkoutEntity);

    // Define the method for partial update
    WorkoutEntity partialUpdateWorkout(Long id, WorkoutEntity updatedWorkoutEntity);

    void deleteWorkout(Long id);

    List<WorkoutEntity> getAllWorkouts();
}
