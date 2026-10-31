import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import CatalogBrowser from "./CatalogBrowser";
import Icon from "./Icons";
import { ClothingItem } from "../types";

export const NewArrivalsPage: React.FC = () => {
  const { items } = useApp();

  // Filter or sort by newest items
  const newArrivals = useMemo(() => {
    const list = items.filter(
      (i) =>
        i.isNewArrival ||
        i.badge === "new" ||
        new Date(i.createdAt).getTime() >= new Date("2026-02-01").getTime()
    );
    return list.length > 0 ? list : items.slice(0, 8);
  }, [items]);

  return (
    <CatalogBrowser
      items={newArrivals}
      countLabel="new season additions"
      searchPlaceholder="Search new arrivals, silhouettes, SKU..."
      defaultSortKey="featured"
      showNewToggle={false}
      showSaleToggle={true}
      customSort={(a: ClothingItem, b: ClothingItem, sortKey: string) => {
        if (sortKey === "featured") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      }}
      emptyTitle="No matching new arrivals found"
      emptyDescription="We could not find any new arrivals matching your selected criteria. Try adjusting your filters, price range, or search term."
      heroSection={({ setSelectedCategory, setSelectedOccasion }) => (
        <section className="relative overflow-hidden bg-gradient-to-r from-[#123d32] via-[#1a4a3e] to-[#0e3027] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-14 shadow-2xl border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Icon name="spark" size={13} className="text-amber-400 shrink-0" />
              <span>✨ Haute Nouveautés 2026 Collection</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Fresh From Milan & Paris Ateliers</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              New Arrivals & Haute Additions
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-emerald-100/85 leading-relaxed max-w-2xl font-light">
              Explore our latest sartorial silhouettes, freshly tailored double-faced cashmere coats, fluid mulberry silk evening gowns, and hand-hammered accessories direct from European workshops.
            </p>

            {/* Quick Filter Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory("Evening Gowns & Gala Dresses");
                  setSelectedOccasion("All");
                }}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-white text-emerald-950 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>👗</span>
                <span>New Gowns</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Tailored Suits & Tuxedos");
                  setSelectedOccasion("All");
                }}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>🤵</span>
                <span>New Suits</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Cashmere Coats & Capes");
                  setSelectedOccasion("All");
                }}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>🧥</span>
                <span>New Cashmere</span>
              </button>
              <Link
                to="/"
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-amber-400 text-emerald-950 rounded-xl text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Explore All Catalog →</span>
              </Link>
            </div>
          </div>

          {/* Ambient Grid Overlay & Glow */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        </section>
      )}
    />
  );
};

export default NewArrivalsPage;
