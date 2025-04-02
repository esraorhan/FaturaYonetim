import React from 'react';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceList from './pages/InvoiceList';
function App() {
  

  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/invoices" element={<InvoiceList />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
