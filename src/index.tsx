import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { LoaderProvider } from './context/LoaderContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <LoaderProvider>
    <Router>
      <App />
    </Router>
  </LoaderProvider>
);
