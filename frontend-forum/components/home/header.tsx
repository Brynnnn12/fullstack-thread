"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Threads Forum
        </Link>

        <nav className="flex items-center space-x-4">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : session ? (
            <>
              <Link href="/threads">
                <Button variant="ghost">Threads</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button variant="outline" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/threads">
                <Button variant="ghost">Threads</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
