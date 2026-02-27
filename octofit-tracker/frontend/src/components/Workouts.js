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
        {workouts.map((workout) => {
          const exercises = Array.isArray(workout.exercises)
            ? workout.exercises
            : JSON.parse(workout.exercises || '[]');
          return (
            <div key={workout.id} className="col-md-6">
              <div className="card octofit-card h-100">
                <div className="card-header bg-danger text-white d-flex align-items-center justify-content-between">
                  <h5 className="mb-0 fw-bold">💪 {workout.name}</h5>
                  <span className="badge bg-white text-danger">{workout.duration} min</span>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">{workout.description}</p>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-danger">⏱ {workout.duration} minutes</span>
                    <span className="badge bg-secondary">{exercises.length} exercises</span>
                  </div>
                  <h6 className="fw-semibold mt-3 mb-2">Exercises:</h6>
                  <ol className="list-group list-group-numbered list-group-flush">
                    {exercises.map((exercise, idx) => (
                      <li key={idx} className="list-group-item d-flex align-items-center px-0">
                        {exercise}
                      </li>
                    ))}
                  </ol>
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
