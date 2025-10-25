import { useMutation } from "@tanstack/react-query";
import { signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Login Hook
export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      toast.success("Login berhasil!");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message || "Login gagal");
    },
  });
}

// Register Hook
export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: { username: string; email: string; password: string }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Registrasi gagal");
    },
  });
}

// Logout Hook
export function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
    },
    onSuccess: () => {
      toast.success("Logout berhasil!");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error("Logout gagal");
    },
  });
}

// Get Current Session Hook
export function useCurrentSession() {
  return useMutation({
    mutationFn: () => getSession(),
  });
}