import { supabase } from './supabase.js';

// Sign up & Create Profile: 
export async function signUp(email, password, name, phone) {
  // Create auth user
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;

  const user = data.user;
  if (!user) return data; 

  // Create profile row in public.users
  const { error: profileError } = await supabase.from('Users').insert({
    id: user.id,
    email: email || '',
    name: name ||  '',
    phone: phone || '',
    socials: {},
    is_demander: false
  });

  if (profileError) throw profileError;

  return data;
}

// Login: 
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

// Logout: 
export async function signOut() {
  await supabase.auth.signOut();
}

// Get Current User: 
export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

// Get DB profile
export async function getUserProfile(id) {
  const { data, error } = await supabase
    .from('Users')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;

  return data;
}
