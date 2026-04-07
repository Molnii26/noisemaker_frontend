import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/css/App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Fooldal from '../src/pages/Fooldal';
import Regisztracio from '../src/pages/Regisztracio';
import Bejelentkezes from '../src/pages/Bejelentkezes';
import Kosar from '../src/pages/Kosar';
import Termekek from './pages/Termekek';
import Fiokom from './pages/Fiokom';
import Termek from './pages/Termek';
import Admin from './pages/Admin';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/fooldal" replace />} />
        <Route path="/fooldal" element={<Fooldal />} />
        <Route path="/regisztracio" element={<Regisztracio />} />
        <Route path="/bejelentkezes" element={<Bejelentkezes />} />
        <Route path="/kosar" element={<Kosar />} />
        <Route path="/termekek" element={<Termekek />} />
        <Route path="/fiokom" element={<Fiokom />} />
        <Route path="/getProduct/:id" element={<Termek />} />
        <Route path="/adminpanel" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
