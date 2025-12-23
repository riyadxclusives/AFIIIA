import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase, Profile, AppSetting, Challenge, Notification, Content, AppRole } from '@/integrations/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Admin-only hooks

// Get all users (admin only)
export function useAdminUsers() {
  const { isAdmin } = useAuth();
  
  return useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, user_roles(role)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: isAdmin,
  });
}

// Get dashboard stats
export function useAdminStats() {
  const { isAdmin } = useAuth();
  
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      // Total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Users by subscription
      const { data: subscriptionData } = await supabase
        .from('profiles')
        .select('subscription_plan');
      
      const subscriptions = subscriptionData?.reduce((acc, profile) => {
        acc[profile.subscription_plan] = (acc[profile.subscription_plan] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};
      
      // Recent signups (last 24 hours)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const { count: recentSignups } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', yesterday.toISOString());
      
      return {
        totalUsers: totalUsers || 0,
        subscriptions,
        recentSignups: recentSignups || 0,
        activeSubscriptions: (subscriptions['bloom'] || 0) + (subscriptions['radiance'] || 0),
      };
    },
    enabled: isAdmin,
  });
}

// Update user profile (admin)
export function useAdminUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, updates }: { userId: string; updates: Partial<Profile> }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update user: ' + error.message);
    },
  });
}

// Delete user (admin)
export function useAdminDeleteUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (userId: string) => {
      // This will cascade delete due to FK constraints
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User deleted successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to delete user: ' + error.message);
    },
  });
}

// Manage user roles
export function useAdminUpdateRole() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, role, action }: { userId: string; role: AppRole; action: 'add' | 'remove' }) => {
      if (action === 'add') {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role });
        if (error && !error.message.includes('duplicate')) throw error;
      } else {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', role);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success('User role updated');
    },
    onError: (error: Error) => {
      toast.error('Failed to update role: ' + error.message);
    },
  });
}

// App settings management
export function useAdminUpdateSetting() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: unknown }) => {
      const { data, error } = await supabase
        .from('app_settings')
        .update({ 
          value: JSON.stringify(value), 
          updated_at: new Date().toISOString(),
          updated_by: user?.id 
        })
        .eq('key', key)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['app-settings'] });
      toast.success('Setting updated successfully');
    },
    onError: (error: Error) => {
      toast.error('Failed to update setting: ' + error.message);
    },
  });
}

// Challenges management
export function useAdminChallenges() {
  const { isAdmin } = useAuth();
  
  return useQuery({
    queryKey: ['admin-challenges'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Challenge[];
    },
    enabled: isAdmin,
  });
}

export function useAdminCreateChallenge() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (challenge: Omit<Challenge, 'id' | 'created_at' | 'created_by'>) => {
      const { data, error } = await supabase
        .from('challenges')
        .insert({ ...challenge, created_by: user?.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-challenges'] });
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      toast.success('Challenge created!');
    },
    onError: (error: Error) => {
      toast.error('Failed to create challenge: ' + error.message);
    },
  });
}

export function useAdminUpdateChallenge() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Challenge> }) => {
      const { data, error } = await supabase
        .from('challenges')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-challenges'] });
      queryClient.invalidateQueries({ queryKey: ['challenges'] });
      toast.success('Challenge updated!');
    },
    onError: (error: Error) => {
      toast.error('Failed to update challenge: ' + error.message);
    },
  });
}

// Notifications management
export function useAdminNotifications() {
  const { isAdmin } = useAuth();
  
  return useQuery({
    queryKey: ['admin-notifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Notification[];
    },
    enabled: isAdmin,
  });
}

export function useAdminSendNotification() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notification: Omit<Notification, 'id' | 'created_at' | 'is_read'>) => {
      const { data, error } = await supabase
        .from('notifications')
        .insert(notification)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notifications'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      toast.success('Notification sent!');
    },
    onError: (error: Error) => {
      toast.error('Failed to send notification: ' + error.message);
    },
  });
}

// Content management
export function useAdminContent() {
  const { isAdmin } = useAuth();
  
  return useQuery({
    queryKey: ['admin-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as Content[];
    },
    enabled: isAdmin,
  });
}

export function useAdminCreateContent() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (content: Omit<Content, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
      const { data, error } = await supabase
        .from('content')
        .insert({ ...content, created_by: user?.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      toast.success('Content created!');
    },
    onError: (error: Error) => {
      toast.error('Failed to create content: ' + error.message);
    },
  });
}

export function useAdminUpdateContent() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Content> }) => {
      const { data, error } = await supabase
        .from('content')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-content'] });
      toast.success('Content updated!');
    },
    onError: (error: Error) => {
      toast.error('Failed to update content: ' + error.message);
    },
  });
}
