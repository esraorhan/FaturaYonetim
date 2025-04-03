import React, { useState } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from '../services/api';
const LoginPage = () => {
    const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
 
  const handleSubmit = async (e) => {

    e.preventDefault();
    // console.log('Giriş yapılıyor:', { userName, password });

    try {
        const result = await loginUser(userName, password);
        const token = result.token;
        localStorage.setItem('token', token);
        
        const userInfo = parseJwt(token);
        console.log('Çözülmüş kullanıcı bilgisi:', userInfo);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        navigate('/invoices');
        // Yönlendirme gibi bir şey yapacaksan buraya ekleyebilirsin
        // navigate('/invoices'); örneğin
      } catch (error) {
        console.error('Giriş başarısız:', error);
        alert('Giriş yapılamadı. Bilgilerinizi kontrol edin.');
      }
  };

  

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f3f3f3'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Giriş Yap</h2>

        <div style={{ marginBottom: '15px' }}>
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginTop: '5px'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label>Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              marginTop: '5px'
            }}
          />
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '10px',
          borderRadius: '6px',
          backgroundColor: '#2c3e50',
          color: 'white',
          border: 'none',
          fontWeight: 'bold'
        }}>
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
