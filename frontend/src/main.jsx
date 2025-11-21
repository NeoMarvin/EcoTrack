// In src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import AuthState from './context/auth/AuthState.jsx';
// 1. IMPORT YOUR NEW ACTIVITY STATE
import ActivityState from './context/activity/ActivityState.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthState>
      {/* 2. WRAP YOUR APP IN IT */}
      <ActivityState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ActivityState>
    </AuthState>
  </React.StrictMode>
);