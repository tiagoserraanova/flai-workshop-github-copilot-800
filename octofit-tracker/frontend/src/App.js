import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

const ASCII_LOGO = `
   ___   ____ _____ ___  ___ ___ _____    
  / _ \\ / ___|_   _/ _ \\|  _|_ _|_   _|   
 | | | | |     | || | | | |_  | |  | |     
 | |_| | |___  | || |_| |  _| | |  | |     
  \\___/ \\____| |_| \\___/|_|  |___| |_|     
                                            
 _____  ____      _    ____ _  _______ ____  
|_   _||  _ \\   / \\  / ___| |/ / ____|  _ \\ 
  | |  | |_) | / _ \\| |   | ' /|  _|  | |_) |
  | |  |  _ < / ___ \\ |___| . \\| |___|  _ <  
  |_|  |_| \\_/_/   \\_\\____|_|\\_\\_____|_| \\_\\`;

const NAV_ITEMS = [
  { label: '[USERS]',       to: '/users' },
  { label: '[TEAMS]',       to: '/teams' },
  { label: '[ACTIVITIES]',  to: '/activities' },
  { label: '[LEADERBOARD]', to: '/leaderboard' },
  { label: '[WORKOUTS]',    to: '/workouts' },
];

const CARDS = [
  { ascii: ' _ _ \n| | |\n|___|',  cmd: 'ls users',       title: 'Users',       desc: 'Registered superhero members',    link: '/users' },
  { ascii: '/|\\ \n | \n/_|_\\',   cmd: 'ls teams',       title: 'Teams',       desc: 'Team Marvel vs Team DC',          link: '/teams' },
  { ascii: '-O-\n/|\\ \n/ \\ ',    cmd: 'ls activities',  title: 'Activities',  desc: 'Logged fitness activities',        link: '/activities' },
  { ascii: ' # \n###\n # ',        cmd: 'ls leaderboard', title: 'Leaderboard', desc: 'Rankings and scores',             link: '/leaderboard' },
  { ascii: '||| \n||| \n ~ ',      cmd: 'ls workouts',    title: 'Workouts',    desc: 'Superhero workout programs',       link: '/workouts' },
];

function Home() {
  return (
    <div className="container mt-4" style={{ animation: 'fadeIn .4s ease' }}>

      {/* ASCII Hero Banner */}
      <div className="hero-section mb-4">
        <pre className="hero-ascii">{ASCII_LOGO}</pre>
        <div className="hero-tagline">
          [ FITNESS TRACKER ] &nbsp;|&nbsp; [ SUPERHERO EDITION ] &nbsp;|&nbsp; [ v1.0.0 ]
        </div>
        <div className="hero-status mt-2">
          &gt; system status: <span style={{ color: 'var(--g)' }}>ONLINE</span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          &gt; db: <span style={{ color: 'var(--g)' }}>octofit_db</span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          &gt; heroes: <span style={{ color: 'var(--y)' }}>8 active</span>
        </div>
      </div>

      {/* Navigation Cards */}
      <div style={{ color: 'var(--g-dim)', fontSize: '.72rem', letterSpacing: '1px', marginBottom: '.6rem' }}>
        &gt; SELECT MODULE:
      </div>
      <div className="row g-3">
        {CARDS.map(({ ascii, cmd, title, desc, link }) => (
          <div className="col-sm-6 col-lg-4" key={title}>
            <NavLink to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-card h-100">
                <pre className="feature-icon mb-2" style={{ fontSize: '.6rem', lineHeight: '1.2', margin: '0 0 .5rem 0' }}>{ascii}</pre>
                <div className="feature-title">[ {title} ]</div>
                <div className="feature-desc">{desc}</div>
                <div style={{ color: 'var(--g-dim)', fontSize: '.62rem', marginTop: '.6rem', borderTop: '1px solid var(--g-dk)', paddingTop: '.4rem' }}>
                  <span style={{ color: 'var(--g-dim)' }}>$ </span>{cmd}
                </div>
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
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid p-0">
          <NavLink className="navbar-brand" to="/">OCTOFIT://</NavLink>
          <button
            className="navbar-toggler ms-auto me-2"
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
              {NAV_ITEMS.map(({ label, to }) => (
                <li className="nav-item" key={to}>
                  <NavLink className="nav-link" to={to}>{label}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 pb-5">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts"    element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


