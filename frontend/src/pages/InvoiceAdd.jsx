import React, { useState,useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const InvoiceAdd = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfo?.userId;
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [invoiceLines, setInvoiceLines] = useState([
    { itemName: '', quentity: 1, price: 0 ,userId: userId}
  ]);

  

  const [customers, setCustomers] = useState([]); //önce tanımladık...
  useEffect(() => { //sonrasında api ile veriyi doldurduk.
    const fetchCustomers = async () => {
      try {
        const response = await api.get('/Customers/list');
        setCustomers(response.data.data);
      } catch (error) {
        console.error('Müşteri listesi alınamadı:', error);
      }
    };
  
    fetchCustomers();
  }, []);
  
  const handleLineChange = (index, field, value) => {
    const newLines = [...invoiceLines];
    newLines[index][field] = field === 'quentity' || field === 'price' ? Number(value) : value;
    setInvoiceLines(newLines);
  };

  const addLine = () => {
    setInvoiceLines([...invoiceLines, { itemName: '', quentity: 1, price: 0 , userId: userId}]);
  };

  const removeLine = (index) => {
    const newLines = [...invoiceLines];
    newLines.splice(index, 1);
    setInvoiceLines(newLines);
  };

  const totalAmount = invoiceLines.reduce((acc, line) => acc + (line.quentity * line.price), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/Invoices/add', {
        invoiceNumber,
        invoiceDate,
        customerId: Number(customerId),
        totalAmount,
        userId,
        invoiceLines
      });

      Swal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: 'Fatura eklendi!'
      });
      navigate('/invoices');
    } catch (error) {
      console.error('Fatura eklenemedi:', error);
      Swal.fire({
        icon: 'error',
        title: 'Hata',
        text: 'Fatura eklenemedi:' +error
      });
      
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Yeni Fatura Oluştur</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Fatura Numarası</label>
          <input
            type="text"
            className="form-control"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Fatura Tarihi</label>
          <input
            type="date"
            className="form-control"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Müşteri ID</label>
          <select
  className="form-select"
  value={customerId}
  onChange={(e) => setCustomerId(e.target.value)}
  required
>
  <option value="">Müşteri Seçiniz</option>
  {customers.map((customer) => (
    <option key={customer.customerId} value={customer.customerId}>
      {customer.title}
    </option>
  ))}
</select>

        </div>

        <hr />
        <h5>Fatura Kalemleri</h5>

        {invoiceLines.map((line, index) => (
            
  <div key={index} className="row mb-3 align-items-end">
    <div className="col-md-4">
      <label>Ürün Adı</label>
      <input
        type="text"
        className="form-control"
        value={line.itemName}
        onChange={(e) => handleLineChange(index, 'itemName', e.target.value)}
        required
      />
    </div>
    <div className="col-md-2">
      <label>Adet</label>
      <input
        type="number"
        className="form-control"
        value={line.quentity.toString().replace(/^0+/, '')} // baştaki sıfırları sil
        min="1"
        onChange={(e) => handleLineChange(index, 'quentity', e.target.value)}
        required
      />
    </div>
    <div className="col-md-3">
      <label>Fiyat</label>
      <input
        type="number"
        className="form-control"
        value={line.price.toString().replace(/^0+/, '')}
        min="0"
        step="0.01"
        onChange={(e) => handleLineChange(index, 'price', e.target.value)}
        required
      />
    </div>
    <div className="col-md-2 d-flex">
      <button
        type="button"
        className="btn btn-danger mt-4"
        onClick={() => removeLine(index)}
        disabled={invoiceLines.length === 1}
      >
        Sil
      </button>
    </div>
  </div>
))}


        <div className="mb-3">
          <button type="button" className="btn btn-secondary" onClick={addLine}>
            + Yeni Ürün Satırı
          </button>
        </div>

        <div className="mb-3">
          <label>Toplam Tutar</label>
          <input
            type="text"
            className="form-control"
            value={`${totalAmount.toFixed(2)} ₺`}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default InvoiceAdd;
