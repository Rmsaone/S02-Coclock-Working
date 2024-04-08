import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import 'react-toastify/dist/ReactToastify.css';
import './styles/main.scss';

import { BrowserRouter as Router } from 'react-router-dom'
import AuthProvider from './context/auth-context.tsx';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer/>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
)
