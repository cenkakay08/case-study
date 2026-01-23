# User Panel - Task Approval System

Çalışanların görev talebi oluşturup kendi taleplerini takip ettiği paneldir.

## ✨ Özellikler

- **Oturum Yönetimi:** Email ve şifre ile güvenli giriş.
- **Dashboard:** Kişisel talep istatistikleri ve son taleplerin özeti.
- **Talep Oluşturma:**
  - Validasyon destekli (Zod) form yapısı.
  - Öncelik (Düşük, Normal, Yüksek, Acil) ve Kategori seçimi.
- **Taleplerim:**
  - Durum bazlı filtreleme.
  - Talep detaylarını görüntüleme.
  - Reddedilen talepler için red gerekçesini görme.

## 🛠️ Teknik Detaylar

- **Form Yönetimi:** `@tanstack/react-form` kullanılarak performanslı form yönetimi sağlandı.
- **Dil Desteği:** i18next ile çoklu dil desteği (TR/EN) altyapısı hazırlandı.
- **Styling:** CSS Modules kullanılarak kapsüllenmiş stiller oluşturuldu.

## 🏃 Yerel Çalıştırma

Bağımlılıklar ana dizinde kurulmuşsa:

```bash
npm run user-panel:dev
```

Panel varsayılan olarak `http://localhost:3000` portunda çalışacaktır.

## 🔑 Test Kullanıcıları

| Email            | Şifre    |
| :--------------- | :------- |
| `user1@test.com` | `123456` |
| `user2@test.com` | `123456` |
