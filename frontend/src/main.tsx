/**
 * @module main
 * @description React application entry point.
 * Mounts the root App component and registers global styles.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('[main] Root element #root not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
