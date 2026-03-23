import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import Index from "./pages/Index";
import Pillows from "./pages/Pillows";
import About from "./pages/About";
import BrainwaveSleep from "./pages/BrainwaveSleep";
import Stores from "./pages/Stores";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ContentManagement from "./pages/ContentManagement";
import ImageManagement from "./pages/ImageManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pillows" element={<Pillows />} />
              <Route path="/brainwave" element={<BrainwaveSleep />} />
              <Route path="/about" element={<About />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/content" element={<ContentManagement />} />
              <Route path="/admin/images" element={<ImageManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
