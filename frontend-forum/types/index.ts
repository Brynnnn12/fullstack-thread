// Types for API responses
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export interface Thread {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
  _count?: {
    posts: number;
  };
}

export interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  threadId: string;
  userId: string;
  user: User;
  _count?: {
    likes: number;
  };
}

export interface ThreadWithPosts extends Thread {
  posts: Post[];
}

// UI-specific types for the thread view
export interface ThreadPost {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  isMain?: boolean;
  likes?: number;
  replies?: number;
}