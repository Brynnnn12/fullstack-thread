# Frontend Forum

A modern, responsive forum application built with Next.js 15, featuring real-time discussions, user authentication, and a beautiful UI.

## 🚀 Features

- **Modern UI/UX**: Beautiful design with Tailwind CSS and shadcn/ui components
- **User Authentication**: Secure login/register with NextAuth.js
- **Thread Management**: Create, read, update, and delete discussion threads
- **Post System**: Reply to threads with nested comments
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time Updates**: Optimistic updates with React Query
- **Type Safety**: Full TypeScript implementation
- **SEO Optimized**: Server-side rendering with Next.js

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: TanStack Query (React Query)
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend API

- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT + bcrypt
- **Validation**: Joi
- **CORS**: Enabled for cross-origin requests

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **PostgreSQL** database (for backend)
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd frontend-forum
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# NextAuth Providers (if using external providers)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Backend Setup

Make sure the backend API is running. See the backend README for setup instructions.

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
frontend-forum/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── threads/                  # Thread pages
│   │   ├── page.tsx             # Threads list
│   │   └── [id]/                # Thread detail
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   └── thread/                  # Thread-related components
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts              # Authentication hooks
│   ├── useThreads.ts           # Thread CRUD hooks
│   └── usePosts.ts             # Post CRUD hooks
├── lib/                         # Utility libraries
│   ├── apiClient.ts            # Axios interceptor
│   ├── api/                    # API functions
│   └── validations/            # Zod schemas
├── types/                       # TypeScript type definitions
├── middleware.ts                # Next.js middleware
└── tailwind.config.ts          # Tailwind configuration
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking

# Code Quality
npm run format       # Format code with Prettier
npm run test         # Run tests (if implemented)
```

## 🎨 UI Components

The application uses shadcn/ui components with custom styling:

- **Dialog/Modal**: For create/edit forms
- **Dropdown Menu**: For thread actions
- **Avatar**: User profile pictures
- **Badge**: Thread status indicators
- **Skeleton**: Loading states
- **Toast**: Success/error notifications

## 🔐 Authentication

### Features

- User registration and login
- Session management with NextAuth.js
- Protected routes with middleware
- Automatic token refresh

### Usage

```tsx
import { useSession } from "next-auth/react";

function MyComponent() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Please login</div>;

  return <div>Welcome {session.user.name}!</div>;
}
```

## 📡 API Integration

### React Query Hooks

```tsx
// Fetch threads
const { data: threads, isLoading } = useThreads();

// Create thread
const createThread = useCreateThread();
createThread.mutate({ title: "Hello", content: "World" });

// Update thread
const updateThread = useUpdateThread();
updateThread.mutate({ id: "123", data: { title: "Updated" } });
```

### Custom API Client

The app uses a custom Axios client with interceptors for authentication:

```typescript
import apiClient from "@/lib/apiClient";

// Automatic token attachment
const response = await apiClient.get("/threads");
```

## 🎯 Key Features Implementation

### Optimistic Updates

- Instant UI feedback for better UX
- Automatic rollback on errors
- Cache invalidation for consistency

### Error Handling

- Global error boundaries
- Toast notifications for user feedback
- Graceful fallbacks for failed requests

### Responsive Design

- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use meaningful commit messages
- Write descriptive component names
- Maintain consistent code style
- Add tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [TanStack Query](https://tanstack.com/query) - Data fetching library
- [NextAuth.js](https://next-auth.js.org/) - Authentication library

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Happy coding! 🚀**
