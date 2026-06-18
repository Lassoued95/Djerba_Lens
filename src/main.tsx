import './i18n';
import emailjs from 'emailjs-com';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize EmailJS (client public key  )
emailjs.init('Qut9jZ376JK9TYUp6');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
