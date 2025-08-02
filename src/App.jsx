import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import Orders from './pages/Orders';
import ShippingInfoPage from './pages/ShippingInfoPage';
import ReturnsExchangesPage from './pages/ReturnsExchangesPage';
import SoapGuidePage from './pages/SoapGuidePage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

// Admin Pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAnnouncements from './pages/admin/AdminAnnouncements';
import AdminReviews from './pages/admin/AdminReviews';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AdminRoute from './components/AdminRoute';
import LoadingSpinner from './components/LoadingSpinner';
import OrderNotification from './components/OrderNotification';

// Loading Context
const LoadingContext = React.createContext();

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <LoadingSpinner fullScreen text="Loading..." />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => React.useContext(LoadingContext);

function App() {
  return (
    <>
      <Helmet>
        <title>Sitara - Premium Skincare Products | Natural Beauty Solutions</title>
        <meta name="description" content="Discover Sitara's premium skincare collection. Transform your skin with our natural face creams, body creams, and anti-aging solutions. Free delivery across Pakistan." />
      </Helmet>
      <Router>
        <AuthProvider>
          <LoadingProvider>
            <CartProvider>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/" element={<><Navbar /><HomePage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/products" element={<><Navbar /><ProductsPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/product/:id" element={<><Navbar /><ProductDetailPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/cart" element={<><Navbar /><CartPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/checkout" element={<><Navbar /><CheckoutPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/orders" element={<><Navbar /><Orders /><Footer /><WhatsAppButton /></>} />
                  <Route path="/order-success" element={<><Navbar /><OrderSuccessPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/contact" element={<><Navbar /><ContactPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/auth" element={<><Navbar /><AuthPage /><Footer /></>} />
                  <Route path="/shipping-info" element={<><Navbar /><ShippingInfoPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/returns-exchanges" element={<><Navbar /><ReturnsExchangesPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/soap-guide" element={<><Navbar /><SoapGuidePage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/faq" element={<><Navbar /><FAQPage /><Footer /><WhatsAppButton /></>} />
                  <Route path="/privacy-policy" element={<><Navbar /><PrivacyPolicyPage /><Footer /><WhatsAppButton /></>} />
                  
                  <Route path="/admin/dashboard" element={<AdminRoute><AdminLayout><AdminDashboard /></AdminLayout></AdminRoute>} />
                  <Route path="/admin/products" element={<AdminRoute><AdminLayout><AdminProducts /></AdminLayout></AdminRoute>} />
                  <Route path="/admin/orders" element={<AdminRoute><AdminLayout><AdminOrders /></AdminLayout></AdminRoute>} />
                  <Route path="/admin/users" element={<AdminRoute><AdminLayout><AdminUsers /></AdminLayout></AdminRoute>} />
                  <Route path="/admin/announcements" element={<AdminRoute><AdminLayout><AdminAnnouncements /></AdminLayout></AdminRoute>} />
                  <Route path="/admin/reviews" element={<AdminRoute><AdminLayout><AdminReviews /></AdminLayout></AdminRoute>} />
                </Routes>
                
                {/* Global Components */}
                <Toaster position="top-right" />
                <OrderNotification />
              </div>
            </CartProvider>
          </LoadingProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;