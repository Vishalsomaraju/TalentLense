/**
 * @module components/ui/ErrorBoundary
 * @description React Error Boundary — catches render errors and shows fallback UI.
 * Logs all caught errors to GA4 so production errors are visible in Analytics.
 * Wrap every major page section with this component.
 * @version 1.0.0
 */
import { Component, type ReactNode, type ErrorInfo } from 'react';
import { analyticsService } from '@/services/analyticsService';

interface Props {
  children: ReactNode;
  /** Optional custom fallback. Defaults to a generic error message. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log to GA4 so render errors appear in production monitoring
    analyticsService.trackError('react_error_boundary', error.message);
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div
          role="alert"
          className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            Please refresh the page or try again later.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, errorMessage: '' })}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
