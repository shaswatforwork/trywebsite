# RUDRAVYA E‑commerce (Full‑stack)

This is a production‑ready starter for an electronics/robotics store: **Next.js 14 + Tailwind (frontend)** and **Express + Prisma + PostgreSQL (backend)** with **AWS S3** uploads and JWT auth (admin support).

## Features
- Product listing, search, details
- Cart, Checkout (COD placeholder)
- Login, Register, Logout
- Admin portal: add/remove products, S3 image upload (presigned)
- Responsive UI with gradients

## Local Setup
1. **Backend**
   ```bash
   cd backend
   cp .env.example .env          # fill DATABASE_URL, AWS keys, S3_BUCKET
   npm i
   npx prisma generate
   npx prisma migrate dev --name init
   npm run dev
   ```
   API runs at `http://localhost:8080`.

2. **Frontend**
   ```bash
   cd ../frontend
   cp .env.example .env
   npm i
   npm run dev
   ```
   Open `http://localhost:3000`.

> Default admin code (optional during signup): `RUDRAVYA_ADMIN_2025`

## AWS (Step‑by‑Step)
- **RDS (PostgreSQL)**: Create a PostgreSQL instance (db.t3.micro for dev). Note the host, username, password, database. Put them into `DATABASE_URL`.
- **S3**: Create bucket `rudravya-product-images` in `ap-south-1`. Enable public access (or serve via CloudFront). Create IAM user with policy `AmazonS3FullAccess` (or least‑privilege for that bucket). Put keys and region in backend `.env`.
- **EC2 or Elastic Beanstalk for Backend**:
  - Build: `npm ci && npx prisma generate`
  - Set env vars.
  - Open port 8080 or use Nginx reverse proxy.
- **Vercel/Amplify for Frontend**:
  - Set `NEXT_PUBLIC_API_BASE` to your backend public URL.
  - Build & deploy.
- **Optional: CloudFront** in front of S3 for CDN.
- **Optional: Cognito/Razorpay**: Replace custom auth or add payments.

## Production Notes
- Store prices in **paisa** to avoid floating errors.
- Use HTTPS and secure cookies for JWT on production.
- Add rate limiting (e.g. `express-rate-limit`).
- Validation (zod/yup) for payloads.
- Configure CORS to frontend domain only.

## Adding Products
- Register → (optionally) enter admin code → Admin → Products.
- Upload images via S3 presigned URL and Save.

Enjoy building **RUDRAVYA**! 🚀
