import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const BrowseTemplates = ({ navigateBack }) => {
  const [templates, setTemplates] = useState([]);
  const [editableTemplateId, setEditableTemplateId] = useState(null);
  const [originalTemplates, setOriginalTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/templates');
        if (Array.isArray(response.data)) {
          setTemplates(response.data);
          setOriginalTemplates(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleEditWorkout = (templateId, workoutIndex, field, value) => {
    const updatedTemplates = [...templates];
    const templateIndex = updatedTemplates.findIndex((template) => template.id === templateId);
    if (templateIndex !== -1 && workoutIndex !== null && workoutIndex < updatedTemplates[templateIndex].workouts.length) {
      updatedTemplates[templateIndex].workouts[workoutIndex][field] = value;
      setTemplates(updatedTemplates);
    } else {
      console.error('Invalid template or workout index');
    }
  };

  const handleRemoveWorkout = async (templateId, workoutIndex) => {
    try {
      const updatedTemplates = [...templates];
      const templateIndex = updatedTemplates.findIndex((template) => template.id === templateId);
  
      if (templateIndex !== -1 && workoutIndex !== null && workoutIndex < updatedTemplates[templateIndex].workouts.length) {
        const workoutToRemove = updatedTemplates[templateIndex].workouts[workoutIndex];
  
        // Prompt the user with a confirmation dialog
        const result = await Swal.fire({
          title: 'Confirm',
          text: 'Are you sure you want to remove this workout?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, remove it',
          cancelButtonText: 'Cancel'
        });
  
        if (result.isConfirmed) {
          if (updatedTemplates[templateIndex].workouts.length > 1) {
            // Remove workout from the local state
            updatedTemplates[templateIndex].workouts.splice(workoutIndex, 1);
            setTemplates(updatedTemplates);
  
            // Remove workout from the database
            const workoutIdToDelete = workoutToRemove.id;
            await axios.delete(`http://localhost:8080/api/workouts/${workoutIdToDelete}`);
            
            // Show success message after successful deletion
            Swal.fire('Deleted!', 'Your workout has been removed.', 'success');
          } else {
            alert('Cannot remove the last workout. There must be at least one workout in the template.');
          }
        }
      } else {
        console.error('Invalid template or workout index');
      }
    } catch (error) {
      console.error('Error removing workout:', error);
      // Instead of displaying an error message here, you can handle it gracefully or log it.
    }
  };
  
  

  const handleSaveChanges = async (templateId) => {
    try {
      const templateToUpdate = templates.find((template) => template.id === templateId);
      await axios.put(`http://localhost:8080/api/templates/${templateId}`, templateToUpdate);
      Swal.fire('Success', 'Template updated successfully', 'success').then(() => {
        // Reset editableTemplateId to null to exit edit mode
        setEditableTemplateId(null);
      });
    } catch (error) {
      console.error('Error updating template:', error);
      Swal.fire('Error', 'Failed to update template', 'error');
    }
  };
  

  const handleCancelEdit = () => {
    setTemplates(originalTemplates);
    setEditableTemplateId(null);
  };

  const handleEditTemplate = (templateId) => {
    setEditableTemplateId(templateId);
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      // Delete template and associated workouts
      await axios.delete(`http://localhost:8080/api/templates/${templateId}`);
      Swal.fire('Success', 'Template deleted successfully', 'success').then(() => {
        // Refresh templates list after deletion
        const updatedTemplates = templates.filter((template) => template.id !== templateId);
        setTemplates(updatedTemplates);
        setEditableTemplateId(null); // Exit edit mode after deletion
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      Swal.fire('Error', 'Failed to delete template', 'error');
    }
  };

  const handleTemplateNameChange = (e, templateId) => {
    const updatedTemplates = [...templates];
    const templateIndex = updatedTemplates.findIndex((template) => template.id === templateId);
    if (templateIndex !== -1) {
      updatedTemplates[templateIndex].templateName = e.target.value;
      setTemplates(updatedTemplates);
    } else {
      console.error('Invalid template index');
    }
  };

  const handleAddWorkout = (templateId) => {
    const updatedTemplates = [...templates];
    const templateIndex = updatedTemplates.findIndex((template) => template.id === templateId);
    if (templateIndex !== -1) {
      const newWorkout = {
        workoutName: '',
        workoutSets: '',
        workoutReps: '',
        workoutWeight: '',
        workoutWeightType: 'lbs' // Default value, adjust as needed
      };
      updatedTemplates[templateIndex].workouts.push(newWorkout);
      setTemplates(updatedTemplates);
    } else {
      console.error('Invalid template index');
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
      <h1 className="text-3xl font-bold mb-8 text-center text-slate-900">Browse Templates</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <div key={template.id} className="border rounded-md p-4">
            {editableTemplateId === template.id ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Editing Template:
                  <input
                    type="text"
                    value={template.templateName}
                    onChange={(e) => handleTemplateNameChange(e, template.id)}
                    className="ml-2 w-full px-3 py-2 border rounded-md"
                    placeholder="Enter template name"
                    required
                  />
                </h2>
                {template.workouts.map((workout, index) => (
                  <div key={index} className="mb-4 p-4 border rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Workout {index + 1}</h3>
                    <div className="mb-2">
                      <label className="block text-gray-700 font-bold mb-1" htmlFor={`editWorkoutName-${index}`}>
                        Workout Name
                      </label>
                      <input
                        type="text"
                        id={`editWorkoutName-${index}`}
                        value={workout.workoutName}
                        onChange={(e) => handleEditWorkout(template.id, index, 'workoutName', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter workout name"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 font-bold mb-1" htmlFor={`editWorkoutSets-${index}`}>
                        Sets
                      </label>
                      <input
                        type="number"
                        id={`editWorkoutSets-${index}`}
                        value={workout.workoutSets}
                        onChange={(e) => handleEditWorkout(template.id, index, 'workoutSets', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter number of sets"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 font-bold mb-1" htmlFor={`editWorkoutReps-${index}`}>
                        Reps
                      </label>
                      <input
                        type="number"
                        id={`editWorkoutReps-${index}`}
                        value={workout.workoutReps}
                        onChange={(e) => handleEditWorkout(template.id, index, 'workoutReps', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter number of reps"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 font-bold mb-1" htmlFor={`editWorkoutWeight-${index}`}>
                        Weight
                      </label>
                      <input
                        type="number"
                        id={`editWorkoutWeight-${index}`}
                        value={workout.workoutWeight}
                        onChange={(e) => handleEditWorkout(template.id, index, 'workoutWeight', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        placeholder="Enter weight"
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 font-bold mb-1" htmlFor={`editWorkoutWeightType-${index}`}>
                        Weight Type
                      </label>
                      <select
                        id={`editWorkoutWeightType-${index}`}
                        value={workout.workoutWeightType}
                        onChange={(e) => handleEditWorkout(template.id, index, 'workoutWeightType', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="lbs">lbs</option>
                        <option value="kg">kg</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveWorkout(template.id, index)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 mt-2"
                    >
                      Remove Workout
                    </button>
                  </div>
                ))}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleAddWorkout(editableTemplateId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    Add Workout
                  </button>
                  <button
                    onClick={() => handleSaveChanges(template.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100 mr-2"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 ml-2"
                  >
                    Delete Template
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold mb-4">{template.templateName}</h2>
                <ul className="mb-4">
                  {template.workouts.map((workout, index) => (
                    <li key={index} className="mb-2">
                      <span className="font-semibold">Workout {index + 1}: </span>
                      {workout.workoutName}, Sets: {workout.workoutSets}, Reps: {workout.workoutReps}, Weight: {workout.workoutWeight} {workout.workoutWeightType}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleEditTemplate(template.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 mr-2"
                >
                  Edit Template
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseTemplates;
