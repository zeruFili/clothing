import React from "react";
import { useApp } from "../context/AppContext";
import CatalogBrowser from "./CatalogBrowser";
import Icon from "./Icons";

export const ShopPage: React.FC = () => {
  const { items } = useApp();

  return (
    <CatalogBrowser
      items={items}
      countLabel="matching pieces"
      searchPlaceholder="Search silhouettes, designers, SKU..."
      heroSection={({ setSelectedCategory, setSelectedOccasion, setSaleOnly }) => (
        <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#123d32] via-[#1a4a3e] to-[#0e3027] text-white p-5 sm:p-10 md:p-14 shadow-2xl border border-emerald-800/40">
          <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <Icon name="spark" size={13} className="text-amber-400 shrink-0" />
              <span>Autumn / Winter 2026 Collection</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Complimentary Worldwide Shipping</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Curated Haute Couture & Ready-to-Wear
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-emerald-100/85 leading-relaxed max-w-2xl font-light">
              Sovereign runway silhouettes, archival evening gowns, Italian virgin wool tuxedos, and pure Mongolian cashmere coats. Every piece is crafted in limited batches, inspected by master tailors, and delivered in custom wooden presentation boxes.
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
                <span>Evening Gowns</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Tailored Suits & Tuxedos");
                  setSelectedOccasion("All");
                }}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>🤵</span>
                <span>Suits & Tuxedos</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Cashmere Coats & Capes");
                  setSelectedOccasion("All");
                }}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>🧥</span>
                <span>Cashmere Coats</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory("Silk Blouses & Shirts");
                  setSelectedOccasion("All");
                }}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-emerald-900/60 hover:bg-emerald-900 border border-emerald-500/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>👚</span>
                <span>Silk Blouses</span>
              </button>
              <button
                onClick={() => setSaleOnly(true)}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-rose-600/80 hover:bg-rose-600 border border-rose-400/40 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
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
      )}
    />
  );
};

export default ShopPage;
