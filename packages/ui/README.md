# @case-study/ui

Task Approval System projesi için geliştirilmiş ortak bileşen kütüphanesidir. Hem `user-panel` hem de `admin-panel` tarafından kullanılmaktadır.

## 🎨 Tasarım Sistemi

Kütüphane, modern ve premium bir görünüm için aşağıdaki prensipleri takip eder:

- **Design Tokens:** Renkler, boşluklar ve tipografi `tokens.css` üzerinden yönetilir.
- **Theme flipping:** `--color-white` ve `--color-black` gibi değişkenler temaya göre otomatik renk değiştirir.
- **Micro-animations:** Butonlar ve dialoglar için yumuşak transition efektleri.

## 📦 İçerik

Temel bileşenlerden bazıları:

- **Button:** Farklı varyantları (primary, secondary, danger) olan özelleştirilebilir butonlar.
- **Badge:** Durum (Approved, Rejected, Pending) ve Öncelik (Urgent, High, vb.) gösterimi için renk kodlu etiketler.
- **Tooltip:** `@base-ui/react` tabanlı, her iki temada yüksek okunabilirlikli bilgilendirme balonları.
- **Dialog/Modal:** Formlar ve onay süreçleri için kullanılan erişilebilir modallar.
- **Fields:** TanStack Form ile uyumlu input ve select bileşenleri.

## 🛠️ Kullanım

Bu paket monorepo içinde paylaşılan bir pakettir. Uygulamalarda şu şekilde import edilir:

```tsx
import { Button, Badge } from "@case-study/ui";
```

## 🏗️ Yapı

```
packages/ui/
├── src/
│   ├── components/  # Reusable React bileşenleri
│   ├── tokens.css   # Global design tokens ve renkler
│   └── index.ts     # Export noktası
└── package.json
```
