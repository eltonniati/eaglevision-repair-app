

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CompanyProfile from "./pages/CompanyProfile";
import JobCards from "./pages/JobCards";
import CreateJobCard from "./pages/CreateJobCard";
import EditJobCard from "./pages/EditJobCard";
import JobDetail from "./pages/JobDetail";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceDetail from "./pages/InvoiceDetail";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/auth/RequireAuth";
import { LanguageProvider } from "./contexts/LanguageContext";
import Settings from "./pages/Settings";
import { Signature } from "./components/common/Signature";
import UserManualPage from "./pages/UserManualPage";
import { Link } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  } />
                  <Route path="/company-profile" element={
                    <RequireAuth>
                      <CompanyProfile />
                    </RequireAuth>
                  } />
                  <Route path="/settings" element={
                    <RequireAuth>
                      <Settings />
                    </RequireAuth>
                  } />
                  <Route path="/job-cards" element={
                    <RequireAuth>
                      <JobCards />
                    </RequireAuth>
                  } />
                  <Route path="/job-cards/new" element={
                    <RequireAuth>
                      <CreateJobCard />
                    </RequireAuth>
                  } />
                  <Route path="/job-cards/:id/edit" element={
                    <RequireAuth>
                      <EditJobCard />
                    </RequireAuth>
                  } />
                  <Route path="/job-cards/:id" element={
                    <RequireAuth>
                      <JobDetail />
                    </RequireAuth>
                  } />
                  <Route path="/invoices" element={
                    <RequireAuth>
                      <Invoices />
                    </RequireAuth>
                  } />
                  <Route path="/invoices/new/:jobId" element={
                    <RequireAuth>
                      <CreateInvoice />
                    </RequireAuth>
                  } />
                  <Route path="/invoices/:invoiceId" element={
                    <RequireAuth>
                      <InvoiceDetail />
                    </RequireAuth>
                  } />
                  <Route path="/user-manual" element={<UserManualPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <footer className="mt-auto py-4 border-t no-print">
                <div className="flex justify-between items-center container mx-auto px-2">
                  <Signature />
                  <Link 
                    to="/user-manual"
                    className="text-xs underline text-muted-foreground hover:text-primary transition"
                  >
                    User Manual
                  </Link>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

