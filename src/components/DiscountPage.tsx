import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import CatalogBrowser, { SortOption } from "./CatalogBrowser";
import Icon from "./Icons";
import { ClothingItem } from "../types";

export const DiscountPage: React.FC = () => {
  const { items } = useApp();
  const [selectedTier, setSelectedTier] = useState<string>("All");

  // All sale or discount items
  const deals = useMemo(() => {
    return items.filter(
      (item) => item.isSale || (item.discountPercentage && item.discountPercentage > 0) || item.badge === "sale"
    );
  }, [items]);

  const discountSortOptions: SortOption[] = [
    { label: "Highest Discount %", value: "discount-desc" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Top Rated", value: "rating" },
    { label: "Bestsellers", value: "bestseller" },
  ];

  return (
    <CatalogBrowser
      items={deals}
      countLabel="special offers"
      searchPlaceholder="Search deals, silhouettes, SKU..."
      defaultSortKey="discount-desc"
      sortOptions={discountSortOptions}
      showSaleToggle={false}
      showNewToggle={true}
      customFilter={(item: ClothingItem) => {
        const pct = item.discountPercentage || 0;
        if (selectedTier === "25" && pct < 25) return false;
        if (selectedTier === "20" && (pct < 20 || pct >= 25)) return false;
        return true;
      }}
      customSort={(a: ClothingItem, b: ClothingItem, sortKey: string) => {
        if (sortKey === "discount-desc") {
          return (b.discountPercentage || 0) - (a.discountPercentage || 0);
        }
        return 0;
      }}
      extraFilterSection={({ setCurrentPage }) => (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center justify-between">
            <span>Discount Tier</span>
            <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.2 rounded font-black">
              SAVINGS
            </span>
          </label>
          <div className="grid grid-cols-1 gap-1">
            {[
              { id: "All", label: "All Special Offers", desc: "Up to 25% Off" },
              { id: "25", label: "25%+ Archival Tier", desc: "Max savings" },
              { id: "20", label: "20% - 24% Atelier Tier", desc: "Seasonal specials" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTier(t.id);
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                  selectedTier === t.id
                    ? "bg-rose-50 text-rose-900 font-black border border-rose-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div>
                  <span className="block">{t.label}</span>
                  <span className="text-[9px] text-gray-400 font-normal block">{t.desc}</span>
                </div>
                {selectedTier === t.id && (
                  <Icon name="check" size={13} className="text-rose-700" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      extraActivePills={({ setCurrentPage }) =>
        selectedTier !== "All" ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-rose-50 text-rose-800 font-bold rounded-full border border-rose-200">
            <span>Tier: {selectedTier === "25" ? "25%+ Off" : "20%-24% Off"}</span>
            <button
              onClick={() => {
                setSelectedTier("All");
                setCurrentPage(1);
              }}
              className="hover:text-rose-900"
            >
              ✕
            </button>
          </span>
        ) : null
      }
      emptyTitle="No matching special offers found"
      emptyDescription="We could not find any special promotions matching your selected filters. Try broadening your criteria or resetting filters."
      heroSection={({ setCurrentPage }) => (
        <section className="relative overflow-hidden bg-gradient-to-r from-[#123d32] via-[#1a4a3e] to-rose-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-14 shadow-2xl border border-rose-900/40">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-rose-600/30 border border-rose-400/40 text-rose-200 text-[10px] sm:text-xs font-black uppercase tracking-wider flex-wrap">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>DOQA ATELIER • DEALS & SPECIAL OFFERS</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">UP TO 25% OFF ARCHIVAL PIECES</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Exclusive Deals & Archival Specials
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-rose-100/80 max-w-2xl leading-relaxed font-light">
              Limited-inventory bespoke tuxedos, bias-cut silk gowns, and structured crepe jackets available at private seasonal pricing. All pieces include full luxury packaging and complimentary doorstep returns.
            </p>

            {/* Quick discount tier filters */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedTier("All");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  selectedTier === "All"
                    ? "bg-white text-gray-950 shadow-md font-black"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                All Specials ({deals.length})
              </button>
              <button
                onClick={() => {
                  setSelectedTier("25");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  selectedTier === "25"
                    ? "bg-rose-600 text-white shadow-md font-black"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                25%+ Off Tier
              </button>
              <button
                onClick={() => {
                  setSelectedTier("20");
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  selectedTier === "20"
                    ? "bg-rose-600 text-white shadow-md font-black"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                20% - 24% Off Tier
              </button>
              <Link
                to="/"
                className="px-3 py-1.5 sm:py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors shadow-sm ml-auto sm:ml-0"
              >
                ← Back to Catalog
              </Link>
            </div>
          </div>

          {/* Ambient Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        </section>
      )}
    />
  );
};

export default DiscountPage;
