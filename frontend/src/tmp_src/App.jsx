import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext.jsx';
import { DataProvider } from './context/DataContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <AuthProvider>
          <AppRoutes />
          <Toaster 
            position="top-right"
            richColors 
            expand={false}
            theme="light" // Will be dynamic later
            toastOptions={{
              className: 'glass-dark border-white/10 text-white',
            }}
          />
        </AuthProvider>
      </DataProvider>
    </QueryClientProvider>
  );
}

export default App;
