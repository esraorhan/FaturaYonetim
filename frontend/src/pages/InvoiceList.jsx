import React, { useState, useEffect } from 'react';
import api from '../services/api';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-12-31');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInvoices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/invoice/list', {
        params: {
          startdate: startDate,
          enddate: endDate
        }
      });
      setInvoices(response.data);
    } catch (error) {
      setError('Fatura verileri alınırken hata oluştu.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Fatura Listesi</h2>

      {/* Tarih Filtresi */}
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

      {/* Hata veya Yükleme */}
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="alert alert-info">Yükleniyor...</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Fatura No</th>
              <th>Tarih</th>
              <th>Tutar</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice.invoiceId}>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                  <td>{invoice.totalAmount} ₺</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">Fatura bulunamadı</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default InvoiceList;
