import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Alert {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export const useAlerts = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchAlerts();
    } else {
      setAlerts([]);
      setLoading(false);
    }
  }, [user]);

  const fetchAlerts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId: string) => {
    try {
      const { error } = await supabase
        .from('alerts')
        .update({ is_read: true })
        .eq('id', alertId);

      if (error) throw error;
      
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, is_read: true } : alert
        )
      );
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  const createAlert = async (title: string, message: string, type: string = 'info') => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('alerts')
        .insert({
          user_id: user.id,
          title,
          message,
          type
        })
        .select()
        .single();

      if (error) throw error;
      setAlerts(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error creating alert:', error);
    }
  };

  const filterAlerts = (filter: 'all' | 'today' | 'yesterday' | 'unread') => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return alerts.filter(alert => {
      const alertDate = new Date(alert.created_at);
      
      switch (filter) {
        case 'today':
          return alertDate >= today;
        case 'yesterday':
          return alertDate >= yesterday && alertDate < today;
        case 'unread':
          return !alert.is_read;
        case 'all':
        default:
          return true;
      }
    });
  };

  const unreadCount = alerts.filter(alert => !alert.is_read).length;

  return {
    alerts,
    loading,
    unreadCount,
    markAsRead,
    createAlert,
    filterAlerts,
    refetch: fetchAlerts
  };
};