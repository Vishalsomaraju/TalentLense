/**
 * @module App
 * @description Root application component.
 * Handles routing, analytics page tracking, and top-level error boundary.
 * All routes are wrapped in ErrorBoundary so render errors are caught gracefully.
 */
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { analyticsService } from '@/services/analyticsService';
import { ROUTES } from '@/constants';
// import { HomePage } from '@/pages/HomePage';  // TODO: add pages

/**
 * Tracks page views on every route change.
 * Must be rendered inside BrowserRouter to access location.
 */
function Analytics(): null {
  const location = useLocation();

  useEffect(() => {
    // GA4 doesn't auto-track SPA navigation — we must fire this manually
    analyticsService.trackPageView(location.pathname);
  }, [location]);

  return null;
}

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Analytics />
      <ErrorBoundary>
        <Routes>
          <Route path={ROUTES.HOME} element={<div>TODO: Add pages</div>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
