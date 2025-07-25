import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@futureverse/auth-react';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userSession } = useAuth();
  return userSession ? <>{children}</> : <Navigate to="/" />;
}

function Home() {
  const { userSession, authClient } = useAuth();
  
  if (userSession) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to Evolution Stables</h1>
      <p>Sign in for waitlist access and exclusive updates.</p>
      <div style={{ marginTop: '2rem' }}>
        <button 
          onClick={() => authClient.signIn()} 
          style={{ 
            padding: '1rem 2rem', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Sign In with Futureverse
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const { userSession, authClient } = useAuth();
  
  const handleLogout = () => {
    authClient.signOut();
  };
  
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>Logout</button>
      </div>
      <p>Welcome, {userSession?.futurepass || userSession?.eoa || 'User'}!</p>
      <p>🐎 Join our exclusive Evolution Stables waitlist for early access to racehorse tokenization.</p>
      <div style={{ marginTop: '2rem' }}>
        <h3>Quick Actions:</h3>
        <ul>
          <li>✅ Profile completed</li>
          <li>🎯 Waitlist status: Active</li>
          <li>📧 Email notifications enabled</li>
        </ul>
      </div>
    </div>
  );
}

function Profile() {
  const { userSession } = useAuth();
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <p>Manage your Evolution Stables profile and preferences.</p>
      <div style={{ marginTop: '2rem' }}>
        <h3>User Information:</h3>
        <p><strong>FuturePass:</strong> {userSession?.futurepass || 'Not connected'}</p>
        <p><strong>EOA:</strong> {userSession?.eoa || 'Not connected'}</p>
        <p><strong>Status:</strong> Active Member</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/callback" element={<div style={{ padding: '2rem', textAlign: 'center' }}>Authenticating...</div>} />
    </Routes>
  );
}
