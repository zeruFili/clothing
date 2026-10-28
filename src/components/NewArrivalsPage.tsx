import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "./ProductCard";

export const NewArrivalsPage: React.FC = () => {
  const { items } = useApp();

  // Filter or sort by newest items
  const newArrivals = items
    .filter((i) => i.isNewArrival || i.badge === "new" || new Date(i.createdAt).getTime() >= new Date("2026-02-01").getTime())
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const displayList = newArrivals.length > 0 ? newArrivals : items.slice(0, 8);

  return (
    <div className="space-y-6 sm:space-y-8 pb-16">
      {/* Page Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#123d32] via-[#1a4a3e] to-[#0e3027] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-12 shadow-xl border border-emerald-800/40">
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/30 inline-block backdrop-blur-xs">
            ✨ Haute Nouveautés 2026
          </span>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
            New Arrivals & Haute Additions
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed font-light">
            Explore our latest sartorial silhouettes, freshly tailored double-faced cashmere coats, fluid mulberry silk evening gowns, and hand-hammered accessories direct from European workshops.
          </p>
        </div>

        {/* Ambient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      </div>

      {/* Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-semibold text-gray-500 pb-2 border-b border-gray-200 gap-1.5">
        <span>
          Showing <strong className="text-gray-900">{displayList.length}</strong> new season additions
        </span>
        <Link to="/" className="text-[#123d32] hover:underline font-bold self-start sm:self-auto">
          ← Return to Full Shop Catalog
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
        {displayList.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsPage;
