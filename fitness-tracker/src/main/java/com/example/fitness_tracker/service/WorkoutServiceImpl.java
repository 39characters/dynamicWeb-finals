package com.example.fitness_tracker.service;

import com.example.fitness_tracker.entity.WorkoutEntity;
import com.example.fitness_tracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class WorkoutServiceImpl implements WorkoutService {

    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutServiceImpl(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WorkoutEntity> getWorkoutById(Long id) {
        return workoutRepository.findById(id);
    }

    @Override
    @Transactional
    public WorkoutEntity createWorkout(WorkoutEntity workoutEntity) {
        return workoutRepository.save(workoutEntity);
    }

    @Override
    @Transactional
    public WorkoutEntity updateWorkout(Long id, WorkoutEntity updatedWorkoutEntity) {
        Optional<WorkoutEntity> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isPresent()) {
            WorkoutEntity workout = optionalWorkout.get();
            // Update fields
            workout.setWorkoutName(updatedWorkoutEntity.getWorkoutName());
            workout.setWorkoutReps(updatedWorkoutEntity.getWorkoutReps());
            workout.setWorkoutSets(updatedWorkoutEntity.getWorkoutSets());
            workout.setWorkoutWeight(updatedWorkoutEntity.getWorkoutWeight());
            workout.setWorkoutWeightType(updatedWorkoutEntity.getWorkoutWeightType());

            // Update template association if provided
            if (updatedWorkoutEntity.getTemplate() != null && updatedWorkoutEntity.getTemplate().getId() != null) {
                workout.setTemplate(updatedWorkoutEntity.getTemplate());
            }

            return workoutRepository.save(workout);
        } else {
            throw new RuntimeException("Workout not found with id: " + id);
        }
    }


    @Override
    @Transactional
    public WorkoutEntity partialUpdateWorkout(Long id, WorkoutEntity updatedWorkoutEntity) {
        Optional<WorkoutEntity> optionalWorkout = workoutRepository.findById(id);
        if (optionalWorkout.isPresent()) {
            WorkoutEntity workout = optionalWorkout.get();
            // Apply partial updates
            if (updatedWorkoutEntity.getWorkoutName() != null) {
                workout.setWorkoutName(updatedWorkoutEntity.getWorkoutName());
            }
            if (updatedWorkoutEntity.getWorkoutReps() != null) {
                workout.setWorkoutReps(updatedWorkoutEntity.getWorkoutReps());
            }
            if (updatedWorkoutEntity.getWorkoutSets() != null) {
                workout.setWorkoutSets(updatedWorkoutEntity.getWorkoutSets());
            }
            if (updatedWorkoutEntity.getWorkoutWeight() != null) {
                workout.setWorkoutWeight(updatedWorkoutEntity.getWorkoutWeight());
            }
            if (updatedWorkoutEntity.getWorkoutWeightType() != null) {
                workout.setWorkoutWeightType(updatedWorkoutEntity.getWorkoutWeightType());
            }
            // Save and return the updated entity
            return workoutRepository.save(workout);
        } else {
            throw new RuntimeException("Workout not found with id: " + id);
        }
    }

    @Override
    @Transactional
    public void deleteWorkout(Long id) {
        workoutRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WorkoutEntity> getAllWorkouts() {
        return workoutRepository.findAll();
    }
}
