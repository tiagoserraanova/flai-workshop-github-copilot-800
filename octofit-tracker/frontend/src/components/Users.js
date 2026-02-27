import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_CODESPACE_NAME
  ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const TEAMS = ['Team Marvel', 'Team DC'];

const teamBadge = (team) => {
  if (!team) return <span className="badge bg-secondary">—</span>;
  const color = team === 'Team Marvel' ? 'danger' : 'primary';
  return <span className={`badge bg-${color}`}>{team}</span>;
};

function EditUserModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState({
    username: user.username || '',
    name: user.name || '',
    email: user.email || '',
    age: user.age || '',
    fitness_goal: user.fitness_goal || '',
    team: user.team || '',
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    fetch(`${API_BASE_URL}/api/users/${user.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, profile_picture: user.profile_picture || '' }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((d) => Promise.reject(JSON.stringify(d)));
        return res.json();
      })
      .then((updated) => {
        setSaving(false);
        onSaved(updated);
      })
      .catch((err) => {
        setSaving(false);
        setSaveError(String(err));
      });
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">✏️ Edit User: {user.name}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {saveError && <div className="alert alert-danger">{saveError}</div>}
              <div className="mb-3">
                <label className="form-label fw-semibold">Username</label>
                <input type="text" className="form-control" name="username" value={form.username} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label fw-semibold">Age</label>
                  <input type="number" className="form-control" name="age" value={form.age} onChange={handleChange} min="1" max="120" required />
                </div>
                <div className="col-md-8 mb-3">
                  <label className="form-label fw-semibold">Team</label>
                  <select className="form-select" name="team" value={form.team} onChange={handleChange}>
                    <option value="">— No team —</option>
                    {TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Fitness Goal</label>
                <textarea className="form-control" name="fitness_goal" rows="2" value={form.fitness_goal} onChange={handleChange}></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? <><span className="spinner-border spinner-border-sm me-1" role="status"></span>Saving…</> : '💾 Save changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = () => {
    const endpoint = `${API_BASE_URL}/api/users/`;
    console.log('Users: fetching from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSaved = (updated) => {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    setEditingUser(null);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Loading users...</p>
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
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={handleSaved}
        />
      )}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="page-heading mb-0">👤 Users</h2>
        <span className="badge bg-primary rounded-pill fs-6">{users.length} members</span>
      </div>
      <div className="card octofit-card">
        <div className="card-body p-0">
          <table className="table table-striped table-hover align-middle mb-0 octofit-table">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Team</th>
                <th scope="col">Fitness Goal</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td><span className="badge bg-secondary">{index + 1}</span></td>
                  <td><code className="text-primary">@{user.username}</code></td>
                  <td><strong>{user.name}</strong></td>
                  <td><a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></td>
                  <td><span className="badge bg-light text-dark">{user.age}</span></td>
                  <td>{teamBadge(user.team)}</td>
                  <td className="text-muted small">{user.fitness_goal}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      title="Edit user"
                      onClick={() => setEditingUser(user)}
                    >✏️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;

