import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/workouts/`;
    console.log('Workouts: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setWorkouts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Workouts: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-4"><p>Loading workouts...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>;

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {workouts.map((workout) => (
        <div key={workout.id} className="card mb-3">
          <div className="card-header">
            <h4 className="mb-0">{workout.name}</h4>
          </div>
          <div className="card-body">
            <p className="card-text">{workout.description}</p>
            <p><strong>Duration:</strong> {workout.duration} minutes</p>
            <h6>Exercises:</h6>
            <ul className="list-group">
              {(Array.isArray(workout.exercises)
                ? workout.exercises
                : JSON.parse(workout.exercises || '[]')
              ).map((exercise, idx) => (
                <li key={idx} className="list-group-item">{exercise}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Workouts;
