export { supabase } from './client';

// Types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AppRole = 'admin' | 'moderator' | 'user'

export type HealthMode = 'normal_cycle' | 'fertility' | 'pregnant'

export type SubscriptionPlan = 'free' | 'bloom' | 'radiance'

export interface Profile {
  id: string
  email: string
  first_name: string | null
  last_name: string | null
  avatar_url: string | null
  health_mode: HealthMode | null
  subscription_plan: SubscriptionPlan
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export interface UserRole {
  id: string
  user_id: string
  role: AppRole
  created_at: string
}

export interface AppSetting {
  id: string
  key: string
  value: Json
  description: string | null
  updated_at: string
  updated_by: string | null
}

export interface MoodEntry {
  id: string
  user_id: string
  mood: string
  energy_level: number
  notes: string | null
  symptoms: string[] | null
  created_at: string
}

export interface CycleData {
  id: string
  user_id: string
  period_start: string | null
  period_end: string | null
  cycle_length: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  category: string
  duration_days: number
  difficulty: string
  image_url: string | null
  is_active: boolean
  created_at: string
  created_by: string | null
}

export interface UserChallenge {
  id: string
  user_id: string
  challenge_id: string
  started_at: string
  completed_at: string | null
  progress: number
  status: string
}

export interface Notification {
  id: string
  user_id: string | null
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
}

export interface Content {
  id: string
  type: string
  title: string
  body: string
  metadata: Json | null
  is_published: boolean
  created_at: string
  updated_at: string
  created_by: string | null
}
