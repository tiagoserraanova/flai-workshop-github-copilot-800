import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function parseExercises(exercises) {
  if (!exercises) return [];
  if (Array.isArray(exercises)) return exercises;
  try { return JSON.parse(exercises); } catch { return [String(exercises)]; }
}

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

  const cardColors = ['danger', 'primary', 'success', 'warning', 'info'];

  if (loading) return (
    <div className="loading-container">
      <div className="text-center">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading workouts...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-4">
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="page-heading mb-0">💪 Workouts</h2>
        <span className="badge bg-danger rounded-pill fs-6">{workouts.length} programs</span>
      </div>
      <div className="row g-4">
        {workouts.map((workout, idx) => {
          const exercises = parseExercises(workout.exercises);
          const color = cardColors[idx % cardColors.length];
          return (
            <div key={workout.id} className="col-md-6">
              <div className="card octofit-card h-100">
                <div className={`card-header bg-${color} text-white`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">💪 {workout.name}</h5>
                    <span className="badge bg-white text-dark">⏱ {workout.duration} min</span>
                  </div>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">{workout.description}</p>
                  <div className="d-flex gap-2 mb-3">
                    <span className={`badge bg-${color} bg-opacity-75`}>⏱ {workout.duration} minutes</span>
                    <span className="badge bg-secondary">{exercises.length} exercises</span>
                  </div>
                  <h6 className="fw-semibold mb-2">Exercises:</h6>
                  <table className="table table-sm table-bordered mb-0">
                    <thead className={`table-${color} text-white`}>
                      <tr>
                        <th width="40">#</th>
                        <th>Exercise</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exercises.map((exercise, i) => (
                        <tr key={i}>
                          <td><span className={`badge bg-${color}`}>{i + 1}</span></td>
                          <td>{exercise}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Workouts;
