import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ShopPage from "./components/ShopPage";
import ProductDetailPage from "./components/ProductDetailPage";
import QuickViewModal from "./components/QuickViewModal";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import SizeGuideModal from "./components/SizeGuideModal";
import Toast from "./components/Toast";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-[#f8faf7] text-[#18352b] flex flex-col font-sans antialiased selection:bg-[#123d32] selection:text-amber-300">
          {/* Header */}
          <Header />

          {/* Main Content Area */}
          <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
            <Routes>
              <Route path="/" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="*" element={<ShopPage />} />
            </Routes>
          </main>

          {/* Global Interactive Overlays */}
          <QuickViewModal />
          <CartDrawer />
          <WishlistDrawer />
          <SizeGuideModal />
          <Toast />

          {/* Footer */}
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
