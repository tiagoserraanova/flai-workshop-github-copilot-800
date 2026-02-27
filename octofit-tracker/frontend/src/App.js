import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function Home() {
  return (
    <div className="container mt-4">
      <div className="hero-section text-center">
        <h1>🏋️ OctoFit Tracker</h1>
        <p className="lead">Track your fitness goals and compete with your team!</p>
        <p className="mb-0 opacity-75">Navigate using the menu above to explore the app.</p>
      </div>
      <div className="row mt-4 g-3">
        {[
          { icon: '👤', title: 'Users', desc: 'View all registered superhero members', link: '/users' },
          { icon: '🦸', title: 'Teams', desc: 'See Team Marvel and Team DC compete', link: '/teams' },
          { icon: '🏃', title: 'Activities', desc: 'Browse logged fitness activities', link: '/activities' },
          { icon: '🏆', title: 'Leaderboard', desc: 'See who leads the fitness challenge', link: '/leaderboard' },
          { icon: '💪', title: 'Workouts', desc: 'Explore superhero workout programs', link: '/workouts' },
        ].map(({ icon, title, desc, link }) => (
          <div className="col-sm-6 col-lg-4" key={title}>
            <NavLink to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-card h-100">
                <div className="feature-icon">{icon}</div>
                <h5 className="fw-bold">{title}</h5>
                <p className="text-muted mb-0">{desc}</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">🏋️ OctoFit Tracker</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/users">👤 Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/teams">🦸 Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/activities">🏃 Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/leaderboard">🏆 Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/workouts">💪 Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

