# 🚀 Aplikasi Forum Fullstack# 🚀 Fullstack Forum Application

Aplikasi forum modern dan skalabel yang dibangun dengan Next.js 15 (Frontend) dan Express.js (Backend), menampilkan diskusi real-time, autentikasi pengguna, dan operasi CRUD yang komprehensif.A modern, scalable forum application built with Next.js 15 (Frontend) and Express.js (Backend), featuring real-time discussions, user authentication, and comprehensive CRUD operations.

## 📋 Daftar Isi## 📋 Table of Contents

- [✨ Fitur](#-fitur)- [✨ Features](#-features)

- [🏗️ Arsitektur & Tech Stack](#️-arsitektur--tech-stack)- [🏗️ Architecture & Tech Stack](#️-architecture--tech-stack)

- [📦 Paket & Dependensi](#-paket--dependensi)- [📦 Packages & Dependencies](#-packages--dependencies)

- [🗄️ Skema Database & ERD](#️-skema-database--erd)- [🗄️ Database Schema & ERD](#️-database-schema--erd)

- [🔄 Diagram Alur Aplikasi](#-diagram-alur-aplikasi)- [🔄 Application Flowchart](#-application-flowchart)

- [📋 Prasyarat](#-prasyarat)- [📋 Prerequisites](#-prerequisites)

- [🚀 Instalasi & Setup](#-instalasi--setup)- [🚀 Installation & Setup](#-installation--setup)

- [🔧 Konfigurasi](#-konfigurasi)- [🔧 Configuration](#-configuration)

- [🏃‍♂️ Menjalankan Aplikasi](#️-menjalankan-aplikasi)- [🏃‍♂️ Running the Application](#️-running-the-application)

- [📡 Dokumentasi API](#-dokumentasi-api)- [📡 API Documentation](#-api-documentation)

- [🧪 Testing](#-testing)- [🧪 Testing](#-testing)

- [🚀 Deployment](#-deployment)- [🚀 Deployment](#-deployment)

- [📁 Struktur Proyek](#-struktur-proyek)- [📁 Project Structure](#-project-structure)

- [🔒 Keamanan](#-keamanan)- [🔒 Security](#-security)

- [⚡ Performa](#-performa)- [⚡ Performance](#-performance)

- [🤝 Kontribusi](#-kontribusi)- [🤝 Contributing](#-contributing)

- [📄 Lisensi](#-lisensi)- [📄 License](#-license)

- [🙏 Ucapan Terima Kasih](#-ucapan-terima-kasih)- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Fitur## ✨ Features

### 🎯 Fitur Utama### 🎯 Core Features

- **Antarmuka Forum Modern**: UI yang bersih dan responsif dengan dukungan mode gelap/terang- **Modern Forum Interface**: Clean, responsive UI with dark/light mode support

- **Autentikasi Pengguna**: Auth berbasis JWT dengan hashing password yang aman- **User Authentication**: JWT-based auth with secure password hashing

- **Manajemen Thread**: Buat, baca, update, hapus thread diskusi- **Thread Management**: Create, read, update, delete discussion threads

- **Sistem Post**: Komentar bertingkat dan balasan dengan threading- **Post System**: Nested comments and replies with threading

- **Update Real-time**: Update optimis dengan React Query- **Real-time Updates**: Optimistic updates with React Query

- **Pencarian & Filter**: Kemampuan pencarian dan filter tingkat lanjut- **Search & Filter**: Advanced search and filtering capabilities

- **Profil Pengguna**: Manajemen profil dan statistik pengguna- **User Profiles**: Profile management and user statistics

- **Panel Admin**: Alat moderasi dan manajemen pengguna- **Admin Panel**: Moderation tools and user management

### 🛠️ Fitur Teknis### 🛠️ Technical Features

- **Type Safety**: Implementasi TypeScript penuh- **Type Safety**: Full TypeScript implementation

- **SEO Dioptimalkan**: Server-side rendering dengan Next.js- **SEO Optimized**: Server-side rendering with Next.js

- **Dokumentasi API**: Dokumen Swagger yang dihasilkan otomatis- **API Documentation**: Auto-generated Swagger docs

- **Migrasi Database**: Perubahan skema yang dikontrol versi- **Database Migrations**: Version-controlled schema changes

- **Penanganan Error**: Error boundaries dan logging yang komprehensif- **Error Handling**: Comprehensive error boundaries and logging

- **Caching**: Integrasi Redis untuk performa- **Caching**: Redis integration for performance

- **Rate Limiting**: Perlindungan API dari penyalahgunaan- **Rate Limiting**: API protection against abuse

- **Upload File**: Dukungan lampiran gambar dan file- **File Uploads**: Image and file attachment support

---

## 🏗️ Arsitektur & Tech Stack## 🏗️ Architecture & Tech Stack

### Arsitektur Frontend### Frontend Architecture

````

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐```

│   Komponen      │    │     Hooks       │    │     API        │┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐

│                 │    │                 │    │                 ││   Components    │    │     Hooks       │    │     API        │

│ • Komponen UI   │◄──►│ • React Query   │◄──►│ • Axios Client  ││                 │    │                 │    │                 │

│ • Formulir      │    │ • Auth Hooks    │    │ • Interceptor   ││ • UI Components │◄──►│ • React Query   │◄──►│ • Axios Client  │

│ • Modal         │    │ • CRUD Hooks    │    │ • Error Handling││ • Forms         │    │ • Auth Hooks    │    │ • Interceptors  │

└─────────────────┘    └─────────────────┘    └─────────────────┘│ • Modals        │    │ • CRUD Hooks    │    │ • Error Handling│

```└─────────────────┘    └─────────────────┘    └─────────────────┘

````

### Arsitektur Backend

````### Backend Architecture

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐

│  Controller     │    │   Service       │    │ Repository      │```

│                 │    │                 │    │                 │┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐

│ • Handler HTTP  │◄──►│ • Logic Bisnis  │◄──►│ • Operasi DB    ││  Controllers    │    │   Services      │    │ Repositories    │

│ • Validasi      │    │ • Authorization │    │ • Query         ││                 │    │                 │    │                 │

│ • Response      │    │ • Transform Data│    │ • Relasi        ││ • HTTP Handlers │◄──►│ • Business Logic│◄──►│ • Database Ops  │

└─────────────────┘    └─────────────────┘    └─────────────────┘│ • Validation    │    │ • Authorization │    │ • Queries       │

```│ • Responses     │    │ • Data Transform│    │ • Relations     │

└─────────────────┘    └─────────────────┘    └─────────────────┘

### Tech Stack```



#### Frontend (Next.js 15)### Technology Stack

- **Framework**: Next.js 15 dengan App Router

- **Bahasa**: TypeScript 5.x#### Frontend (Next.js 15)

- **Styling**: Tailwind CSS 3.x

- **Komponen UI**: shadcn/ui + Radix UI- **Framework**: Next.js 15 with App Router

- **State Management**: TanStack Query 5.x- **Language**: TypeScript 5.x

- **Autentikasi**: NextAuth.js 4.x- **Styling**: Tailwind CSS 3.x

- **Formulir**: React Hook Form + Zod- **UI Components**: shadcn/ui + Radix UI

- **Ikon**: Lucide React- **State Management**: TanStack Query 5.x

- **Notifikasi**: Sonner- **Authentication**: NextAuth.js 4.x

- **Chart**: Recharts (opsional)- **Forms**: React Hook Form + Zod

- **Icons**: Lucide React

#### Backend (Express.js)- **Notifications**: Sonner

- **Runtime**: Node.js 18+- **Charts**: Recharts (optional)

- **Framework**: Express.js 4.x

- **Bahasa**: TypeScript 5.x#### Backend (Express.js)

- **Database**: PostgreSQL 15+

- **ORM**: Prisma 5.x- **Runtime**: Node.js 18+

- **Autentikasi**: JWT + bcrypt- **Framework**: Express.js 4.x

- **Validasi**: Joi 17.x- **Language**: TypeScript 5.x

- **Keamanan**: Helmet, CORS, Rate Limiting- **Database**: PostgreSQL 15+

- **Process Management**: PM2- **ORM**: Prisma 5.x

- **Dokumentasi**: Swagger/OpenAPI- **Authentication**: JWT + bcrypt

- **Validation**: Joi 17.x

#### Development Tools- **Security**: Helmet, CORS, Rate Limiting

- **Version Control**: Git- **Process Management**: PM2

- **Package Manager**: npm/yarn- **Documentation**: Swagger/OpenAPI

- **Code Quality**: ESLint + Prettier

- **Testing**: Jest + Supertest + React Testing Library#### Development Tools

- **API Testing**: Thunder Client/Postman

- **Database GUI**: Prisma Studio- **Version Control**: Git

- **Deployment**: Docker + Vercel/Railway- **Package Manager**: npm/yarn

- **Code Quality**: ESLint + Prettier

---- **Testing**: Jest + Supertest + React Testing Library

- **API Testing**: Thunder Client/Postman

## 📦 Paket & Dependensi- **Database GUI**: Prisma Studio

- **Deployment**: Docker + Vercel/Railway

### Dependensi Frontend (`package.json`)

---

#### Dependensi Utama

```json## 📦 Packages & Dependencies

{

  "next": "^15.0.0",### Frontend Dependencies (`package.json`)

  "react": "^18.2.0",

  "react-dom": "^18.2.0",#### Core Dependencies

  "typescript": "^5.0.0",

  "@tanstack/react-query": "^5.0.0",```json

  "next-auth": "^4.24.0",{

  "@hookform/resolvers": "^3.3.0",  "next": "^15.0.0",

  "react-hook-form": "^7.48.0",  "react": "^18.2.0",

  "zod": "^3.22.0",  "react-dom": "^18.2.0",

  "tailwindcss": "^3.4.0",  "typescript": "^5.0.0",

  "lucide-react": "^0.344.0",  "@tanstack/react-query": "^5.0.0",

  "sonner": "^1.4.0"  "next-auth": "^4.24.0",

}  "@hookform/resolvers": "^3.3.0",

```  "react-hook-form": "^7.48.0",

  "zod": "^3.22.0",

#### Komponen UI & Styling  "tailwindcss": "^3.4.0",

```json  "lucide-react": "^0.344.0",

{  "sonner": "^1.4.0"

  "@radix-ui/react-dialog": "^1.0.0",}

  "@radix-ui/react-dropdown-menu": "^2.0.0",```

  "@radix-ui/react-avatar": "^1.0.0",

  "@radix-ui/react-badge": "^1.0.0",#### UI & Components

  "@radix-ui/react-skeleton": "^1.0.0",

  "class-variance-authority": "^0.7.0",```json

  "clsx": "^2.0.0",{

  "tailwind-merge": "^2.2.0",  "@radix-ui/react-dialog": "^1.0.0",

  "date-fns": "^3.3.0"  "@radix-ui/react-dropdown-menu": "^2.0.0",

}  "@radix-ui/react-avatar": "^1.0.0",

```  "@radix-ui/react-badge": "^1.0.0",

  "@radix-ui/react-skeleton": "^1.0.0",

#### Dependensi Development  "class-variance-authority": "^0.7.0",

```json  "clsx": "^2.0.0",

{  "tailwind-merge": "^2.2.0",

  "@types/node": "^20.0.0",  "date-fns": "^3.3.0"

  "@types/react": "^18.2.0",}

  "@types/react-dom": "^18.2.0",```

  "eslint": "^8.0.0",

  "eslint-config-next": "^15.0.0",#### Development Dependencies

  "prettier": "^3.0.0",

  "autoprefixer": "^10.4.0",```json

  "postcss": "^8.4.0"{

}  "@types/node": "^20.0.0",

```  "@types/react": "^18.2.0",

  "@types/react-dom": "^18.2.0",

### Dependensi Backend (`package.json`)  "eslint": "^8.0.0",

  "eslint-config-next": "^15.0.0",

#### Dependensi Utama  "prettier": "^3.0.0",

```json  "autoprefixer": "^10.4.0",

{  "postcss": "^8.4.0"

  "express": "^4.18.0",}

  "typescript": "^5.0.0",```

  "@prisma/client": "^5.7.0",

  "prisma": "^5.7.0",### Backend Dependencies (`package.json`)

  "jsonwebtoken": "^9.0.0",

  "bcryptjs": "^2.4.3",#### Core Dependencies

  "joi": "^17.11.0",

  "cors": "^2.8.5",```json

  "helmet": "^7.1.0",{

  "express-rate-limit": "^7.1.0",  "express": "^4.18.0",

  "compression": "^1.7.4",  "typescript": "^5.0.0",

  "morgan": "^1.10.0"  "@prisma/client": "^5.7.0",

}  "prisma": "^5.7.0",

```  "jsonwebtoken": "^9.0.0",

  "bcryptjs": "^2.4.3",

#### Dependensi Development  "joi": "^17.11.0",

```json  "cors": "^2.8.5",

{  "helmet": "^7.1.0",

  "@types/express": "^4.17.0",  "express-rate-limit": "^7.1.0",

  "@types/node": "^20.0.0",  "compression": "^1.7.4",

  "@types/jsonwebtoken": "^9.0.0",  "morgan": "^1.10.0"

  "@types/bcryptjs": "^2.4.0",}

  "@types/cors": "^2.8.0",```

  "@types/morgan": "^1.9.0",

  "@types/compression": "^1.7.0",#### Development Dependencies

  "ts-node-dev": "^2.0.0",

  "nodemon": "^3.0.0",```json

  "jest": "^29.0.0",{

  "@types/jest": "^29.0.0",  "@types/express": "^4.17.0",

  "supertest": "^6.3.0",  "@types/node": "^20.0.0",

  "@types/supertest": "^2.0.0",  "@types/jsonwebtoken": "^9.0.0",

  "eslint": "^8.0.0",  "@types/bcryptjs": "^2.4.0",

  "@typescript-eslint/eslint-plugin": "^6.0.0",  "@types/cors": "^2.8.0",

  "@typescript-eslint/parser": "^6.0.0",  "@types/morgan": "^1.9.0",

  "prettier": "^3.0.0"  "@types/compression": "^1.7.0",

}  "ts-node-dev": "^2.0.0",

```  "nodemon": "^3.0.0",

  "jest": "^29.0.0",

---  "@types/jest": "^29.0.0",

  "supertest": "^6.3.0",

## 🗄️ Skema Database & ERD  "@types/supertest": "^2.0.0",

  "eslint": "^8.0.0",

### Diagram Relasi Entitas  "@typescript-eslint/eslint-plugin": "^6.0.0",

  "@typescript-eslint/parser": "^6.0.0",

```  "prettier": "^3.0.0"

┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐}

│      User       │       │     Thread      │       │      Post       │```

├─────────────────┤       ├─────────────────┤       ├─────────────────┤

│ id (PK)         │◄──────┤ userId (FK)     │◄──────┤ userId (FK)     │---

│ username        │       │ id (PK)         │       │ id (PK)         │

│ email           │       │ title           │       │ content         │## 🗄️ Database Schema & ERD

│ password        │       │ content         │       │ threadId (FK)   │

│ createdAt       │       │ createdAt       │       │ createdAt       │### Entity Relationship Diagram

│ updatedAt       │       │ updatedAt       │       │ updatedAt       │

└─────────────────┘       └─────────────────┘       └─────────────────┘```

        │                       │                       │┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐

        │                       │                       ││      User       │       │     Thread      │       │      Post       │

        └───────────────────────┼───────────────────────┘├─────────────────┤       ├─────────────────┤       ├─────────────────┤

                                ││ id (PK)         │◄──────┤ userId (FK)     │◄──────┤ userId (FK)     │

                                ▼│ username        │       │ id (PK)         │       │ id (PK)         │

                       ┌─────────────────┐│ email           │       │ title           │       │ content         │

                       │   _count        ││ password        │       │ content         │       │ threadId (FK)   │

                       ├─────────────────┤│ createdAt       │       │ createdAt       │       │ createdAt       │

                       │ posts: Int      ││ updatedAt       │       │ updatedAt       │       │ updatedAt       │

                       └─────────────────┘└─────────────────┘       └─────────────────┘       └─────────────────┘

```        │                       │                       │

        │                       │                       │

### Skema Prisma (`prisma/schema.prisma`)        └───────────────────────┼───────────────────────┘

                                │

```prisma                                ▼

generator client {                       ┌─────────────────┐

  provider = "prisma-client-js"                       │   _count        │

}                       ├─────────────────┤

                       │ posts: Int      │

datasource db {                       └─────────────────┘

  provider = "postgresql"```

  url      = env("DATABASE_URL")

}### Prisma Schema (`prisma/schema.prisma`)



model User {```prisma

  id        String   @id @default(cuid())generator client {

  username  String   @unique  provider = "prisma-client-js"

  email     String   @unique}

  password  String

  createdAt DateTime @default(now())datasource db {

  updatedAt DateTime @updatedAt  provider = "postgresql"

  url      = env("DATABASE_URL")

  threads Thread[]}

  posts   Post[]

model User {

  @@map("users")  id        String   @id @default(cuid())

}  username  String   @unique

  email     String   @unique

model Thread {  password  String

  id        String   @id @default(cuid())  createdAt DateTime @default(now())

  title     String  updatedAt DateTime @updatedAt

  content   String

  userId    String  threads Thread[]

  createdAt DateTime @default(now())  posts   Post[]

  updatedAt DateTime @updatedAt

  @@map("users")

  user  User     @relation(fields: [userId], references: [id], onDelete: Cascade)}

  posts Post[]

model Thread {

  @@map("threads")  id        String   @id @default(cuid())

}  title     String

  content   String

model Post {  userId    String

  id        String   @id @default(cuid())  createdAt DateTime @default(now())

  content   String  updatedAt DateTime @updatedAt

  threadId  String

  userId    String  user  User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())  posts Post[]

  updatedAt DateTime @updatedAt

  @@map("threads")

  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)}

  thread Thread @relation(fields: [threadId], references: [id], onDelete: Cascade)

model Post {

  @@map("posts")  id        String   @id @default(cuid())

}  content   String

```  threadId  String

  userId    String

### Relasi Database  createdAt DateTime @default(now())

- **User → Thread**: One-to-Many (1 user dapat membuat banyak thread)  updatedAt DateTime @updatedAt

- **User → Post**: One-to-Many (1 user dapat membuat banyak post)

- **Thread → Post**: One-to-Many (1 thread dapat memiliki banyak post)  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)

- **Thread → User**: Many-to-One (banyak thread dimiliki oleh 1 user)  thread Thread @relation(fields: [threadId], references: [id], onDelete: Cascade)

- **Post → User**: Many-to-One (banyak post dimiliki oleh 1 user)

- **Post → Thread**: Many-to-One (banyak post dimiliki oleh 1 thread)  @@map("posts")

}

---```



## 🔄 Diagram Alur Aplikasi### Database Relationships



### Alur Autentikasi Pengguna- **User → Thread**: One-to-Many (1 user can create many threads)

```- **User → Post**: One-to-Many (1 user can create many posts)

1. Registrasi/Login Pengguna- **Thread → Post**: One-to-Many (1 thread can have many posts)

       │- **Thread → User**: Many-to-One (many threads belong to 1 user)

       ▼- **Post → User**: Many-to-One (many posts belong to 1 user)

2. Validasi Input (Frontend)- **Post → Thread**: Many-to-One (many posts belong to 1 thread)

       │

       ▼---

3. Kirim ke API Backend

       │## 🔄 Application Flowchart

       ▼

4. Validasi & Hash Password### User Authentication Flow

       │

       ▼```

5. Generate Token JWT1. User Registration/Login

       │       │

       ▼       ▼

6. Simpan di HTTP-Only Cookie2. Validate Input (Frontend)

       │       │

       ▼       ▼

7. Redirect ke Dashboard3. Send to Backend API

```       │

       ▼

### Alur Pembuatan Thread4. Validate & Hash Password

```       │

1. User Klik "Buat Thread"       ▼

       │5. Generate JWT Token

       ▼       │

2. Buka Modal Formulir       ▼

       │6. Store in HTTP-Only Cookie

       ▼       │

3. User Isi Formulir       ▼

       │7. Redirect to Dashboard

       ▼```

4. Validasi Frontend (Zod)

       │### Thread Creation Flow

       ▼

5. Submit ke API```

       │1. User Clicks "Create Thread"

       ▼       │

6. Validasi Backend (Joi)       ▼

       │2. Open Modal Form

       ▼       │

7. Simpan ke Database       ▼

       │3. User Fills Form

       ▼       │

8. Return Data Thread       ▼

       │4. Frontend Validation (Zod)

       ▼       │

9. Update UI (Optimis)       ▼

       │5. Submit to API

       ▼       │

10. Tutup Modal & Navigasi       ▼

```6. Backend Validation (Joi)

       │

### Alur Pengambilan Data       ▼

```7. Save to Database

Frontend Request ──► React Query ──► Axios Interceptor ──► Backend API       │

       ▲                   ▲                   ▲                   ▲       ▼

       │                   │                   │                   │8. Return Thread Data

       └─ Cache Hit ───────┼───────────────────┼───────────────────┘       │

                           │                   │       ▼

                           └─ HTTP Request ────┼─────────────────────►9. Update UI (Optimistic)

                                               │       │

                                               └─ Token JWT ─────────►       ▼

```10. Close Modal & Navigate

````

---

### Data Fetching Flow

## 📋 Prasyarat

````

Sebelum menjalankan aplikasi ini, pastikan Anda memiliki:Frontend Request ──► React Query ──► Axios Interceptor ──► Backend API

       ▲                   ▲                   ▲                   ▲

### Persyaratan Sistem       │                   │                   │                   │

- **Sistem Operasi**: Windows 10/11, macOS 12+, Ubuntu 20.04+       └─ Cache Hit ───────┼───────────────────┼───────────────────┘

- **Memori**: Minimum 4GB RAM, Direkomendasikan 8GB+                           │                   │

- **Penyimpanan**: 2GB ruang kosong                           └─ HTTP Request ────┼─────────────────────►

- **Jaringan**: Koneksi internet yang stabil                                               │

                                               └─ JWT Token ─────────►

### Persyaratan Software```

- **Node.js**: v18.17.0 atau lebih tinggi

- **npm**: v9.0.0 atau lebih tinggi (sudah termasuk dengan Node.js)---

- **PostgreSQL**: v14.0 atau lebih tinggi

- **Git**: v2.30.0 atau lebih tinggi## 📋 Prerequisites

- **Editor Kode**: VS Code, WebStorm, atau yang serupa

Before running this application, ensure you have:

### Tools Opsional

- **Docker**: Untuk deployment terkontainerisasi### System Requirements

- **Postman/Thunder Client**: Untuk testing API

- **pgAdmin/DBeaver**: Untuk manajemen database- **Operating System**: Windows 10/11, macOS 12+, Ubuntu 20.04+

- **Redis**: Untuk caching (produksi)- **Memory**: Minimum 4GB RAM, Recommended 8GB+

- **Storage**: 2GB free space

---- **Network**: Stable internet connection



## 🚀 Instalasi & Setup### Software Requirements



### Langkah 1: Clone Repository- **Node.js**: v18.17.0 or higher

- **npm**: v9.0.0 or higher (comes with Node.js)

```bash- **PostgreSQL**: v14.0 or higher

# Clone repository- **Git**: v2.30.0 or higher

git clone <repository-url>- **Code Editor**: VS Code, WebStorm, or similar

cd nextjs-forum-fullstack

### Optional Tools

# Verifikasi struktur

ls -la- **Docker**: For containerized deployment

# Harus menampilkan: backend-forum/ dan frontend-forum/- **Postman/Thunder Client**: For API testing

```- **pgAdmin/DBeaver**: For database management

- **Redis**: For caching (production)

### Langkah 2: Setup Backend

---

```bash

# Navigasi ke direktori backend## 🚀 Installation & Setup

cd backend-forum

### Step 1: Clone Repository

# Install dependensi

npm install```bash

# Clone the repository

# Copy file environmentgit clone <repository-url>

cp .env.example .envcd nextjs-forum-fullstack



# Edit file .env dengan konfigurasi Anda# Verify structure

nano .env  # atau gunakan editor pilihan Andals -la

```# Should see: backend-forum/ and frontend-forum/

````

### Langkah 3: Setup Database

### Step 2: Backend Setup

```````bash

# Pastikan PostgreSQL berjalan```bash

sudo systemctl start postgresql  # Linux# Navigate to backend directory

# ataucd backend-forum

brew services start postgresql   # macOS

# Install dependencies

# Buat databasenpm install

createdb forum_db

# Copy environment file

# Generate Prisma clientcp .env.example .env

npx prisma generate

# Edit .env file with your configuration

# Jalankan migrasinano .env  # or use your preferred editor

npx prisma migrate dev```



# (Opsional) Seed database### Step 3: Database Setup

npx prisma db seed

``````bash

# Ensure PostgreSQL is running

### Langkah 4: Setup Frontendsudo systemctl start postgresql  # Linux

# or

```bashbrew services start postgresql   # macOS

# Navigasi ke direktori frontend

cd ../frontend-forum# Create database

createdb forum_db

# Install dependensi

npm install# Generate Prisma client

npx prisma generate

# Copy file environment

cp .env.example .env.local# Run migrations

npx prisma migrate dev

# Edit variabel environment

nano .env.local  # atau gunakan editor pilihan Anda# (Optional) Seed database

```npx prisma db seed

```````

### Langkah 5: Konfigurasi Variabel Environment

### Step 4: Frontend Setup

#### Backend (.env)

`env`bash

# Konfigurasi Server# Navigate to frontend directory

PORT=5000cd ../frontend-forum

NODE_ENV=development

# Install dependencies

# Databasenpm install

DATABASE_URL="postgresql://username:password@localhost:5432/forum_db?schema=public"

# Copy environment file

# Konfigurasi JWTcp .env.example .env.local

JWT_SECRET=kunci-jwt-super-rahasia-Anda-di-sini-buat-panjang-dan-aman

JWT_EXPIRES_IN=7d# Edit environment variables

nano .env.local # or use your preferred editor

# Konfigurasi CORS```

FRONTEND_URL=http://localhost:3000

### Step 5: Configure Environment Variables

# Redis (Opsional - untuk caching)

REDIS_URL=redis://localhost:6379#### Backend (.env)

# Konfigurasi Email (Opsional)```env

SMTP_HOST=smtp.gmail.com# Server Configuration

SMTP_PORT=587PORT=5000

SMTP_USER=email-Anda@gmail.comNODE_ENV=development

SMTP_PASS=password-app-Anda

````# Database

DATABASE_URL="postgresql://username:password@localhost:5432/forum_db?schema=public"

#### Frontend (.env.local)

```env# JWT Configuration

# Konfigurasi NextAuthJWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure

NEXTAUTH_URL=http://localhost:3000JWT_EXPIRES_IN=7d

NEXTAUTH_SECRET=kunci-secret-nextauth-Anda-di-sini

# CORS Configuration

# API BackendFRONTEND_URL=http://localhost:3000

NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Redis (Optional - for caching)

# Provider NextAuth (Opsional)REDIS_URL=redis://localhost:6379

GOOGLE_CLIENT_ID=id-client-google-Anda

GOOGLE_CLIENT_SECRET=secret-client-google-Anda# Email Configuration (Optional)

SMTP_HOST=smtp.gmail.com

# Analytics (Opsional)SMTP_PORT=587

NEXT_PUBLIC_GA_ID=id-google-analytics-AndaSMTP_USER=your-email@gmail.com

```SMTP_PASS=your-app-password

````

---

#### Frontend (.env.local)

## 🔧 Konfigurasi

````env

### Konfigurasi Database# NextAuth Configuration

NEXTAUTH_URL=http://localhost:3000

#### Setup PostgreSQLNEXTAUTH_SECRET=your-nextauth-secret-key-here

```bash

# Buat user dan database# Backend API

sudo -u postgres psqlNEXT_PUBLIC_API_URL=http://localhost:5000/api



# Di shell PostgreSQL:# NextAuth Providers (Optional)

CREATE USER forum_user WITH PASSWORD 'password_aman';GOOGLE_CLIENT_ID=your-google-client-id

CREATE DATABASE forum_db OWNER forum_user;GOOGLE_CLIENT_SECRET=your-google-client-secret

GRANT ALL PRIVILEGES ON DATABASE forum_db TO forum_user;

\q# Analytics (Optional)

```NEXT_PUBLIC_GA_ID=your-google-analytics-id

````

#### Konfigurasi Prisma

````prisma---

// prisma/schema.prisma

datasource db {## 🔧 Configuration

  provider = "postgresql"

  url      = env("DATABASE_URL")### Database Configuration

}

```#### PostgreSQL Setup



### Konfigurasi Autentikasi```bash

# Create user and database

#### Pembuatan Secret JWTsudo -u postgres psql

```bash

# Generate secret JWT yang aman# In PostgreSQL shell:

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"CREATE USER forum_user WITH PASSWORD 'secure_password';

```CREATE DATABASE forum_db OWNER forum_user;

GRANT ALL PRIVILEGES ON DATABASE forum_db TO forum_user;

#### Konfigurasi NextAuth\q

```typescript```

// frontend-forum/lib/auth.ts

export const authOptions: NextAuthOptions = {#### Prisma Configuration

  providers: [

    CredentialsProvider({```prisma

      name: "credentials",// prisma/schema.prisma

      credentials: {datasource db {

        email: { label: "Email", type: "email" },  provider = "postgresql"

        password: { label: "Password", type: "password" }  url      = env("DATABASE_URL")

      },}

      async authorize(credentials) {```

        // Logic autentikasi

      }### Authentication Configuration

    })

  ],#### JWT Secret Generation

  session: {

    strategy: "jwt"```bash

  }# Generate secure JWT secret

}node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

````

### Konfigurasi API#### NextAuth Configuration

#### Setup Axios Client```typescript

````typescript// frontend-forum/lib/auth.ts

// frontend-forum/lib/apiClient.tsexport const authOptions: NextAuthOptions = {

import axios from 'axios';  providers: [

    CredentialsProvider({

const apiClient = axios.create({      name: "credentials",

  baseURL: process.env.NEXT_PUBLIC_API_URL,      credentials: {

  headers: {        email: { label: "Email", type: "email" },

    'Content-Type': 'application/json',        password: { label: "Password", type: "password" },

  },      },

});      async authorize(credentials) {

        // Authentication logic

// Request interceptor untuk JWT      },

apiClient.interceptors.request.use(async (config) => {    }),

  const session = await getSession();  ],

  if (session?.backendToken) {  session: {

    config.headers.Authorization = `Bearer ${session.backendToken}`;    strategy: "jwt",

  }  },

  return config;};

});```

````

### API Configuration

---

#### Axios Client Setup

## 🏃‍♂️ Menjalankan Aplikasi

````typescript

### Mode Development// frontend-forum/lib/apiClient.ts

import axios from "axios";

#### Jalankan Backend

```bashconst apiClient = axios.create({

cd backend-forum  baseURL: process.env.NEXT_PUBLIC_API_URL,

npm run dev  headers: {

# Server akan berjalan di http://localhost:5000    "Content-Type": "application/json",

```  },

});

#### Jalankan Frontend

```bash// Request interceptor for JWT

cd frontend-forumapiClient.interceptors.request.use(async (config) => {

npm run dev  const session = await getSession();

# Aplikasi akan berjalan di http://localhost:3000  if (session?.backendToken) {

```    config.headers.Authorization = `Bearer ${session.backendToken}`;

  }

### Mode Production  return config;

});

#### Backend Production```

```bash

cd backend-forum---

npm run build

npm run start## 🏃‍♂️ Running the Application

````

### Development Mode

#### Frontend Production

````bash#### Start Backend

cd frontend-forum

npm run build```bash

npm run startcd backend-forum

```npm run dev

# Server will start on http://localhost:5000

### Menggunakan Docker```



#### Setup Docker Compose#### Start Frontend

```yaml

# docker-compose.yml```bash

version: '3.8'cd frontend-forum

services:npm run dev

  postgres:# Application will start on http://localhost:3000

    image: postgres:15```

    environment:

      POSTGRES_DB: forum_db### Production Mode

      POSTGRES_USER: forum_user

      POSTGRES_PASSWORD: password_aman#### Backend Production

    ports:

      - "5432:5432"```bash

cd backend-forum

  backend:npm run build

    build: ./backend-forumnpm run start

    ports:```

      - "5000:5000"

    depends_on:#### Frontend Production

      - postgres

```bash

  frontend:cd frontend-forum

    build: ./frontend-forumnpm run build

    ports:npm run start

      - "3000:3000"```

    depends_on:

      - backend### Using Docker

````

#### Docker Compose Setup

````bash

docker-compose up -d```yaml

```# docker-compose.yml

version: "3.8"

---services:

  postgres:

## 📡 Dokumentasi API    image: postgres:15

    environment:

### Endpoint Autentikasi      POSTGRES_DB: forum_db

      POSTGRES_USER: forum_user

#### Registrasi Pengguna      POSTGRES_PASSWORD: secure_password

```http    ports:

POST /api/auth/register      - "5432:5432"

Content-Type: application/json

  backend:

{    build: ./backend-forum

  "username": "johndoe",    ports:

  "email": "john@example.com",      - "5000:5000"

  "password": "password123aman"    depends_on:

}      - postgres

````

frontend:

#### Login Pengguna build: ./frontend-forum

````http ports:

POST /api/auth/login      - "3000:3000"

Content-Type: application/json    depends_on:

      - backend

{```

  "email": "john@example.com",

  "password": "password123aman"```bash

}docker-compose up -d

````

#### Dapatkan Pengguna Saat Ini---

````http

GET /api/auth/me## 📡 API Documentation

Authorization: Bearer <jwt_token>

```### Authentication Endpoints



### Endpoint Thread#### Register User



#### Dapatkan Semua Thread```http

```httpPOST /api/auth/register

GET /api/threads?page=1&limit=10Content-Type: application/json

Authorization: Bearer <jwt_token>

```{

  "username": "johndoe",

#### Buat Thread  "email": "john@example.com",

```http  "password": "securepassword123"

POST /api/threads}

Authorization: Bearer <jwt_token>```

Content-Type: application/json

#### Login User

{

  "title": "Judul Diskusi",```http

  "content": "Konten diskusi di sini..."POST /api/auth/login

}Content-Type: application/json

````

{

#### Dapatkan Thread berdasarkan ID "email": "john@example.com",

````http "password": "securepassword123"

GET /api/threads/:id}

Authorization: Bearer <jwt_token>```

````

#### Get Current User

#### Update Thread

`http`http

PUT /api/threads/:idGET /api/auth/me

Authorization: Bearer <jwt_token>Authorization: Bearer <jwt_token>

Content-Type: application/json```

{### Thread Endpoints

"title": "Judul Terbaru",

"content": "Konten terbaru..."#### Get All Threads

}

````http

GET /api/threads?page=1&limit=10

#### Hapus ThreadAuthorization: Bearer <jwt_token>

```http```

DELETE /api/threads/:id

Authorization: Bearer <jwt_token>#### Create Thread

```

```http

### Endpoint PostPOST /api/threads

Authorization: Bearer <jwt_token>

#### Dapatkan Post untuk ThreadContent-Type: application/json

```http

GET /api/threads/:threadId/posts?page=1&limit=10{

Authorization: Bearer <jwt_token>  "title": "Discussion Title",

```  "content": "Discussion content here..."

}

#### Buat Post```

```http

POST /api/threads/:threadId/posts#### Get Thread by ID

Authorization: Bearer <jwt_token>

Content-Type: application/json```http

GET /api/threads/:id

{Authorization: Bearer <jwt_token>

  "content": "Konten balasan di sini..."```

}

```#### Update Thread



#### Update Post```http

```httpPUT /api/threads/:id

PUT /api/posts/:idAuthorization: Bearer <jwt_token>

Authorization: Bearer <jwt_token>Content-Type: application/json

Content-Type: application/json

{

{  "title": "Updated Title",

  "content": "Konten balasan terbaru..."  "content": "Updated content..."

}}

````

#### Hapus Post#### Delete Thread

````http

DELETE /api/posts/:id```http

Authorization: Bearer <jwt_token>DELETE /api/threads/:id

```Authorization: Bearer <jwt_token>

````

---

### Post Endpoints

## 🧪 Testing

#### Get Posts for Thread

### Testing Backend

````http

```bashGET /api/threads/:threadId/posts?page=1&limit=10

cd backend-forumAuthorization: Bearer <jwt_token>

````

# Jalankan semua test

npm test#### Create Post

# Jalankan test dengan coverage```http

npm run test:covPOST /api/threads/:threadId/posts

Authorization: Bearer <jwt_token>

# Jalankan file test spesifikContent-Type: application/json

npm test -- authController.test.ts

{

# Jalankan test dalam mode watch "content": "Reply content here..."

npm run test:watch}

`````



### Testing Frontend#### Update Post



```bash```http

cd frontend-forumPUT /api/posts/:id

Authorization: Bearer <jwt_token>

# Jalankan semua testContent-Type: application/json

npm test

{

# Jalankan test dengan coverage  "content": "Updated reply content..."

npm run test:cov}

```

# Jalankan e2e test (jika diimplementasikan)

npm run test:e2e#### Delete Post

```

```http

### Testing API dengan Thunder ClientDELETE /api/posts/:id

Authorization: Bearer <jwt_token>

Import file collection: `backend-forum/thunder-collection.json````



### Checklist Testing Manual---



- [ ] Registrasi dan login pengguna## 🧪 Testing

- [ ] Persistensi token JWT

- [ ] Pembuatan dan tampilan thread### Backend Testing

- [ ] Pembuatan dan threading post

- [ ] Permission edit/hapus```bash

- [ ] Desain responsif di mobilecd backend-forum

- [ ] Penanganan error dan validasi

- [ ] Fungsi pencarian dan pagination# Run all tests

npm test

---

# Run tests with coverage

## 🚀 Deploymentnpm run test:cov



### Deployment Frontend (Vercel)# Run specific test file

npm test -- authController.test.ts

1. **Connect Repository**

   ```bash# Run tests in watch mode

   # Push kode ke GitHubnpm run test:watch

   git add .```

   git commit -m "Siap untuk deployment"

   git push origin main### Frontend Testing

   ```

```bash

2. **Deploy di Vercel**cd frontend-forum

   - Kunjungi [vercel.com](https://vercel.com)

   - Import repository GitHub Anda# Run all tests

   - Konfigurasi variabel environmentnpm test

   - Deploy

# Run tests with coverage

3. **Variabel Environment di Vercel**npm run test:cov

   ```

   NEXTAUTH_URL=https://app-Anda.vercel.app# Run e2e tests (if implemented)

   NEXTAUTH_SECRET=secret-Andanpm run test:e2e

   NEXT_PUBLIC_API_URL=https://api-backend-Anda.com/api```

   ```

### API Testing with Thunder Client

### Deployment Backend (Railway)

Import the collection file: `backend-forum/thunder-collection.json`

1. **Connect Repository**

   ```bash### Manual Testing Checklist

   # Pastikan semua kode sudah di-push

   git push origin main- [ ] User registration and login

   ```- [ ] JWT token persistence

- [ ] Thread creation and display

2. **Deploy di Railway**- [ ] Post creation and threading

   - Kunjungi [railway.app](https://railway.app)- [ ] Edit/delete permissions

   - Buat project baru- [ ] Responsive design on mobile

   - Connect repository GitHub- [ ] Error handling and validation

   - Tambahkan database PostgreSQL- [ ] Search and filtering

   - Konfigurasi variabel environment- [ ] Pagination functionality



3. **Variabel Environment di Railway**---

   ```

   DATABASE_URL=postgresql://...## 🚀 Deployment

   JWT_SECRET=secret-Anda

   FRONTEND_URL=https://frontend-Anda.vercel.app### Frontend Deployment (Vercel)

   ```

1. **Connect Repository**

### Deployment Docker

   ```bash

```dockerfile   # Push code to GitHub

# Dockerfile untuk backend   git add .

FROM node:18-alpine   git commit -m "Ready for deployment"

WORKDIR /app   git push origin main

COPY package*.json ./   ```

RUN npm ci --only=production

COPY . .2. **Deploy on Vercel**

RUN npm run build

EXPOSE 5000   - Go to [vercel.com](https://vercel.com)

CMD ["npm", "start"]   - Import your GitHub repository

```   - Configure environment variables

   - Deploy

```bash

# Build dan jalankan3. **Environment Variables on Vercel**

docker build -t forum-backend .   ```

docker run -p 5000:5000 forum-backend   NEXTAUTH_URL=https://your-app.vercel.app

```   NEXTAUTH_SECRET=your-secret

   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api

---   ```



## 📁 Struktur Proyek### Backend Deployment (Railway)



```1. **Connect Repository**

forum-fullstack/

├── frontend-forum/                 # Frontend Next.js   ```bash

│   ├── app/                        # Next.js App Router   # Ensure all code is pushed

│   │   ├── (auth)/                 # Halaman autentikasi   git push origin main

│   │   │   ├── login/   ```

│   │   │   └── register/

│   │   ├── threads/                # Halaman thread2. **Deploy on Railway**

│   │   │   ├── page.tsx           # Daftar threads

│   │   │   └── [id]/              # Detail thread   - Go to [railway.app](https://railway.app)

│   │   ├── globals.css            # Global styles   - Create new project

│   │   ├── layout.tsx             # Root layout   - Connect GitHub repository

│   │   └── page.tsx               # Halaman home   - Add PostgreSQL database

│   ├── components/                 # Komponen reusable   - Configure environment variables

│   │   ├── ui/                    # Komponen shadcn/ui

│   │   └── thread/                # Komponen thread3. **Environment Variables on Railway**

│   ├── hooks/                     # Custom hooks   ```

│   │   ├── useAuth.ts            # Auth hooks   DATABASE_URL=postgresql://...

│   │   ├── useThreads.ts         # Thread hooks   JWT_SECRET=your-secret

│   │   └── usePosts.ts           # Post hooks   FRONTEND_URL=https://your-frontend.vercel.app

│   ├── lib/                       # Utilities   ```

│   │   ├── apiClient.ts          # Axios client

│   │   ├── api/                  # Fungsi API### Docker Deployment

│   │   └── validations/          # Schema Zod

│   ├── types/                     # Type TypeScript```dockerfile

│   ├── middleware.ts              # Middleware Next.js# Dockerfile for backend

│   ├── tailwind.config.ts        # Konfigurasi TailwindFROM node:18-alpine

│   ├── next.config.ts            # Konfigurasi Next.jsWORKDIR /app

│   └── package.jsonCOPY package*.json ./

│RUN npm ci --only=production

├── backend-forum/                  # Backend Express.jsCOPY . .

│   ├── src/RUN npm run build

│   │   ├── controllers/           # Controller routeEXPOSE 5000

│   │   │   ├── authController.tsCMD ["npm", "start"]

│   │   │   ├── threadController.ts```

│   │   │   └── postController.ts

│   │   ├── middleware/            # Custom middleware```bash

│   │   │   ├── auth.ts           # Auth JWT# Build and run

│   │   │   ├── validation.ts     # Validasi inputdocker build -t forum-backend .

│   │   │   └── errorHandler.ts   # Penanganan errordocker run -p 5000:5000 forum-backend

│   │   ├── routes/               # Route API```

│   │   │   ├── auth.ts

│   │   │   ├── threads.ts---

│   │   │   └── posts.ts

│   │   ├── services/             # Logic bisnis## 📁 Project Structure

│   │   ├── utils/                # Utilities

│   │   ├── validations/          # Schema Joi```

│   │   └── app.ts                # Express appforum-fullstack/

│   ├── prisma/├── frontend-forum/                 # Next.js Frontend

│   │   ├── schema.prisma        # Skema database│   ├── app/                        # Next.js App Router

│   │   └── migrations/          # Migrasi DB│   │   ├── (auth)/                 # Authentication pages

│   ├── tests/                    # File test│   │   │   ├── login/

│   ├── .env.example             # Template env│   │   │   └── register/

│   ├── package.json│   │   ├── threads/                # Thread pages

│   └── tsconfig.json│   │   │   ├── page.tsx           # Threads list

││   │   │   └── [id]/              # Thread detail

├── docker-compose.yml            # Setup Docker│   │   ├── globals.css            # Global styles

├── README.md                     # File ini│   │   ├── layout.tsx             # Root layout

└── .gitignore│   │   └── page.tsx               # Home page

```│   ├── components/                 # Reusable components

│   │   ├── ui/                    # shadcn/ui components

---│   │   └── thread/                # Thread components

│   ├── hooks/                     # Custom hooks

## 🔒 Keamanan│   │   ├── useAuth.ts            # Auth hooks

│   │   ├── useThreads.ts         # Thread hooks

### Autentikasi & Authorization│   │   └── usePosts.ts           # Post hooks

- **Token JWT**: Autentikasi berbasis token yang aman│   ├── lib/                       # Utilities

- **Hashing Password**: bcrypt dengan salt rounds│   │   ├── apiClient.ts          # Axios client

- **Manajemen Session**: Cookie HTTP-only untuk token│   │   ├── api/                  # API functions

- **Proteksi Route**: Middleware berbasis authorization│   │   └── validations/          # Zod schemas

- **CORS**: Dikonfigurasi untuk domain frontend saja│   ├── types/                     # TypeScript types

│   ├── middleware.ts              # Next.js middleware

### Perlindungan Data│   ├── tailwind.config.ts        # Tailwind config

- **Validasi Input**: Schema Joi untuk semua input│   ├── next.config.ts            # Next.js config

- **Pencegahan SQL Injection**: Proteksi ORM Prisma│   └── package.json

- **Proteksi XSS**: Sanitasi input│

- **Rate Limiting**: Pencegahan penyalahgunaan API├── backend-forum/                  # Express.js Backend

- **Helmet**: Header keamanan│   ├── src/

│   │   ├── controllers/           # Route controllers

### Praktik Terbaik│   │   │   ├── authController.ts

- **Variabel Environment**: Data sensitif dalam file env│   │   │   ├── threadController.ts

- **Penanganan Error**: Tidak ada data sensitif dalam response error│   │   │   └── postController.ts

- **Logging**: Logging terstruktur tanpa data sensitif│   │   ├── middleware/            # Custom middleware

- **HTTPS**: Enkripsi SSL/TLS di production│   │   │   ├── auth.ts           # JWT auth

- **Update Reguler**: Jaga dependensi tetap terupdate│   │   │   ├── validation.ts     # Input validation

│   │   │   └── errorHandler.ts   # Error handling

---│   │   ├── routes/               # API routes

│   │   │   ├── auth.ts

## ⚡ Performa│   │   │   ├── threads.ts

│   │   │   └── posts.ts

### Optimisasi Frontend│   │   ├── services/             # Business logic

- **Server-Side Rendering**: SSR Next.js untuk SEO│   │   ├── utils/                # Utilities

- **Code Splitting**: Splitting otomatis berbasis route│   │   ├── validations/          # Joi schemas

- **Optimisasi Gambar**: Komponen Image Next.js│   │   └── app.ts                # Express app

- **Caching**: Caching cerdas React Query│   ├── prisma/

- **Bundle Analysis**: Analyzer webpack bundle│   │   ├── schema.prisma        # Database schema

│   │   └── migrations/          # DB migrations

### Optimisasi Backend│   ├── tests/                    # Test files

- **Indexing Database**: Query teroptimasi dengan Prisma│   ├── .env.example             # Env template

- **Connection Pooling**: Koneksi database yang efisien│   ├── package.json

- **Caching**: Redis untuk caching session dan data│   └── tsconfig.json

- **Kompresi**: Kompresi response gzip│

- **Rate Limiting**: Cegah penyalahgunaan API├── docker-compose.yml            # Docker setup

├── README.md                     # This file

### Optimisasi Database└── .gitignore

- **Indexing**: Index yang tepat untuk field yang sering dikueri```

- **Pagination**: Loading data yang efisien

- **Relasi**: Query database teroptimasi---

- **Migrasi**: Perubahan skema terkendali versi

## 🔒 Security

---

### Authentication & Authorization

## 🤝 Kontribusi

- **JWT Tokens**: Secure token-based authentication

### Alur Development- **Password Hashing**: bcrypt with salt rounds

- **Session Management**: HTTP-only cookies for tokens

1. **Fork Repository**- **Route Protection**: Middleware-based authorization

   ```bash- **CORS**: Configured for frontend domain only

   git clone https://github.com/username-Anda/forum-fullstack.git

   cd forum-fullstack### Data Protection

   git checkout -b fitur/fitur-baru

   ```- **Input Validation**: Joi schemas for all inputs

- **SQL Injection Prevention**: Prisma ORM protection

2. **Setup Environment Development**- **XSS Protection**: Input sanitization

   ```bash- **Rate Limiting**: API abuse prevention

   # Setup backend- **Helmet**: Security headers

   cd backend-forum

   npm install### Best Practices

   cp .env.example .env

   # Konfigurasi database dan environment- **Environment Variables**: Sensitive data in env files

- **Error Handling**: No sensitive data in error responses

   # Setup frontend- **Logging**: Structured logging without sensitive info

   cd ../frontend-forum- **HTTPS**: SSL/TLS encryption in production

   npm install- **Regular Updates**: Keep dependencies updated

   cp .env.example .env.local

   # Konfigurasi environment variables---

   ```

## ⚡ Performance

3. **Buat Perubahan**

   ```bash### Frontend Optimizations

   # Ikuti standar coding

   # Tulis test untuk fitur baru- **Server-Side Rendering**: Next.js SSR for SEO

   # Update dokumentasi- **Code Splitting**: Automatic route-based splitting

   ```- **Image Optimization**: Next.js Image component

- **Caching**: React Query intelligent caching

4. **Testing**- **Bundle Analysis**: Webpack bundle analyzer

   ```bash

   # Jalankan test backend### Backend Optimizations

   cd backend-forum && npm test

- **Database Indexing**: Optimized queries with Prisma

   # Jalankan test frontend- **Connection Pooling**: Efficient database connections

   cd ../frontend-forum && npm test- **Caching**: Redis for session and data caching

   ```- **Compression**: Gzip response compression

- **Rate Limiting**: Prevent API abuse

5. **Commit dan Push**

   ```bash### Database Optimizations

   git add .

   git commit -m "feat: tambah fitur baru"- **Indexing**: Proper indexes on frequently queried fields

   git push origin fitur/fitur-baru- **Pagination**: Efficient data loading

   ```- **Relations**: Optimized database queries

- **Migrations**: Version-controlled schema changes

6. **Buat Pull Request**

   - Kunjungi GitHub dan buat pull request---

   - Deskripsikan perubahan dan link issue terkait

   - Tunggu code review dan approval## 🤝 Contributing



### Standar Coding### Development Workflow



#### TypeScript1. **Fork the Repository**

- Gunakan konfigurasi TypeScript yang strict

- Definisikan interface yang tepat untuk semua struktur data   ```bash

- Gunakan union types untuk response API   git clone https://github.com/your-username/forum-fullstack.git

- Hindari penggunaan type `any`   cd forum-fullstack

   git checkout -b feature/new-feature

#### React/Next.js   ```

- Gunakan functional components dengan hooks

- Implementasikan error boundaries yang tepat2. **Setup Development Environment**

- Ikuti best practices Next.js

- Gunakan TypeScript untuk semua komponen   ```bash

   # Backend setup

#### Express.js   cd backend-forum

- Gunakan async/await untuk semua route   npm install

- Implementasikan middleware chain yang tepat   cp .env.example .env

- Validasi semua input dengan Joi   # Configure database and environment

- Return format response yang konsisten

   # Frontend setup

#### Database   cd ../frontend-forum

- Gunakan migrasi Prisma untuk perubahan skema   npm install

- Implementasikan relasi foreign key yang tepat   cp .env.example .env.local

- Tambahkan index untuk field yang sering dikueri   # Configure environment variables

- Gunakan transaksi untuk operasi kompleks   ```



### Konvensi Commit Message3. **Make Changes**



```   ```bash

feat: tambah autentikasi pengguna   # Follow coding standards

fix: perbaiki bug pembuatan thread   # Write tests for new features

docs: update dokumentasi API   # Update documentation

style: format kode dengan prettier   ```

refactor: sederhanakan service pengguna

test: tambah unit test untuk auth controller4. **Testing**

chore: update dependensi

```   ```bash

   # Run backend tests

---   cd backend-forum && npm test



## 📄 Lisensi   # Run frontend tests

   cd ../frontend-forum && npm test

Proyek ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail.   ```



### Ringkasan MIT License5. **Commit and Push**



**Izin:**   ```bash

- ✅ Penggunaan komersial   git add .

- ✅ Modifikasi   git commit -m "feat: add new feature"

- ✅ Distribusi   git push origin feature/new-feature

- ✅ Penggunaan pribadi   ```



**Keterbatasan:**6. **Create Pull Request**

- ❌ Tanggung jawab   - Go to GitHub and create a pull request

- ❌ Garansi   - Describe the changes and link related issues

   - Wait for code review and approval

**Kondisi:**

- 📝 Pemberitahuan lisensi dan hak cipta### Coding Standards



### Teks Lisensi Lengkap#### TypeScript



```- Use strict TypeScript configuration

MIT License- Define proper interfaces for all data structures

- Use union types for API responses

Hak Cipta (c) 2025 Aplikasi Forum Fullstack- Avoid `any` type usage



Izin ini diberikan secara gratis kepada siapa pun yang memperoleh salinan#### React/Next.js

perangkat lunak ini dan file dokumentasi terkait ("Perangkat Lunak"), untuk

berurusan dalam Perangkat Lunak tanpa batasan, termasuk tanpa batasan hak- Use functional components with hooks

untuk menggunakan, menyalin, memodifikasi, menggabungkan, menerbitkan,- Implement proper error boundaries

mendistribusikan, mensublisensikan, dan/atau menjual salinan Perangkat Lunak,- Follow Next.js best practices

dan untuk mengizinkan orang yang kepadanya Perangkat Lunak diberikan untuk- Use TypeScript for all components

melakukannya, dengan syarat-syarat berikut:

#### Express.js

Pemberitahuan hak cipta di atas dan pemberitahuan izin ini harus disertakan

dalam semua salinan atau bagian substansial dari Perangkat Lunak.- Use async/await for all routes

- Implement proper middleware chain

PERANGKAT LUNAK INI DISEDIAKAN "SEBAGAIMANA ADANYA", TANPA JAMINAN APA PUN,- Validate all inputs with Joi

BAIK TERSURAT MAUPUN TERSIRAT, TERMASUK NAMUN TIDAK TERBATAS PADA JAMINAN- Return consistent response formats

DAGANG, KESESUAIAN UNTUK TUJUAN TERTENTU DAN NONINFRINGEMENT. DALAM KEADAAN

APA PUN PENULIS ATAU PEMEGANG HAK CIPTA BERTANGGUNG JAWAB ATAS KLAIM,#### Database

KERUSAKAN ATAU TANGGUNG JAWAB LAINNYA, BAIK DALAM TINDAKAN KONTRAK, TORT

ATAU LAINNYA, YANG TIMBUL DARI, KELUAR DARI ATAU DALAM KONEKSI DENGAN- Use Prisma migrations for schema changes

PERANGKAT LUNAK ATAU PENGGUNAAN ATAU URUSAN LAIN DALAM PERANGKAT LUNAK.- Implement proper foreign key relationships

```- Add indexes for frequently queried fields

- Use transactions for complex operations

---

### Commit Message Convention

## 🙏 Ucapan Terima Kasih

```

### Teknologi Intifeat: add user authentication

- **[Next.js](https://nextjs.org/)** - Framework React untuk productionfix: resolve thread creation bug

- **[Express.js](https://expressjs.com/)** - Framework web yang cepat dan tidak beropinidocs: update API documentation

- **[PostgreSQL](https://postgresql.org/)** - Database relasional open source canggihstyle: format code with prettier

- **[Prisma](https://prisma.io/)** - ORM generasi berikutnya untuk TypeScript & Node.jsrefactor: simplify user service

- **[TypeScript](https://typescriptlang.org/)** - JavaScript dengan sintaks untuk typestest: add unit tests for auth controller

chore: update dependencies

### UI & Styling```

- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first

- **[shadcn/ui](https://ui.shadcn.com/)** - Komponen reusable yang dibangun di Radix UI---

- **[Radix UI](https://radix-ui.com/)** - Primitive UI low-level untuk React

- **[Lucide React](https://lucide.dev/)** - Toolkit ikon yang indah & konsisten## 📄 License



### State Management & Data FetchingThis project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

- **[TanStack Query](https://tanstack.com/query)** - Sinkronisasi data yang powerful untuk React

- **[React Hook Form](https://react-hook-form.com/)** - Formulir performant dengan validasi mudah### MIT License Summary

- **[Zod](https://zod.dev/)** - Schema validation TypeScript-first

- **[Axios](https://axios-http.com/)** - HTTP client berbasis Promise**Permissions:**



### Autentikasi & Keamanan- ✅ Commercial use

- **[NextAuth.js](https://next-auth.js.org/)** - Solusi autentikasi open source lengkap- ✅ Modification

- **[JWT](https://jwt.io/)** - JSON Web Tokens untuk autentikasi aman- ✅ Distribution

- **[bcrypt](https://bcryptjs.org/)** - Library hashing password- ✅ Private use

- **[Helmet](https://helmetjs.github.io/)** - Middleware keamanan untuk Express

**Limitations:**

### Development Tools

- **[ESLint](https://eslint.org/)** - Linter JavaScript yang dapat dicolokkan- ❌ Liability

- **[Prettier](https://prettier.io/)** - Pemformat kode yang beropini- ❌ Warranty

- **[Jest](https://jestjs.io/)** - Framework Testing JavaScript yang menyenangkan

- **[Docker](https://docker.com/)** - Platform kontainerisasi**Conditions:**



### Terima Kasih Khusus- 📝 License and copyright notice

- **Komunitas Open Source** - Untuk tools dan library yang luar biasa

- **Kontributor** - Untuk waktu dan usaha mereka### Full License Text

- **Beta Tester** - Untuk feedback berharga dan laporan bug

```

---MIT License



## 📞 Dukungan & KontakCopyright (c) 2025 Forum Fullstack Application



### Mendapatkan BantuanPermission is hereby granted, free of charge, to any person obtaining a copy

of this software and associated documentation files (the "Software"), to deal

Jika Anda membutuhkan bantuan dengan proyek ini:in the Software without restriction, including without limitation the rights

to use, copy, modify, merge, publish, distribute, sublicense, and/or sell

1. **Periksa Dokumentasi**copies of the Software, and to permit persons to whom the Software is

   - Baca README ini secara menyeluruhfurnished to do so, subject to the following conditions:

   - Periksa dokumentasi API di `/api/docs`

   - Tinjau komentar kodeThe above copyright notice and this permission notice shall be included in all

copies or substantial portions of the Software.

2. **Cari Issue**

   - Periksa issue GitHub yang adaTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR

   - Cari masalah serupaIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,

FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE

3. **Buat Issue**AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER

   - Gunakan issue GitHub untuk bugLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,

   - Gunakan diskusi untuk pertanyaanOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE

   - Berikan informasi detailSOFTWARE.

```

4. **Dukungan Komunitas**

   - Bergabung dengan server Discord kami---

   - Berpartisipasi dalam diskusi GitHub

## 🙏 Acknowledgments

### Informasi Kontak

### Core Technologies

- **Email**: support@forum-fullstack.com

- **GitHub**: [github.com/forum-fullstack](https://github.com/forum-fullstack)- **[Next.js](https://nextjs.org/)** - The React framework for production

- **Discord**: [discord.gg/forum-fullstack](https://discord.gg/forum-fullstack)- **[Express.js](https://expressjs.com/)** - Fast, unopinionated web framework

- **Twitter**: [@forum_fullstack](https://twitter.com/forum_fullstack)- **[PostgreSQL](https://postgresql.org/)** - Advanced open source relational database

- **[Prisma](https://prisma.io/)** - Next-generation ORM for TypeScript & Node.js

### Laporan Bug- **[TypeScript](https://typescriptlang.org/)** - JavaScript with syntax for types



Saat melaporkan bug, sertakan:### UI & Styling



- **Deskripsi**: Deskripsi jelas tentang masalah- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework

- **Langkah Reproduksi**: Instruksi langkah demi langkah- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built on Radix UI

- **Perilaku yang Diharapkan**: Apa yang seharusnya terjadi- **[Radix UI](https://radix-ui.com/)** - Low-level UI primitives for React

- **Perilaku Aktual**: Apa yang sebenarnya terjadi- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit

- **Environment**: OS, browser, versi Node.js

- **Screenshot**: Jika berlaku### State Management & Data Fetching

- **Log Error**: Error console, response API

- **[TanStack Query](https://tanstack.com/query)** - Powerful data synchronization for React

---- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation

- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

## 🎉 Kesimpulan- **[Axios](https://axios-http.com/)** - Promise based HTTP client



Terima kasih telah memilih Aplikasi Forum Fullstack kami! Proyek ini menunjukkan praktik development web modern dengan fokus pada:### Authentication & Security



- **Skalabilitas**: Dibangun untuk menangani pertumbuhan- **[NextAuth.js](https://next-auth.js.org/)** - Complete open source authentication solution

- **Maintainability**: Kode yang bersih dan terdokumentasi dengan baik- **[JWT](https://jwt.io/)** - JSON Web Tokens for secure authentication

- **Keamanan**: Praktik keamanan standar industri- **[bcrypt](https://bcryptjs.org/)** - Password hashing library

- **Performa**: Dioptimalkan untuk kecepatan dan efisiensi- **[Helmet](https://helmetjs.github.io/)** - Security middleware for Express

- **Developer Experience**: DX yang hebat dengan tools modern

### Development Tools

Kami harap aplikasi ini berfungsi sebagai fondasi yang solid untuk kebutuhan forum Anda dan menginspirasi proyek masa depan Anda.

- **[ESLint](https://eslint.org/)** - Pluggable JavaScript linter

**Selamat coding! 🚀✨**- **[Prettier](https://prettier.io/)** - Opinionated code formatter

- **[Jest](https://jestjs.io/)** - Delightful JavaScript Testing Framework

---- **[Docker](https://docker.com/)** - Containerization platform



*Dibuat pada tanggal: 25 Oktober 2025*### Special Thanks

*Versi: 1.0.0*

*Penulis: Tim Forum Fullstack*- **Open Source Community** - For amazing tools and libraries
- **Contributors** - For their time and effort
- **Beta Testers** - For valuable feedback and bug reports

---

## 📞 Support & Contact

### Getting Help

If you need help with this project:

1. **Check Documentation**

   - Read this README thoroughly
   - Check API documentation at `/api/docs`
   - Review code comments

2. **Search Issues**

   - Check existing GitHub issues
   - Search for similar problems

3. **Create Issue**

   - Use GitHub issues for bugs
   - Use discussions for questions
   - Provide detailed information

4. **Community Support**
   - Join our Discord server
   - Participate in GitHub discussions

### Contact Information

- **Email**: support@forum-fullstack.com
- **GitHub**: [github.com/forum-fullstack](https://github.com/forum-fullstack)
- **Discord**: [discord.gg/forum-fullstack](https://discord.gg/forum-fullstack)
- **Twitter**: [@forum_fullstack](https://twitter.com/forum_fullstack)

### Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the issue
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable
- **Error Logs**: Console errors, API responses

---

## 🎉 Conclusion

Thank you for choosing our Fullstack Forum Application! This project demonstrates modern web development practices with a focus on:

- **Scalability**: Built to handle growth
- **Maintainability**: Clean, well-documented code
- **Security**: Industry-standard security practices
- **Performance**: Optimized for speed and efficiency
- **Developer Experience**: Great DX with modern tools

We hope this application serves as a solid foundation for your forum needs and inspires your future projects.

**Happy coding! 🚀✨**

---

_Last updated: October 25, 2025_
_Version: 1.0.0_
_Author: Forum Fullstack Team_
`````
