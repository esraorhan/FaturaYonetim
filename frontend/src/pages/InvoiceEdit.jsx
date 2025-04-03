import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Swal from 'sweetalert2';
const InvoiceEdit = () => {
  const { invoiceId } = useParams();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  //const [customerId, setCustomerId] = useState('');


 
  
  
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await api.get(`/Invoices/${invoiceId}`);
        setInvoice(response.data.data); // Swagger'da 'data' ile dönüyor
      } catch (error) {
        console.error('Fatura getirme hatası:', error);
        alert('Fatura bilgileri alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoiceId]);


  useEffect(() => {
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
    const updatedLines = [...invoice.invoiceLines];
    updatedLines[index] = {
      ...updatedLines[index],
      [field]: field === 'quentity' || field === 'price' ? Number(value) : value
    };
    


    setInvoice({ ...invoice, invoiceLines: updatedLines });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userId = userInfo?.userId;
    console.log('Token UserInfo:', userInfo); // 🔍 buraya bak
    console.log('Kullanıcı ID:', userId);
    const updatedLines = invoice.invoiceLines.map(line => ({
      ...line,
      userId: userId // 👈 her satıra ekleniyor
    }));
    const updatedTotal = updatedLines.reduce(
      (acc, line) => acc + line.quentity * line.price,
      0
    );

    // const updatedInvoice = {
    //   ...invoice,
    //   totalAmount: updatedTotal
    // };
    const updatedInvoice = {
      ...invoice,
      totalAmount: updatedTotal,
      invoiceLines: updatedLines,
      userId: userId
    };
    
    try {
      await api.put('/Invoices/update', updatedInvoice);
      Swal.fire({
        icon: 'success',
        title: 'Başarılı',
        text: 'Fatura başarı şekilde güncellendi!'
      });
      navigate('/invoices');
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      Swal.fire('Hata!', 'Fatura güncellenemedi.', 'error');

    }
  };

  if (loading || !invoice) return <div className="container mt-4">Yükleniyor...</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Fatura Güncelle</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Fatura Numarası</label>
          <input
            type="text"
            className="form-control"
            value={invoice.invoiceNumber}
            onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Fatura Tarihi</label>
          <input
            type="date"
            className="form-control"
            value={invoice.invoiceDate.slice(0, 10)}
            onChange={(e) => setInvoice({ ...invoice, invoiceDate: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Müşteri </label>
  <select
  className="form-select"
  value={invoice.customerId}
  onChange={(e) => setInvoice({ ...invoice, customerId: Number(e.target.value) })}
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
        <h5>Ürün Kalemleri</h5>

        {invoice.invoiceLines.map((line, index) => (
          <div className="row mb-3" key={index}>
            <div className="col-md-4">
              <label>Ürün Adı</label>
              <input
                type="text"
                className="form-control"
                value={line.itemName}
                onChange={(e) => handleLineChange(index, 'itemName', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <label>Adet</label>
              <input
                type="number"
                className="form-control"
                value={line.quentity.toString().replace(/^0+/, '')}
                min="1"
                onChange={(e) => handleLineChange(index, 'quentity', e.target.value)}
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
              />
            </div>
          </div>
        ))}

        <div className="mb-3 mt-3">
          <strong>Yeni Toplam Tutar: </strong>
          {invoice.invoiceLines.reduce((acc, line) => acc + line.quentity * line.price, 0).toFixed(2)} ₺
        </div>

        <button type="submit" className="btn btn-primary">
          Güncelle
        </button>
      </form>
    </div>
  );
};

export default InvoiceEdit;
