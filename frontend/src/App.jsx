import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './context/AuthContext.jsx';
import { DataProvider } from './context/DataContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <Router>
            <div className="min-h-screen bg-background text-slate-900">
               <AppRoutes />
            </div>
            <Toaster position="top-right" richColors closeButton theme="dark" />
            <Analytics />
          </Router>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
