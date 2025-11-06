import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/customer/Home";
import About from "./pages/customer/About";
import Contact from "./pages/customer/Contact";
import EventDetail from "./pages/customer/EventDetail";
import BuyTickets from "./pages/customer/BuyTickets";
import PurchaseConfirmation from "./pages/customer/PurchaseConfirmation";
import TicketDownload from "./pages/customer/TicketDownload";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import CreateEvent from "./pages/admin/CreateEvent";
import EventDetails from "./pages/admin/EventDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/:id/buy-tickets" element={<BuyTickets />} />
          <Route path="/event/:id/confirmation" element={<PurchaseConfirmation />} />
          <Route path="/event/:id/ticket" element={<TicketDownload />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="event/:id" element={<EventDetails />} />
        </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
