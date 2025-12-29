# Portfolio Website

Modern ve responsive frontend developer portföy web sitesi. Next.js, TypeScript, Tailwind CSS ve Framer Motion kullanılarak geliştirilmiştir.

## Özellikler

- 🎨 Dark theme tasarım
- 📱 Tam responsive (mobil, tablet, desktop)
- ⚡ Next.js 14 App Router
- 🎭 Framer Motion animasyonları
- 🎯 Modern tipografi ve spacing
- 🔗 GitHub ve LinkedIn entegrasyonu

## Teknolojiler

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build
npm start
```

Site [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## Proje Yapısı

```
├── app/
│   ├── layout.tsx      # Ana layout
│   ├── page.tsx        # Ana sayfa
│   └── globals.css     # Global stiller
├── components/
│   ├── Hero.tsx        # Hero section
│   ├── Projects.tsx    # Projeler bölümü
│   ├── Experience.tsx  # Deneyim timeline
│   ├── Skills.tsx      # Yetenekler
│   ├── Education.tsx   # Eğitim
│   └── Contact.tsx     # İletişim
└── public/             # Statik dosyalar
```

## Özelleştirme

- Kişisel bilgileri `components/` klasöründeki ilgili bileşenlerde güncelleyin
- Renkleri `tailwind.config.js` dosyasından değiştirebilirsiniz
- Projeleri `components/Projects.tsx` dosyasından ekleyebilir veya düzenleyebilirsiniz

## Lisans

MIT

