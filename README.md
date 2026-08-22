# CONKER STORE

متجر Next.js + TypeScript + Tailwind + Framer Motion + PostgreSQL + Prisma.

## التشغيل

1. ثبّت Node.js.
2. انسخ `.env.example` إلى `.env`.
3. ضع بيانات PostgreSQL في `DATABASE_URL`.
4. نفّذ:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

ثم افتح `http://localhost:3000`.

## ملاحظات
- الصور الموجودة في seed هي مسارات placeholder؛ ضع صورك داخل `public/products/`.
- صفحة `/admin` حاليًا لوحة داخلية أولية وليست محمية بتسجيل دخول. قبل نشرها للعامة يجب إضافة Authentication وصلاحيات Admin.
- غيّر رقم WhatsApp في `.env`.
