import { supabase } from './supabase';

// SIGN UP + CREATE PROFILE ROW
export async function signUp(email, password) {
  // 1. Create auth user
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;
  if (!user) return data; // email confirmation required

  // 2. Create profile row in public.users
  const { error: profileError } = await supabase.from('users').insert({
    id: user.id,
    name: '',
    phone: '',
    socials: {},
    is_demander: false
  });

  if (profileError) throw profileError;

  return data;
}

// LOGIN
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// LOGOUT
export async function signOut() {
  await supabase.auth.signOut();
}

// GET CURRENT USER
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
