import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${API_BASE_URL}/api/leaderboard/`;
    console.log('Leaderboard: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard: fetched data', data);
        const items = Array.isArray(data) ? data : data.results || [];
        setEntries(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const rankEmojis = ['🥇', '🥈', '🥉'];
  const teamColors = { 'Team Marvel': 'danger', 'Team DC': 'primary' };

  if (loading) return (
    <div className="loading-container">
      <div className="text-center">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading leaderboard...</p>
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

  const maxScore = entries.length > 0 ? entries[0].score : 1;

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="page-heading mb-0">🏆 Leaderboard</h2>
        <span className="badge bg-warning text-dark rounded-pill fs-6">{entries.length} heroes</span>
      </div>
      <div className="card octofit-card">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0 octofit-table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Hero</th>
                <th scope="col">Team</th>
                <th scope="col">Score</th>
                <th scope="col">Calories Burned</th>
                <th scope="col">Progress</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => {
                const teamColor = teamColors[entry.team] || 'secondary';
                return (
                  <tr key={entry.id} className={index === 0 ? 'table-warning' : ''}>
                    <td>
                      {index < 3
                        ? <span className="fs-5">{rankEmojis[index]}</span>
                        : <span className="badge bg-secondary rounded-pill">{index + 1}</span>
                      }
                    </td>
                    <td><strong>{entry.user}</strong></td>
                    <td>
                      <span className={`badge bg-${teamColor}`}>{entry.team || 'N/A'}</span>
                    </td>
                    <td>
                      <span className="badge bg-warning text-dark fs-6">{entry.score.toLocaleString()}</span>
                    </td>
                    <td>
                      <span className="text-success fw-semibold">🔥 {entry.calories.toLocaleString()}</span>
                    </td>
                    <td style={{ minWidth: '120px' }}>
                      <div className="progress" style={{ height: '10px' }}>
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: `${Math.round((entry.score / maxScore) * 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
