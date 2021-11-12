import React from 'react';
import './App.css';
import { ProjectOverviewPage } from 'pages/ProjectOverviewPage';
import { LoginPage } from 'pages/LoginPage';
import { useAuthState } from 'components/AuthState';
import { CssBaseline } from '@material-ui/core';
import { AuthorizedPage } from 'pages/AuthorizedPage';

function App() {

  const authState = useAuthState();
  const credential = authState?.credential || null;
  const email = credential?.email || null;

  return (
    <div className="App">
      <CssBaseline />
      { email ? <AuthorizedPage /> : <LoginPage /> }
    </div>
  );
}

export default App;
