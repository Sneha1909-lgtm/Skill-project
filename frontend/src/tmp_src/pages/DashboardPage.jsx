import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';

const StatPanel = ({ title, value, icon, color }) => (
  <div className="stat-card" style={{ borderTop: `2px solid ${color}` }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase' }}>{title}</h3>
        <p className="stat-number" style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '10px' }}>{value}</p>
      </div>
      <div style={{ fontSize: '2.5rem', opacity: 0.8 }}>{icon}</div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { user, role, name } = useContext(AuthContext);

  return (
    <div className="dashboard-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1>Welcome, {name || user.split('@')[0]}!</h1>
          <p style={{ color: 'var(--accent-blue)', fontWeight: 600, textTransform: 'capitalize' }}>
            {role} Dashboard View
          </p>
        </div>
        <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
          System Online • Server Syncing
        </div>
      </div>

      <div className="dashboard-container">
        {role === 'student' && (
          <>
            <StatPanel title="Current GPA" value="3.8" icon="📈" color="#38bdf8" />
            <StatPanel title="Attendance" value="92%" icon="⏰" color="#2dd4bf" />
            <StatPanel title="Assignments Due" value="4" icon="📝" color="#f43f5e" />
            <StatPanel title="Credits Earned" value="65" icon="🎓" color="#818cf8" />
          </>
        )}
        {role === 'faculty' && (
          <>
            <StatPanel title="Active Classes" value="5" icon="🏫" color="#818cf8" />
            <StatPanel title="Students Enrolled" value="142" icon="👥" color="#2dd4bf" />
            <StatPanel title="Pending Grades" value="28" icon="📑" color="#f43f5e" />
            <StatPanel title="Meetings Today" value="2" icon="📅" color="#fb923c" />
          </>
        )}
        {role === 'admin' && (
          <>
            <StatPanel title="Total Students" value="1,250" icon="👨‍🎓" color="#38bdf8" />
            <StatPanel title="Faculty Members" value="125" icon="👩‍🏫" color="#2dd4bf" />
            <StatPanel title="System Alerts" value="0" icon="🛡️" color="#22c55e" />
            <StatPanel title="Server Load" value="14%" icon="💻" color="#a855f7" />
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', marginTop: '40px' }}>
        <div className="section">
          <h2>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '15px' }}>
            <Link to="/quiz" className="btn-primary" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>Take Quiz</Link>
            <Link to="/liveclass" className="btn-primary" style={{ flex: 1, textAlign: 'center', textDecoration: 'none', background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}>Join Live Class</Link>
            {role === 'admin' && (
               <Link to="/admin" className="btn-admin" style={{ flex: 1, textAlign: 'center', textDecoration: 'none' }}>Manage Users</Link>
            )}
          </div>
        </div>

        <div className="section">
          <h2>Recent Activity</h2>
          <ul style={{ padding: 0 }}>
            <li>
              <span style={{ color: 'var(--accent-blue)', marginRight: '10px' }}>•</span>
              System Backup Completed Successfully 
              <span style={{ float: 'right', fontSize: '0.85rem' }}>2 mins ago</span>
            </li>
            <li>
              <span style={{ color: 'var(--accent-cyan)', marginRight: '10px' }}>•</span>
              {role === 'student' ? 'Grade Updated: Data Structures' : 'New User Registration Sync'}
              <span style={{ float: 'right', fontSize: '0.85rem' }}>1 hour ago</span>
            </li>
            <li>
              <span style={{ color: 'var(--accent-violet)', marginRight: '10px' }}>•</span>
               Live Class scheduled for tomorrow
               <span style={{ float: 'right', fontSize: '0.85rem' }}>5 hours ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;