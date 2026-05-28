/**
 * @module services/analyticsService
 * @description Centralised GA4 analytics service.
 * All event logging goes through here — never scatter logEvent() across components.
 * Ensures consistent naming, structured metadata, and a single place to update
 * if the analytics provider changes.
 * @version 1.0.0
 */
import { logEvent } from 'firebase/analytics';
import { analytics } from '@/config/firebase';

class AnalyticsService {
  /**
   * Tracks SPA page navigation. Call on every route change.
   * Firebase Hosting doesn't auto-track SPA nav — this must be manual.
   *
   * @param pagePath - The current pathname (e.g. '/dashboard')
   */
  trackPageView(pagePath: string): void {
    logEvent(analytics, 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: pagePath,
    });
  }

  /**
   * Tracks a meaningful user action (form submit, CTA click, feature usage).
   * Use snake_case for actionName to keep GA4 reports consistent.
   *
   * @param actionName - Snake_case identifier (e.g. 'search_submitted')
   * @param metadata   - Optional structured context
   */
  trackAction(
    actionName: string,
    metadata?: Record<string, string | number | boolean>
  ): void {
    logEvent(analytics, 'action_completed', {
      action_name: actionName,
      timestamp: Date.now(),
      ...metadata,
    });
  }

  /**
   * Tracks application errors. Called from every catch block and ErrorBoundary.
   * Feeds into GA4 for production monitoring.
   *
   * @param errorType    - Category (e.g. 'firestore_read', 'auth_failure')
   * @param errorMessage - The error message (truncated to GA4 limit)
   */
  trackError(errorType: string, errorMessage: string): void {
    logEvent(analytics, 'app_error', {
      error_type: errorType,
      error_message: errorMessage.slice(0, 150),
      page_path: window.location.pathname,
    });
  }

  /**
   * Tracks search queries with result counts.
   * Integrates with GA4's built-in Site Search reports.
   *
   * @param searchTerm  - The query the user entered
   * @param resultCount - Number of results returned
   */
  trackSearch(searchTerm: string, resultCount: number): void {
    logEvent(analytics, 'search', {
      search_term: searchTerm,
      result_count: resultCount,
    });
  }
}

/** Singleton — import this everywhere, never construct a new instance. */
export const analyticsService = new AnalyticsService();
