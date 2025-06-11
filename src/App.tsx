
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";

import JobCards from "./pages/JobCards";
import CreateJobCard from "./pages/CreateJobCard";
import InvoiceDetail from "./pages/InvoiceDetail";
import Invoices from "./pages/Invoices";
import Settings from "./pages/Settings";
import { Signature } from "./components/common/Signature";

const queryClient = new QueryClient();

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsAuthenticated(!!user);
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background font-sans antialiased">
              <div className="relative flex min-h-screen flex-col">
                <RequireAuth>
                  <div className="flex-1">
                    <main className="flex-1">
                      <Routes>
                        <Route path="/" element={<Navigate to="/job-cards" />} />
                        <Route path="/job-cards" element={<JobCards />} />
                        <Route path="/job-cards/new" element={<CreateJobCard />} />
                        <Route path="/invoices/:invoiceId" element={<InvoiceDetail />} />
                        <Route path="/job-cards/:jobId/invoices/new" element={<Invoices />} />
                        <Route path="/settings" element={<Settings />} />
                      </Routes>
                    </main>
                  </div>
                  <footer className="mt-auto border-t bg-background">
                    <div className="container mx-auto px-4 py-6">
                      <Signature variant="minimal" />
                    </div>
                  </footer>
                </RequireAuth>
              </div>
              <Toaster />
            </div>
          </BrowserRouter>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
