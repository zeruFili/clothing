import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icons";
import { useApp } from "../context/AppContext";

export const Header: React.FC = () => {
  const {
    cartItems,
    openCart,
    wishlist,
    openWishlist,
    items,
    formatPrice,
    maxPrice,
    setMaxPrice,
    selectedMaterial,
    setSelectedMaterial,
  } = useApp();

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  const matchingCount = items.filter((item) => {
    if (item.price > maxPrice) return false;
    if (
      selectedMaterial !== "All" &&
      !item.fabric.toLowerCase().includes(selectedMaterial.toLowerCase())
    ) {
      return false;
    }
    return true;
  }).length;

  const tickerItems = [
    "✨ Complimentary Express Worldwide Courier on Orders Over $250",
    "🎁 Hand-Crafted Velvet Hanger & Dust Bag Included With Every Piece",
    "👗 New Autumn/Winter Haute Couture & Ready-to-Wear Collection Now Live",
    "🌿 Certified Grade 6A Organic Mulberry Silk & Pure Mongolian Cashmere",
    "⚡ Same-Day Dispatch from Paris, Milan & London Boutiques",
    "🔄 30-Day Effortless Boutique Returns & Complimentary Exchanges",
  ];

  const navLinks = [
    { label: "Shop Catalog", path: "/" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Deals & Specials", path: "/discount", isSpecial: true },
  ];

  const mobileNavLinks = [
    { label: "Shop Catalog", path: "/" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Deals & Specials", path: "/discount", isSpecial: true },
  ];

  const searchResults = searchQuery.trim()
    ? items
        .filter(
          (i) =>
            i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 shadow-xs bg-white/95 backdrop-blur-md">
      {/* Marquee Announcement Bar */}
      <div className="overflow-hidden bg-[#123d32] py-1.5 sm:py-2 border-b border-emerald-900 text-amber-300">
        <div className="flex gap-8 whitespace-nowrap animate-slide-left text-[11px] sm:text-xs font-semibold tracking-wide">
          {tickerItems.concat(tickerItems).map((msg, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span>{msg}</span>
              <span className="text-emerald-500/50">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -ml-1 text-gray-700 hover:text-emerald-950 lg:hidden rounded-xl hover:bg-gray-100 transition-colors shrink-0"
          aria-label="Toggle menu"
        >
          <Icon name={mobileMenuOpen ? "close" : "grid"} size={22} />
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-[#123d32] text-amber-300 font-display font-black text-sm sm:text-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300 border border-emerald-700/50 shrink-0">
            DA
          </div>
          <div className="min-w-0">
            <span className="font-display font-black text-base sm:text-xl lg:text-2xl text-gray-950 tracking-tight block leading-tight truncate">
              DOQA ATELIER
            </span>
            <span className="text-[8px] sm:text-[10px] font-bold text-emerald-800 uppercase tracking-widest hidden xs:block truncate">
              Luxury Ready-to-Wear
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path);

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-bold tracking-tight transition-all py-1 border-b-2 flex items-center gap-1.5 ${
                  link.isSpecial
                    ? isActive
                      ? "text-rose-600 border-rose-600 font-black"
                      : "text-rose-600 border-transparent hover:border-rose-300 font-black"
                    : isActive
                    ? "text-[#123d32] border-[#123d32]"
                    : "text-gray-600 border-transparent hover:text-gray-950 hover:border-gray-300"
                }`}
              >
                {link.isSpecial && <Icon name="tag" size={13} className="text-rose-600" />}
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Quick Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 flex items-center gap-2 text-xs font-semibold transition-colors"
              title="Search collection"
            >
              <Icon name="search" size={16} className="text-gray-500" />
              <span className="hidden md:inline text-gray-400">Search pieces...</span>
            </button>

            {/* Quick Search Dropdown Modal */}
            {searchOpen && (
              <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 z-50 animate-scale-up">
                <div className="relative">
                  <Icon
                    name="search"
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search gowns, tuxedos, cashmere, SKU..."
                    className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#123d32]/20 focus:border-[#123d32]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {searchResults.length > 0 && (
                  <div className="mt-3 divide-y divide-gray-100 max-h-72 overflow-y-auto">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 p-2 hover:bg-emerald-50/60 rounded-xl transition-colors group"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover bg-gray-100 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-xs font-bold text-gray-900 group-hover:text-emerald-950 block truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-gray-500 block truncate">
                            {item.designer} • {item.category}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-[#123d32] block">
                            {formatPrice(item.price)}
                          </span>
                          {item.compareAtPrice && (
                            <span className="text-[9px] text-gray-400 line-through block">
                              {formatPrice(item.compareAtPrice)}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={openWishlist}
            className="relative p-2 sm:p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
            title="View Wishlist"
            aria-label="Wishlist"
          >
            <Icon
              name="heart"
              size={17}
              className={wishlist.length > 0 ? "text-rose-600 fill-rose-600" : "text-gray-600"}
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-rose-600 text-white font-bold text-[9px] sm:text-[10px] flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={openCart}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 bg-[#123d32] hover:bg-[#0d2d25] text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-98"
            aria-label="Shopping Bag"
          >
            <Icon name="bag" size={16} className="text-amber-300" />
            <span className="hidden sm:inline">Bag</span>
            <span className="px-1.5 py-0.5 rounded-md bg-white/20 text-white text-[11px] font-mono">
              {totalCartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Responsive Navigation Bar (Visible on mobile viewports: Shop Catalog, New Arrivals, Deals & Specials) */}
      <nav
        aria-label="Mobile Storefront Navigation"
        className="lg:hidden border-t border-gray-100 bg-[#f8faf7] px-2 py-1.5 flex items-center justify-between gap-1.5 overflow-x-auto scrollbar-none"
      >
        <Link
          to="/"
          className={`flex-1 text-center py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
            location.pathname === "/"
              ? "bg-[#123d32] text-amber-300 shadow-xs font-black"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Icon
            name="spark"
            size={12}
            className={location.pathname === "/" ? "text-amber-300" : "text-emerald-700"}
          />
          <span>Shop Catalog</span>
        </Link>
        <Link
          to="/new-arrivals"
          className={`flex-1 text-center py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
            location.pathname.startsWith("/new-arrivals")
              ? "bg-[#123d32] text-amber-300 shadow-xs font-black"
              : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Icon
            name="spark"
            size={12}
            className={
              location.pathname.startsWith("/new-arrivals") ? "text-amber-300" : "text-emerald-700"
            }
          />
          <span>New Arrivals</span>
        </Link>
        <Link
          to="/discount"
          className={`flex-1 text-center py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 whitespace-nowrap ${
            location.pathname.startsWith("/discount")
              ? "bg-rose-600 text-white shadow-xs font-black"
              : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
          }`}
        >
          <Icon
            name="tag"
            size={12}
            className={
              location.pathname.startsWith("/discount") ? "text-white" : "text-rose-600"
            }
          />
          <span>Deals & Specials</span>
        </Link>
      </nav>

      {/* Haute Navigation Drawer Modal (Portaled directly to document.body with z-[9999] so it can never be behind anything) */}
      {mobileMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="lg:hidden fixed inset-0 z-[9999] flex"
            role="dialog"
            aria-modal="true"
            aria-label="Haute Navigation Menu"
          >
            {/* Dark Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs animate-fade-in"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Left Drawer Panel */}
            <div
              className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-drawer-left overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                {/* Drawer Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#123d32] text-white">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-400 text-emerald-950 font-display font-black text-xs flex items-center justify-center shadow-xs">
                      DA
                    </div>
                    <div>
                      <span className="font-display font-bold text-sm text-white block">
                        DOQA ATELIER
                      </span>
                      <span className="text-[9px] text-amber-300 font-semibold block">
                        Haute Navigation
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="Close menu"
                  >
                    <Icon name="close" size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="p-4 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block px-2 mb-2">
                      Storefront Directory
                    </span>
                    <nav className="flex flex-col gap-1.5">
                      {mobileNavLinks.map((link) => {
                        const isActive =
                          link.path === "/"
                            ? location.pathname === "/"
                            : location.pathname.startsWith(link.path);

                        return (
                          <Link
                            key={link.label}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`px-3.5 py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-between ${
                              link.isSpecial
                                ? isActive
                                  ? "bg-rose-50 text-rose-700 border border-rose-200 font-black"
                                  : "text-rose-600 hover:bg-rose-50 border border-transparent"
                                : isActive
                                ? "bg-emerald-50 text-emerald-950 font-black border border-emerald-200"
                                : "text-gray-800 hover:bg-gray-100 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {link.isSpecial ? (
                                <Icon name="tag" size={16} className="text-rose-600" />
                              ) : (
                                <Icon name="spark" size={16} className="text-emerald-700" />
                              )}
                              <span>{link.label}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              {link.isSpecial && (
                                <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-black uppercase">
                                  Specials
                                </span>
                              )}
                              <span className="text-xs text-gray-400 font-bold">→</span>
                            </div>
                          </Link>
                        );
                      })}
                    </nav>
                  </div>

                  {/* Price Filter Section */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Price Filter
                      </span>
                      <span className="text-xs font-black text-[#123d32] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        Up to ${maxPrice}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={200}
                      max={2000}
                      step={50}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#123d32] cursor-pointer"
                    />

                    <div className="flex justify-between text-[10px] text-gray-400 font-semibold px-0.5">
                      <span>$200</span>
                      <span>$1,000</span>
                      <span>$2,000</span>
                    </div>

                    {/* Quick Price Presets */}
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      {[
                        { label: "< $500", val: 500 },
                        { label: "< $1,000", val: 1000 },
                        { label: "All Prices", val: 2000 },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          onClick={() => setMaxPrice(preset.val)}
                          className={`py-1 text-[11px] font-bold rounded-lg border transition-all ${
                            maxPrice === preset.val
                              ? "bg-[#123d32] text-amber-300 border-[#123d32] shadow-2xs"
                              : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Material / Fabric Filter Section */}
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Material Filter
                      </span>
                      {selectedMaterial !== "All" && (
                        <button
                          onClick={() => setSelectedMaterial("All")}
                          className="text-[10px] text-rose-600 hover:text-rose-800 font-bold"
                        >
                          Reset Material
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { id: "All", label: "All Materials" },
                        { id: "Silk", label: "Mulberry Silk" },
                        { id: "Cashmere", label: "Cashmere" },
                        { id: "Wool", label: "Italian Wool" },
                        { id: "Velvet", label: "Silk Velvet" },
                        { id: "Leather", label: "Fine Leather" },
                        { id: "Cotton", label: "Fine Cotton" },
                      ].map((mat) => {
                        const isSelected = selectedMaterial === mat.id;
                        return (
                          <button
                            key={mat.id}
                            onClick={() => setSelectedMaterial(mat.id)}
                            className={`py-1.5 px-2.5 rounded-xl text-xs font-bold text-left transition-all border flex items-center justify-between ${
                              isSelected
                                ? "bg-[#123d32] text-amber-300 border-[#123d32] shadow-xs"
                                : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-emerald-50 hover:text-emerald-950"
                            }`}
                          >
                            <span className="truncate">{mat.label}</span>
                            {isSelected && (
                              <Icon name="check" size={12} className="text-amber-300 shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filter Results Action Button */}
                  <div className="pt-2">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 sm:py-3 bg-[#123d32] hover:bg-[#0d2d25] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-98"
                    >
                      <Icon name="spark" size={14} className="text-amber-300" />
                      <span>View Filtered Collection ({matchingCount} Pieces)</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mobile Drawer Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 space-y-2">
                <div className="flex items-center justify-between font-bold">
                  <span>Direct Concierge:</span>
                  <span className="text-emerald-900">+1 (800) 555-DOQA</span>
                </div>
                <p className="text-[10px] text-gray-400 text-center">
                  Paris • Milan • London • New York
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Header;
