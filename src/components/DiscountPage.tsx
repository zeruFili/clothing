import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "./ProductCard";
import Icon from "./Icons";

export const DiscountPage: React.FC = () => {
  const { items } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortKey, setSortKey] = useState<"discount-desc" | "price-asc" | "price-desc">("discount-desc");

  // All sale or discount items
  const deals = useMemo(() => {
    return items.filter((item) => item.isSale || (item.discountPercentage && item.discountPercentage > 0));
  }, [items]);

  const categories = useMemo(() => {
    const set = new Set(deals.map((d) => d.category));
    return ["All", ...Array.from(set)];
  }, [deals]);

  const filteredDeals = useMemo(() => {
    return deals
      .filter((item) => {
        if (selectedCategory !== "All" && item.category !== selectedCategory) {
          return false;
        }

        const pct = item.discountPercentage || 0;
        if (selectedTier === "25" && pct < 25) return false;
        if (selectedTier === "20" && (pct < 20 || pct >= 25)) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return (
            item.name.toLowerCase().includes(q) ||
            item.designer.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.code.toLowerCase().includes(q)
          );
        }

        return true;
      })
      .sort((a, b) => {
        if (sortKey === "discount-desc") {
          return (b.discountPercentage || 0) - (a.discountPercentage || 0);
        }
        if (sortKey === "price-asc") {
          return a.price - b.price;
        }
        if (sortKey === "price-desc") {
          return b.price - a.price;
        }
        return 0;
      });
  }, [deals, selectedCategory, selectedTier, searchQuery, sortKey]);

  return (
    <div className="space-y-8 pb-16">
      {/* Deals Hero Banner (Directly inspired by Doqa Rental's DiscountPage banner) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#123d32] via-[#1a4a3e] to-rose-950 text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl border border-rose-900/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-600/30 border border-rose-400/40 text-rose-200 text-xs font-black uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>DOQA ATELIER • DEALS & SPECIAL OFFERS</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">UP TO 25% OFF ARCHIVAL PIECES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
            Exclusive Deals & Archival Specials
          </h1>

          <p className="text-xs md:text-sm text-rose-100/80 max-w-2xl leading-relaxed font-light">
            Limited-inventory bespoke tuxedos, bias-cut silk gowns, and structured crepe jackets available at private seasonal pricing. All pieces include full luxury packaging and complimentary doorstep returns.
          </p>

          {/* Quick discount tier filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setSelectedTier("All")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTier === "All"
                  ? "bg-white text-gray-950 shadow-xs"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              All Specials ({deals.length})
            </button>
            <button
              onClick={() => setSelectedTier("25")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTier === "25"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              25%+ Off Tier
            </button>
            <button
              onClick={() => setSelectedTier("20")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedTier === "20"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
              }`}
            >
              20% - 24% Off Tier
            </button>
          </div>
        </div>

        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Category selection */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? "bg-[#123d32] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-semibold">Sort:</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as any)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-800"
          >
            <option value="discount-desc">Highest Discount %</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid Results */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 pb-2 border-b border-gray-200">
        <span>
          Showing <strong className="text-gray-900">{filteredDeals.length}</strong> special offers
        </span>
        <Link to="/" className="text-[#123d32] hover:underline font-bold">
          ← Return to Full Shop Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDeals.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default DiscountPage;
