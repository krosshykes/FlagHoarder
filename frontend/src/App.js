import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Forensics from './pages/Forensics/Forensics';
import Cryptography from './pages/Cryptography/Cryptography';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import ReverseEngineering from './pages/ReverseEngineering/ReverseEngineering';
import Web from './pages/Web/Web';
import Pwn from './pages/Pwn/Pwn';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forensics" element={<Forensics />} />
          <Route path="/crypto" element={<Cryptography />} />
          <Route path="/pwn" element={<Pwn />} />
          <Route path="/reversing" element={<ReverseEngineering />} />
          <Route path="/web" element={<Web />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App