# Task Approval System - Case Study

Bu proje, bir kurum içindeki çalışanların görev talebi oluşturabildiği ve yöneticilerin bu talepleri onaylayıp reddedebildiği iki aşamalı bir yönetim sistemidir. Monorepo yapısı kullanılarak geliştirilmiştir.

## 🏗️ Proje Yapısı

Proje aşağıdaki ana dizinlerden oluşmaktadır:

- `user-panel/`: Çalışanların talep oluşturduğu ve takip ettiği React uygulaması (Port: 3000)
- `admin-panel/`: Yöneticilerin talepleri yönettiği React uygulaması (Port: 3001)
- `packages/ui/`: Her iki panel tarafından kullanılan ortak UI bileşen kütüphanesi
- `mock-server/`: Her iki panelin veri ihtiyacını karşılayan JSON-Server tabanlı mock API

## 🚀 Kurulum ve Çalıştırma

Proje `npm workspaces` kullanmaktadır. Bağımlılıkları en üst dizinde tek seferde kurabilirsiniz:

```bash
# Bağımlılıkları kurun
npm install

# Tüm uygulamaları aynı anda başlatın (Mock server dahil)
npm run user-panel:dev
npm run admin-panel:dev
npm run mock-server:dev
```

Ayrı ayrı çalıştırmak isterseniz:

- User Panel: `npm run user-panel:dev`
- Admin Panel: `npm run admin-panel:dev`
- Mock Server: `npm run mock-server:dev`

## 👥 Test Kullanıcıları

### User Panel (Çalışanlar)

| Email            | Şifre    |
| :--------------- | :------- |
| `user1@test.com` | `123456` |
| `user2@test.com` | `123456` |

### Admin Panel (Yöneticiler)

| Email                | Şifre       | Rol       |
| :------------------- | :---------- | :-------- |
| `admin@test.com`     | `admin123`  | Admin     |
| `moderator@test.com` | `mod123`    | Moderator |
| `viewer@test.com`    | `viewer123` | Viewer    |

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** React 19, TypeScript, Vite
- **State Management:** Redux Toolkit (AsyncThunk)
- **Validation:** TanStack Form + Zod
- **API:** Axios
- **Styling:** CSS Modules, Vanilla CSS (Premium Design Focus)
- **Icons:** React Icons
- **Common:** @base-ui/react

## 📌 Mimari Kararlar

- **Monorepo:** Ortak bileşenlerin ve tiplerin paylaşımı için monorepo yapısı tercih edildi.
- **Shared UI Package:** Bileşen tutarlılığını sağlamak için `@case-study/ui` paketi oluşturuldu.
- **Theme Support:** Dark/Light tema desteği CSS değişkenleri ve `color-scheme` kullanılarak sağlandı.
- **Role-based Access:** Admin panelinde yetki bazlı sayfa ve buton erişim kısıtlamaları uygulandı.

## 🌟 Bonus Özellikler

Proje geliştirilirken vaka dökümanında belirtilen aşağıdaki opsiyonel özellikler eklenmiştir:

- **Çoklu Dil Desteği (i18n):** Uygulama içerisinde Türkçe ve İngilizce dil desteği altyapısı mevcuttur.
- **Dark/Light Tema:** Kullanıcının sistem tercihine göre veya uygulama genelinde çalışan dinamik tema desteği.
- **Premium UI & Animasyonlar:** Yumuşak geçişler, mikro-animasyonlar ve modern bir tasarım dili.
- **Hiyerarşik Role-based Access:** Moderator ve Admin rollerine özel yetkilendirme katmanları.

## ⚠️ Eksikler ve Notlar

- **Unit Test:** Zaman kısıtı veya mevcut geliştirme odakları nedeniyle projede unit test yazılmamıştır.
- **Socket:** Gerçek zamanlı güncellemeler mock-server üzerinden simüle edilmiştir.

---

_Bu proje bir teknik case study çalışması olarak hazırlanmıştır._
