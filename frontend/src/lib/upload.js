import { supabase } from "./supabase";

export async function uploadImage(file, userId) {
  if (!file) return null;

  const ext = file.name.split(".").pop();
  const fileName = `${userId}-${Date.now()}.${ext}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from("media")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
