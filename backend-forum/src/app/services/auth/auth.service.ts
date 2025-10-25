import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { LoginInput, RegisterInput } from '../../requests/auth/auth.schema.js';
import { createUser, findUserByEmail, findUserById } from '../../repository/auth/user.repository.js';
import { config } from '../../../config/config.js';


// Fungsi Service untuk Register
export const register = async (input: Omit<RegisterInput, 'passwordConfirmation'>) => {
  // 1. Cek apakah user sudah ada
  const existingUser = await findUserByEmail(input.email);
  if (existingUser) {
    throw new Error('Email sudah terdaftar');
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(input.password, 12);

  // 3. Simpan ke database via repository
  const newUser = await createUser({
    email: input.email,
    username: input.username,
    password: hashedPassword,
  });

  return newUser;
};

// Fungsi Service untuk Login
export const login = async (input: LoginInput) => {
  // 1. Cari user
  const user = await findUserByEmail(input.email);
  if (!user) {
    throw new Error('Email atau password salah');
  }

  // 2. Bandingkan password
  const isValidPassword = await bcrypt.compare(input.password, user.password);
  if (!isValidPassword) {
    throw new Error('Email atau password salah');
  }

  // 3. Buat JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, config.jwtSecret.secret, {
    expiresIn: '1d',
  });

  return token;
};

// Fungsi Service untuk Get Profile
export const getProfile = async (userId: string) => {
  const profile = await findUserById(userId);
  if (!profile) {
    throw new Error('User tidak ditemukan');
  }
  return profile;
};

//fungsi update profile


//fungsi melihat profile user lain tapi tidak bisa edit dan hapus 