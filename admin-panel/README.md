# Admin Panel - Task Approval System

Yöneticilerin talepleri inceleyip onayladığı, kullanıcı yönetiminin yapıldığı yönetim panelidir.

## 🔐 Rol Bazlı Erişim (RBAC)

Panelde üç farklı yetki seviyesi bulunmaktadır:

- **Admin:** Tüm yetkiler + Kullanıcı ekleme/düzenleme/silme.
- **Moderator:** Bekleyen talepleri onaylama ve reddetme yetkisi.
- **Viewer:** Sadece görüntüleme yetkisi (onay/red butonları pasiftir).

## ✨ Özellikler

- **Gelişmiş Dashboard:** Bugünün onay/red sayıları ve öncelik bazlı dağılım grafikleri.
- **Bekleyen Talepler:**
  - Arama (Başlık, Talep Sahibi) ve filtreleme.
  - Hızlı aksiyon butonları (Onayla/Reddet).
  - Reddetme sırasında zorunlu gerekçe girişi.
- **Tüm Talepler:** Arşiv sistemli tüm geçmiş taleplerin listesi.
- **Kullanıcı Yönetimi (Admin Only):** Yeni yönetici ekleme ve mevcutları yönetme.

## 🛠️ Teknik Detaylar

- **Güvenlik:** Route-level yetki kontrolü (Guard components).
- **UI/UX:** `@case-study/ui` kütüphanesi ile tutarlı arayüz. premium ve responsive tasarım.
- **State:** Redux Toolkit ile global state yönetimi.

## 🏃 Yerel Çalıştırma

Bağımlılıklar ana dizinde kurulmuşsa:

```bash
npm run admin-panel:dev
```

Panel varsayılan olarak `http://localhost:3001` portunda çalışacaktır.

## 🔑 Test Kullanıcıları

| Email                | Şifre       | Rol       |
| :------------------- | :---------- | :-------- |
| `admin@test.com`     | `admin123`  | Admin     |
| `moderator@test.com` | `mod123`    | Moderator |
| `viewer@test.com`    | `viewer123` | Viewer    |
