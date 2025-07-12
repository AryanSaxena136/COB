import { supabase } from './supabase';

export const trackEvent = (event: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, params);
  }
  // Also log to Supabase for custom analytics
  supabase.from('analytics_events').insert({
    event_name: event,
    event_params: params,
    user_id: supabase.auth.user()?.id || null,
    path: window.location.pathname,
  });
};

export const trackPageView = (pageTitle: string) => {
  trackEvent('page_view', {
    page_title: pageTitle,
    page_path: window.location.pathname,
  });
};