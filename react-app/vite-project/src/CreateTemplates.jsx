import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateTemplates = ({ navigateBack }) => {
  const [templateName, setTemplateName] = useState('');
  const [workouts, setWorkouts] = useState([{ workoutName: '', workoutSets: 0, workoutReps: 0, workoutWeight: 0, workoutWeightType: 'lbs' }]);

  const handleAddWorkout = () => {
    setWorkouts([...workouts, { workoutName: '', workoutSets: 0, workoutReps: 0, workoutWeight: 0, workoutWeightType: 'lbs' }]);
  };

  const handleRemoveWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
  };

  const handleInputChange = (index, field, value) => {
    const updatedWorkouts = [...workouts];
    updatedWorkouts[index][field] = value;
    setWorkouts(updatedWorkouts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!templateName || workouts.some(workout => !workout.workoutName || workout.workoutSets <= 0 || workout.workoutReps <= 0 || workout.workoutWeight <= 0)) {
      Swal.fire('Error', 'Please fill out all workout details', 'error');
      return;
    }
  
    try {
      // Step 1: Create Template
      const templateResponse = await axios.post('http://localhost:8080/api/templates', { templateName });
      const templateId = templateResponse.data.id; // Assuming your response has an id
  
      // Step 2: Create Workouts for the Template
      await Promise.all(workouts.map(workout => {
        return axios.post('http://localhost:8080/api/workouts', {
          workoutName: workout.workoutName,
          workoutReps: workout.workoutReps,
          workoutSets: workout.workoutSets,
          workoutWeight: workout.workoutWeight,
          workoutWeightType: workout.workoutWeightType,
          template: {
            id: templateId // Use the template ID from the created template
          }
        });
      }));
  
      // Step 3: Clear Form and Show Success Message
      setTemplateName('');
      setWorkouts([{ workoutName: '', workoutSets: 0, workoutReps: 0, workoutWeight: 0, workoutWeightType: 'lbs' }]);
      Swal.fire('Success', 'Template and workouts created successfully', 'success').then(() => {
        // Optionally, you can reset state or perform additional actions here after the user acknowledges the success message
      });
    } catch (error) {
      console.error('Error creating template or workouts:', error);
      Swal.fire('Error', 'Failed to create template or workouts', 'error');
    }
  };
  

  return (
    <div className="container mx-auto py-8">
      <button
        onClick={navigateBack}
        className="bg-slate-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-gray-100"
      >
        Back
      </button>
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-900">Create a new template</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="templateName">
            Template Name
          </label>
          <input
            type="text"
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter template name"
            required
          />
        </div>
        {workouts.map((workout, index) => (
          <div key={index} className="mb-4 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-2">Workout {index + 1}</h3>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor={`workoutName-${index}`}>
                Workout Name
              </label>
              <input
                type="text"
                id={`workoutName-${index}`}
                value={workout.workoutName}
                onChange={(e) => handleInputChange(index, 'workoutName', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter workout name"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor={`workoutSets-${index}`}>
                Sets
              </label>
              <input
                type="number"
                id={`workoutSets-${index}`}
                value={workout.workoutSets}
                onChange={(e) => handleInputChange(index, 'workoutSets', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter number of sets"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor={`workoutReps-${index}`}>
                Reps
              </label>
              <input
                type="number"
                id={`workoutReps-${index}`}
                value={workout.workoutReps}
                onChange={(e) => handleInputChange(index, 'workoutReps', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter number of reps"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor={`workoutWeight-${index}`}>
                Weight
              </label>
              <input
                type="number"
                id={`workoutWeight-${index}`}
                value={workout.workoutWeight}
                onChange={(e) => handleInputChange(index, 'workoutWeight', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter weight"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor={`workoutWeightType-${index}`}>
                Weight Type
              </label>
              <select
                id={`workoutWeightType-${index}`}
                value={workout.workoutWeightType}
                onChange={(e) => handleInputChange(index, 'workoutWeightType', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
            <button
              type="button"
              onClick={() => handleRemoveWorkout(index)}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 mt-2"
            >
              Remove Workout
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddWorkout}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 mb-4"
        >
          Add Workout
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          Create Template
        </button>
      </form>
    </div>
  );
};

export default CreateTemplates;
