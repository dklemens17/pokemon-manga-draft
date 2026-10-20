import React from 'react';
import { createRoot } from 'react-dom/client';
import { installLocalStorageShim } from './storage.js';
import App from './App.jsx';

installLocalStorageShim();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
