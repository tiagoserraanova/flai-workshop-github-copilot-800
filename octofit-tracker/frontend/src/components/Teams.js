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

  if (loading) return <div className="container mt-4"><p>Loading teams...</p></div>;
  if (error) return <div className="container mt-4"><p className="text-danger">Error: {error}</p></div>;

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {teams.map((team) => (
        <div key={team.id} className="card mb-3">
          <div className="card-header">
            <h4 className="mb-0">{team.name}</h4>
          </div>
          <div className="card-body">
            <p className="card-text">{team.description}</p>
            <h6>Members:</h6>
            <ul className="list-group">
              {(Array.isArray(team.members) ? team.members : JSON.parse(team.members || '[]')).map(
                (member, idx) => (
                  <li key={idx} className="list-group-item">{member}</li>
                )
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Teams;
