import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Profile, MoodEntry, CycleData, Challenge, UserChallenge, Notification, AppSetting } from '@/integrations/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Profile hooks
export function useProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!user,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (updates: Partial<Profile>) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update profile: ' + error.message);
    },
  });
}

// Mood entries hooks
export function useMoodEntries() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['mood-entries', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as MoodEntry[];
    },
    enabled: !!user,
  });
}

export function useCreateMoodEntry() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (entry: Omit<MoodEntry, 'id' | 'user_id' | 'created_at'>) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('mood_entries')
        .insert({ ...entry, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mood-entries'] });
      toast.success('Mood check-in saved!');
    },
    onError: (error: Error) => {
      toast.error('Failed to save mood: ' + error.message);
    },
  });
}

// Cycle data hooks
export function useCycleData() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['cycle-data', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('cycle_data')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as CycleData[];
    },
    enabled: !!user,
  });
}

export function useCreateCycleData() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (entry: Omit<CycleData, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('cycle_data')
        .insert({ ...entry, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cycle-data'] });
      toast.success('Cycle data saved!');
    },
    onError: (error: Error) => {
      toast.error('Failed to save cycle data: ' + error.message);
    },
  });
}

// Challenges hooks
export function useChallenges() {
  return useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Challenge[];
    },
  });
}

export function useUserChallenges() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['user-challenges', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('user_challenges')
        .select('*, challenges(*)')
        .eq('user_id', user.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useJoinChallenge() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('user_challenges')
        .insert({ challenge_id: challengeId, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-challenges'] });
      toast.success('Joined challenge!');
    },
    onError: (error: Error) => {
      toast.error('Failed to join challenge: ' + error.message);
    },
  });
}

// Notifications hooks
export function useNotifications() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['notifications', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .or(`user_id.eq.${user.id},user_id.is.null`)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!user,
  });
}

// App settings hooks
export function useAppSettings() {
  return useQuery({
    queryKey: ['app-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('app_settings')
        .select('*');
      if (error) throw error;
      return data as AppSetting[];
    },
  });
}

export function useAppSetting(key: string) {
  const { data: settings } = useAppSettings();
  return settings?.find(s => s.key === key);
}
