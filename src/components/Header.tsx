import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "./Icons";
import { useApp } from "../context/AppContext";
import { Currency, UserRole } from "../types";

export const Header: React.FC = () => {
  const {
    cartItems,
    openCart,
    wishlist,
    openWishlist,
    currency,
    setCurrency,
    currentUser,
    switchUserRole,
    items,
    formatPrice,
  } = useApp();

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleSelectOpen, setRoleSelectOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

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

  const searchResults = searchQuery.trim()
    ? items.filter(
        (i) =>
          i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          i.code.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      {/* Marquee Announcement Bar */}
      <div className="overflow-hidden bg-[#123d32] py-2 border-b border-emerald-900 text-amber-300">
        <div className="flex gap-8 whitespace-nowrap animate-slide-left text-xs font-semibold tracking-wide">
          {tickerItems.concat(tickerItems).map((msg, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span>{msg}</span>
              <span className="text-emerald-500/50">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -ml-2 text-gray-700 hover:text-emerald-950 lg:hidden"
          aria-label="Toggle menu"
        >
          <Icon name={mobileMenuOpen ? "close" : "grid"} size={22} />
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#123d32] text-amber-300 font-display font-black text-base sm:text-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-300 border border-emerald-700/50">
            DA
          </div>
          <div>
            <span className="font-display font-black text-xl sm:text-2xl text-gray-950 tracking-tight block leading-tight">
              DOQA ATELIER
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
              Luxury Ready-to-Wear & Haute Couture
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
        <div className="flex items-center gap-2 sm:gap-3.5">
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
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 p-3 z-50 animate-scale-up">
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

          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="hidden sm:block px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#123d32]"
            aria-label="Currency"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="ETB">ETB (Birr)</option>
          </select>

          {/* Account Profile Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleSelectOpen(!roleSelectOpen)}
              className="flex items-center gap-1.5 sm:gap-2 p-1 sm:pr-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-800 transition-colors"
              title="Active Profile"
            >
              <span className="w-7 h-7 rounded-lg bg-[#123d32] text-amber-300 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                {currentUser.avatar}
              </span>
              <span className="hidden xl:inline capitalize font-medium text-gray-700">
                {currentUser.tier}
              </span>
              <Icon name="chevronDown" size={12} className="text-gray-400" />
            </button>

            {roleSelectOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 p-2 z-50 animate-scale-up"
                onClick={() => setRoleSelectOpen(false)}
              >
                <div className="px-3 py-2 border-b border-gray-100 mb-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                    Customer Account
                  </span>
                  <span className="text-xs font-bold text-gray-900 block truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-semibold block">
                    {currentUser.tier} • {currentUser.email}
                  </span>
                </div>
                {[
                  { role: "vip_client", label: "VIP Gold Member (Complimentary Tailoring)" },
                  { role: "stylist", label: "Trade / Private Stylist Account" },
                  { role: "guest", label: "Guest Shopper" },
                ].map((r) => (
                  <button
                    key={r.role}
                    onClick={() => switchUserRole(r.role as UserRole)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between ${
                      currentUser.role === r.role
                        ? "bg-emerald-50 text-emerald-950 font-bold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{r.label}</span>
                    {currentUser.role === r.role && (
                      <Icon name="check" size={14} className="text-emerald-700" />
                    )}
                  </button>
                ))}
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
              size={18}
              className={wishlist.length > 0 ? "text-rose-600 fill-rose-600" : "text-gray-600"}
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#123d32] hover:bg-[#0d2d25] text-white rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-md active:scale-98"
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3 animate-fade-in">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-sm font-bold text-gray-800 hover:bg-emerald-50 hover:text-emerald-950 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.isSpecial && (
                  <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-black uppercase">
                    Specials
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
