import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ProjectOverviewPage } from 'pages/ProjectOverviewPage';
import { LoginPage } from 'pages/LoginPage';
import { useAuthState } from 'components/AuthState';

function App() {

  const authState = useAuthState();
  const credential = authState?.credential || null;
  const email = credential?.email || null;

  return (
    <div className="App">
      { email && (
        <div>
          Welcome {email}!
          </div>
      )}
      { email ? <ProjectOverviewPage /> : <LoginPage /> }
    </div>
  );
}

export default App;
