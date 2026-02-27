import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/teams/`;
    console.log('Teams: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const teamColors = ['primary', 'danger', 'success', 'info'];
  const teamIcons = { 'Team Marvel': '⚡', 'Team DC': '🦇' };

  if (loading) return (
    <div className="loading-container">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading teams...</p>
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
        <h2 className="page-heading mb-0">🦸 Teams</h2>
        <span className="badge bg-info text-dark rounded-pill fs-6">{teams.length} teams</span>
      </div>
      <div className="row g-4">
        {teams.map((team, idx) => {
          const color = teamColors[idx % teamColors.length];
          const icon = teamIcons[team.name] || '🏅';
          const members = Array.isArray(team.members) ? team.members : JSON.parse(team.members || '[]');
          return (
            <div key={team.id} className="col-md-6">
              <div className="card octofit-card h-100">
                <div className={`card-header bg-${color} text-white d-flex align-items-center gap-2`}>
                  <span className="fs-4">{icon}</span>
                  <h4 className="mb-0 fw-bold">{team.name}</h4>
                  <span className="badge bg-white text-dark ms-auto">{members.length} members</span>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted mb-3">{team.description}</p>
                  <h6 className="fw-semibold mb-2">Roster:</h6>
                  <ul className="list-group list-group-flush">
                    {members.map((member, i) => (
                      <li key={i} className="list-group-item d-flex align-items-center gap-2 px-0">
                        <span className={`badge bg-${color} rounded-pill`}>{i + 1}</span>
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Teams;
