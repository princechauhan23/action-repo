import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-destructive/10 text-destructive border-destructive/20 h-full w-full">
          <AlertCircle className="w-8 h-8 mb-4" />
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm opacity-80 mb-4 text-center">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button variant="outline" onClick={() => this.setState({ hasError: false, error: undefined })}>
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
