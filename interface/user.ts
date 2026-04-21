export interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  country_code: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfileData {
  id: string;
  updated_at: string | null;
  created_at: string | null;
  name: string | null;
  email: string | null;
  avatar_url: string | null;
  phone?: string | null;
  country_code?: string | null;
}