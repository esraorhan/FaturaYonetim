import React from 'react';
import LoginPage from './pages/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceList from './pages/InvoiceList';
import InvoiceAdd from './pages/InvoiceAdd';
import InvoiceEdit from './pages/InvoiceEdit';
function App() {
  

  return (
    <>
       <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/add" element={<InvoiceAdd />} />
        <Route path="/invoices/edit/:invoiceId" element={<InvoiceEdit />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
