import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { StoreProvider } from '@/store'
import { AuthProvider } from '@/hooks/use-auth'
import { Layout } from '@/components/Layout'

import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import TeamHome from '@/pages/TeamHome'
import Catalog from '@/pages/Catalog'
import GlobalCatalog from '@/pages/GlobalCatalog'
import ProductDetail from '@/pages/ProductDetail'
import Checkout from '@/pages/Checkout'
import Tracking from '@/pages/Tracking'

import AdminDashboard from '@/pages/admin/AdminDashboard'
import ProductionDashboard from '@/pages/production/ProductionDashboard'
import ProfessorDashboard from '@/pages/professor/ProfessorDashboard'
import NotFound from '@/pages/NotFound'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <AuthProvider>
      <StoreProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Global Routes */}
              <Route path="/catalog" element={<GlobalCatalog />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/tracking" element={<Tracking />} />

              {/* Management Routes */}
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="/production/*" element={<ProductionDashboard />} />
              <Route path="/professor/*" element={<ProfessorDashboard />} />

              {/* Team Specific Routes */}
              <Route path="/:teamSlug" element={<TeamHome />} />
              <Route path="/:teamSlug/catalog" element={<Catalog />} />
              <Route path="/:teamSlug/product/:productId" element={<ProductDetail />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </StoreProvider>
    </AuthProvider>
  </BrowserRouter>
)

export default App
