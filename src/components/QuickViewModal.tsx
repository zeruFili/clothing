import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Icon from "./Icons";
import { ColorSwatch } from "../types";

export const QuickViewModal: React.FC = () => {
  const { quickViewItem, closeQuickView, addToCart, formatPrice } = useApp();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  if (!quickViewItem) return null;

  const currentSize = selectedSize || quickViewItem.sizes[0];
  const currentColor = selectedColor || quickViewItem.colors[0];
  const isAvailable = quickViewItem.stockQuantity > 0;

  const handleAdd = () => {
    addToCart(quickViewItem, currentSize, currentColor, quantity);
    closeQuickView();
  };

  return typeof document !== "undefined"
    ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-scale-up max-h-[92vh] flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-950 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <Icon name="close" size={17} />
        </button>

        {/* Media image */}
        <div className="relative h-64 sm:h-80 md:h-auto md:w-1/2 bg-gray-100 overflow-hidden shrink-0">
          <img
            src={quickViewItem.imageUrl}
            alt={quickViewItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 px-2.5 py-0.5 rounded-full border border-gray-200 shadow-2xs">
              {quickViewItem.category.split("&")[0].trim()}
            </span>
          </div>
        </div>

        {/* Details & Actions */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4 md:max-h-[85vh] md:overflow-y-auto">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
              <span className="text-emerald-800 uppercase tracking-wider font-bold">
                {quickViewItem.designer}
              </span>
              <span className="font-mono text-[10px] bg-gray-100 px-2 py-0.5 rounded">
                {quickViewItem.code}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black font-display text-gray-950 leading-tight">
              {quickViewItem.name}
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              {quickViewItem.subtitle}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2.5 pt-1 sm:pt-2">
              <strong className="text-xl sm:text-2xl font-black text-[#123d32] font-display">
                {formatPrice(quickViewItem.price)}
              </strong>
              {quickViewItem.compareAtPrice && (
                <span className="text-xs sm:text-sm font-semibold text-gray-400 line-through">
                  {formatPrice(quickViewItem.compareAtPrice)}
                </span>
              )}
              {quickViewItem.isSale && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Save {quickViewItem.discountPercentage}%
                </span>
              )}
            </div>

            {/* Size Selector */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-gray-700 block mb-1">
                Size: <strong>{currentSize}</strong>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickViewItem.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-9 h-8 px-2.5 rounded-lg text-xs font-bold border transition-all ${
                      currentSize === sz
                        ? "bg-[#123d32] text-white border-[#123d32]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-gray-700 block mb-1">
                Color: <strong>{currentColor.name}</strong>
              </span>
              <div className="flex items-center gap-2">
                {quickViewItem.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      currentColor.name === col.name
                        ? "border-[#123d32] ring-2 ring-[#123d32]/30 scale-110"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-700">Quantity</span>
              <div className="flex items-center bg-gray-100 border border-gray-200 rounded-xl px-2 py-0.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 text-gray-500 font-bold"
                >
                  -
                </button>
                <span className="w-6 text-center font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(quickViewItem.stockQuantity, q + 1))
                  }
                  className="px-2 text-gray-500 font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <button
              disabled={!isAvailable}
              onClick={handleAdd}
              className="w-full py-3 bg-[#123d32] hover:bg-[#0e2c24] disabled:bg-gray-300 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
            >
              <Icon name="bag" size={15} className="text-amber-300" />
              <span>
                {isAvailable
                  ? `Add to Bag • ${formatPrice(quickViewItem.price * quantity)}`
                  : "Currently Sold Out"}
              </span>
            </button>

            <Link
              to={`/product/${quickViewItem.id}`}
              onClick={closeQuickView}
              className="block text-center text-xs text-emerald-800 hover:underline font-bold py-1"
            >
              View Full Atelier Specifications & Craftsmanship Details →
            </Link>
          </div>
        </div>
        </div>
      </div>,
      document.body
    )
  : null;
};

export default QuickViewModal;
