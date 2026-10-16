import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/core/theme/ThemeProvider';
import { AppRouter } from '@/app/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="devdeck-theme">
            <AppRouter />
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}
