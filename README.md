# 📄 Fatura Yönetim Sistemi

Bu proje, React ve ASP.NET Core (.NET 8) teknolojileriyle geliştirilmiş, JWT tabanlı oturum yönetimi içeren bir fatura takip uygulamasıdır.

## 🔧 Kullanılan Teknolojiler

- ✅ ASP.NET Core (.NET 8)
- ✅ Entity Framework Core
- ✅ React (Vite + Bootstrap)
- ✅ Axios (API iletişimi için)
- ✅ JWT (Kimlik Doğrulama)
- ✅ SweetAlert2 (Bildirimler için)
- ✅ Swagger (API test arayüzü)

---

## 🧩 Proje Özellikleri

- 🔐 Giriş yapmadan erişilemeyen korumalı endpoint'ler
- 👤 Kullanıcı giriş/çıkış işlemleri (JWT ile)
- 📋 Fatura listeleme (tarihe göre filtreleme)
- ➕ Yeni fatura ekleme (birden fazla ürün kalemi ile)
- ✏️ Fatura güncelleme (ürün satırı ekleme/silme)
- 🗑️ Fatura silme işlemi (onay modalları ile)
- 📌 Tüm işlemlerde `userId` bazlı kayıt yönetimi
- 📁 Dinamik müşteri listesi (select box)
- ✅ SPA deneyimi: Sayfa yenilenmeden tüm işlemler
- 💅 Bootstrap tasarımı + kullanıcı dostu arayüz

---

## 🚀 Projeyi Çalıştırmak

### 🖥️ Backend (.NET 8)

1. `FaturaYonetim.API` projesini aç
2. `appsettings.json` dosyasını kontrol et (veritabanı bağlantısı, JWT Key, Issuer, Audience)
3. Projeyi çalıştır (`dotnet run` ya da F5)

### 🌐 Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Giriş Bilgisi (Demo)

```
Kullanıcı Adı: admin
Şifre: 123456
```

---

## 📌 Notlar

- Token olmadan Swagger üzerinden yetkili endpoint’lere erişilemez.
- `Authorize` butonuna tıklayıp `"Bearer <token>"` formatında giriş yapılmalıdır.

---

## ✍️ Geliştirici

**Esra Orhan Demir**  

