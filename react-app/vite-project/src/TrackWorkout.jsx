import React from "react";

const TrackWorkout = ({ template }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Track Workout</h1>
      <h2 className="text-lg font-semibold mb-2">{template.name}</h2>
      <p>Workouts: {template.workouts.join(", ")}</p>
      <p>Days: {template.days.join(", ")}</p>
    </div>
  );
};

export default TrackWorkout;
