import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "./ProductCard";
import Icon from "./Icons";
import { ClothingCategory } from "../types";

export const ShopPage: React.FC = () => {
  const { items } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("All");
  const [selectedGender, setSelectedGender] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [saleOnly, setSaleOnly] = useState<boolean>(false);
  const [newOnly, setNewOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortKey, setSortKey] = useState<
    "featured" | "price-asc" | "price-desc" | "rating" | "bestseller"
  >("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const PAGE_SIZE = 8;

  // Sync URL search params
  useEffect(() => {
    const cat = searchParams.get("cat");
    const filter = searchParams.get("filter");
    if (cat) {
      setSelectedCategory(cat);
    }
    if (filter === "sale") {
      setSaleOnly(true);
    } else if (filter === "new") {
      setNewOnly(true);
    }
  }, [searchParams]);

  const categories: ClothingCategory[] = [
    "All",
    "Evening Gowns & Gala Dresses",
    "Tailored Suits & Tuxedos",
    "Cashmere Coats & Capes",
    "Silk Blouses & Shirts",
    "Designer Blazers & Jackets",
    "Haute Skirts & Trousers",
    "Leather Accessories & Bags",
    "Footwear & Occasion Heels",
  ];

  const occasions = [
    { id: "All", label: "All Occasions", icon: "✨" },
    { id: "Galas & Black Tie", label: "Galas & Black Tie", icon: "🍾" },
    { id: "Weddings & Ceremonies", label: "Weddings & Ceremonies", icon: "💍" },
    { id: "Red Carpet", label: "Red Carpet & Premieres", icon: "🌟" },
    { id: "Executive & Boardroom", label: "Executive Boardroom", icon: "💼" },
    { id: "Cocktail & Soirées", label: "Cocktail & Soirées", icon: "🍸" },
    { id: "Casual Luxury", label: "Casual Luxury", icon: "☕" },
  ];

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: items.length };
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [items]);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }
      if (selectedOccasion !== "All" && !item.occasion.includes(selectedOccasion)) {
        return false;
      }
      if (selectedGender !== "All") {
        if (selectedGender === "Women" && item.gender !== "Women" && item.gender !== "Unisex") return false;
        if (selectedGender === "Men" && item.gender !== "Men" && item.gender !== "Unisex") return false;
      }
      if (inStockOnly && item.stockQuantity <= 0) {
        return false;
      }
      if (saleOnly && !item.isSale) {
        return false;
      }
      if (newOnly && !item.isNewArrival) {
        return false;
      }
      if (item.price > maxPrice) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.designer.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.code.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.fabric.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [
    items,
    selectedCategory,
    selectedOccasion,
    selectedGender,
    inStockOnly,
    saleOnly,
    newOnly,
    maxPrice,
    searchQuery,
  ]);

  // Sorted Items
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    switch (sortKey) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "bestseller":
        return list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      case "featured":
      default:
        return list;
    }
  }, [filteredItems, sortKey]);

  const totalPages = Math.ceil(sortedItems.length / PAGE_SIZE) || 1;
  const safePage = Math.min(currentPage, totalPages);
  const pagedItems = sortedItems.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedOccasion("All");
    setSelectedGender("All");
    setInStockOnly(false);
    setSaleOnly(false);
    setNewOnly(false);
    setMaxPrice(2000);
    setSearchQuery("");
    setSortKey("featured");
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedOccasion !== "All" ||
    selectedGender !== "All" ||
    inStockOnly ||
    saleOnly ||
    newOnly ||
    maxPrice < 2000 ||
    searchQuery.trim() !== "";

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Showcase Section */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#123d32] via-[#1a4a3e] to-[#0e3027] text-white p-6 sm:p-10 md:p-14 shadow-2xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Icon name="spark" size={13} className="text-amber-400" />
            <span>Autumn / Winter 2026 Collection</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Complimentary Worldwide Shipping</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Curated Haute Couture & Ready-to-Wear
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-emerald-100/85 leading-relaxed max-w-2xl font-light">
            Sovereign runway silhouettes, archival evening gowns, Italian virgin wool tuxedos, and pure Mongolian cashmere coats. Every piece is crafted in limited batches, inspected by master tailors, and delivered in custom wooden presentation boxes.
          </p>

          {/* Quick Filter Shortcuts */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => {
                setSelectedCategory("Evening Gowns & Gala Dresses");
                setSelectedOccasion("All");
                setCurrentPage(1);
              }}
              className="px-3.5 py-2 bg-white text-emerald-950 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-1.5"
            >
              <span>👗</span>
              <span>Evening Gowns</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Tailored Suits & Tuxedos");
                setSelectedOccasion("All");
                setCurrentPage(1);
              }}
              className="px-3.5 py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>🤵</span>
              <span>Suits & Tuxedos</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Cashmere Coats & Capes");
                setSelectedOccasion("All");
                setCurrentPage(1);
              }}
              className="px-3.5 py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>🧥</span>
              <span>Cashmere Coats</span>
            </button>
            <button
              onClick={() => {
                setSelectedCategory("Silk Blouses & Shirts");
                setSelectedOccasion("All");
                setCurrentPage(1);
              }}
              className="px-3.5 py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>👚</span>
              <span>Silk Blouses</span>
            </button>
            <button
              onClick={() => {
                setSaleOnly(true);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2 bg-rose-600/80 hover:bg-rose-600 border border-rose-400/40 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Icon name="tag" size={13} className="text-amber-300" />
              <span>Sale Pieces</span>
            </button>
          </div>
        </div>

        {/* Ambient Grid Overlay & Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Occasion Filter Horizontal Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {occasions.map((occ) => (
          <button
            key={occ.id}
            onClick={() => {
              setSelectedOccasion(occ.id);
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
              selectedOccasion === occ.id
                ? "bg-[#123d32] text-white shadow-md scale-102"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <span>{occ.icon}</span>
            <span>{occ.label}</span>
          </button>
        ))}
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside
          className={`lg:block ${
            mobileFiltersOpen
              ? "fixed inset-0 z-50 p-6 bg-white overflow-y-auto block animate-fade-in"
              : "hidden"
          } lg:relative lg:p-0 lg:bg-transparent lg:z-0`}
        >
          {mobileFiltersOpen && (
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 lg:hidden">
              <strong className="text-base font-bold text-gray-900">
                Filter Collection
              </strong>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
          )}

          <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Filters
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 hover:text-rose-800 font-bold"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Category
              </label>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat
                        ? "bg-emerald-50 text-emerald-950 font-bold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className="text-[10px] text-gray-400 ml-2">
                      ({categoryCounts[cat] || 0})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Gender / Silhouette Filter */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Department
              </label>
              <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
                {["All", "Women", "Men"].map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setSelectedGender(g);
                      setCurrentPage(1);
                    }}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedGender === g
                        ? "bg-white text-gray-950 shadow-xs"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Retail Price Slider */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                <span>Maximum Price</span>
                <span className="text-emerald-950 font-black">${maxPrice}</span>
              </div>
              <input
                type="range"
                min={200}
                max={2000}
                step={50}
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#123d32] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>$200</span>
                <span>$2,000</span>
              </div>
            </div>

            {/* Quick Status Toggles */}
            <div className="space-y-3 pt-3 border-t border-gray-100 text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded text-[#123d32] focus:ring-[#123d32] w-4 h-4"
                />
                <span className="text-gray-700 font-semibold">In Stock & Ready to Ship</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={saleOnly}
                  onChange={(e) => {
                    setSaleOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span className="text-gray-700 font-semibold flex items-center gap-1">
                  <span>Sale Items Only</span>
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-bold">
                    Sale
                  </span>
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={newOnly}
                  onChange={(e) => {
                    setNewOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded text-[#123d32] focus:ring-[#123d32] w-4 h-4"
                />
                <span className="text-gray-700 font-semibold">New Season Drops</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Main Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Controls Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px] sm:min-w-[280px]">
              <Icon
                name="search"
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by silhouette, designer, silk, SKU..."
                className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#123d32]/20 focus:border-[#123d32]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Trigger on Mobile */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <Icon name="filter" size={14} />
              <span>Filters</span>
            </button>

            {/* Results Count */}
            <div className="text-xs text-gray-500 font-semibold hidden md:block">
              Showing{" "}
              <strong className="text-gray-900">{sortedItems.length}</strong> luxury
              pieces
            </div>

            {/* Sort Dropdown & View Mode Switcher */}
            <div className="flex items-center gap-2">
              <select
                value={sortKey}
                onChange={(e) => {
                  setSortKey(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-800 cursor-pointer focus:outline-none"
              >
                <option value="featured">Featured Curation</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="bestseller">Bestsellers</option>
              </select>

              <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                  title="Grid View"
                >
                  <Icon name="grid" size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-gray-900 shadow-2xs"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                  title="Editorial List View"
                >
                  <Icon name="list" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-400 font-semibold">Active:</span>
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-950 font-bold rounded-full border border-emerald-200">
                  <span>{selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-rose-600"
                  >
                    ✕
                  </button>
                </span>
              )}
              {selectedOccasion !== "All" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-950 font-bold rounded-full border border-emerald-200">
                  <span>{selectedOccasion}</span>
                  <button
                    onClick={() => setSelectedOccasion("All")}
                    className="hover:text-rose-600"
                  >
                    ✕
                  </button>
                </span>
              )}
              {saleOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-800 font-bold rounded-full border border-rose-200">
                  <span>Sale Items</span>
                  <button
                    onClick={() => setSaleOnly(false)}
                    className="hover:text-rose-900"
                  >
                    ✕
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-950 font-bold rounded-full border border-emerald-200">
                  <span>In Stock</span>
                  <button
                    onClick={() => setInStockOnly(false)}
                    className="hover:text-rose-600"
                  >
                    ✕
                  </button>
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-rose-600 font-bold underline hover:text-rose-800 ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Products Grid or Empty State */}
          {pagedItems.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-gray-200 p-8 space-y-4">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mx-auto">
                <Icon name="search" size={28} />
              </div>
              <h3 className="font-display font-black text-xl text-gray-900">
                No matching pieces found
              </h3>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                We could not find any garments matching your selected criteria. Try adjusting your filters, price range, or search term.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-[#123d32] text-white rounded-xl text-xs font-bold hover:bg-[#0e2c24] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {pagedItems.map((item) => (
                <ProductCard key={item.id} item={item} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {pagedItems.map((item) => (
                <ProductCard key={item.id} item={item} viewMode="list" />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Page <strong className="text-gray-900">{safePage}</strong> of{" "}
                <strong className="text-gray-900">{totalPages}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={safePage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-gray-700"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition-colors ${
                      num === safePage
                        ? "bg-[#123d32] text-white"
                        : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  disabled={safePage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-gray-700"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
