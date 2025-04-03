import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom'; 
import Swal from 'sweetalert2';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedInvoiceId, setExpandedInvoiceId] = useState(null); // 👈 Açılan fatura satırını tutar
  const toplamTutar = invoices.reduce((acc, item) => acc + item.totalAmount, 0);

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/Invoices/list', {
        params: { start: startDate, end: endDate }
      });
      setInvoices(response.data.data);
    } catch (error) {
      setError('Fatura verileri alınırken bir hata oluştu.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const toggleInvoice = (invoiceId) => {
    setExpandedInvoiceId(prev => (prev === invoiceId ? null : invoiceId));
  };
  const handleDelete = (invoiceId) => {
    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Bu faturayı silmek istediğinize emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'Vazgeç'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/Invoices/delete/${invoiceId}`);
          Swal.fire('Silindi!', 'Fatura başarıyla silindi.', 'success');
          fetchInvoices();
        } catch (error) {
          console.error('Silme hatası:', error);
          Swal.fire('Hata', 'Fatura silinemedi.', 'error');
        }
      }
    });
  };
  
  
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Fatura Listesi</h2>

      <div className="row mb-4">
        <div className="col-md-3">
          <label>Başlangıç Tarihi</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label>Bitiş Tarihi</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={fetchInvoices}>
            Filtrele
          </button>
        </div>
      </div>
      <h5 className="mt-3">
  Toplam Tutar: <span className="badge bg-success">{toplamTutar.toFixed(2)} ₺</span>
</h5>

<div className="mb-3 text-end">
  <Link to="/invoices/add" className="btn btn-success">+ Yeni Fatura</Link>
</div>

      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div className="alert alert-info">Yükleniyor...</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Fatura No</th>
              <th>Tarih</th>
              <th>Tutar</th>
              <th>Detay</th>
              <th>İşlemler</th>
              
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <React.Fragment key={invoice.invoiceId}>
                  <tr>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                    <td>{invoice.totalAmount} ₺</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => toggleInvoice(invoice.invoiceId)}
                      >
                        {expandedInvoiceId === invoice.invoiceId ? 'Kapat' : 'Görüntüle'}
                      </button>
                    </td>
                    <td>
                    <Link
                      to={`/invoices/edit/${invoice.invoiceId}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Düzenle
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(invoice.invoiceId)}
                    >
                      Sil
                    </button>
                  </td>

                  </tr>

                  {/* 👇 Alt satır - ürün detayı */}
                  {expandedInvoiceId === invoice.invoiceId && (
                    <tr>
                      <td colSpan="4">
                        <table className="table table-sm table-bordered mb-0">
                          <thead className="table-light">
                            <tr>
                              <th>Ürün Adı</th>
                              <th>Adet</th>
                              <th>Fiyat</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.invoiceLines.map((line, index) => (
                              <tr key={index}>
                                <td>{line.itemName}</td>
                                <td>{line.quentity}</td>
                                <td>{line.price} ₺</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">Fatura bulunamadı</td>
              </tr>
            )}
          </tbody>
        </table>

        
      )}
    </div>
  );
};

export default InvoiceList;
