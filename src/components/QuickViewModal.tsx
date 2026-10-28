import React, { useState } from "react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-950 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <Icon name="close" size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media image */}
          <div className="relative aspect-3/4 md:aspect-auto bg-gray-100 overflow-hidden">
            <img
              src={quickViewItem.imageUrl}
              alt={quickViewItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 px-2.5 py-0.5 rounded-full border border-gray-200">
                {quickViewItem.category.split("&")[0].trim()}
              </span>
            </div>
          </div>

          {/* Details & Actions */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold">
                <span className="text-emerald-800 uppercase tracking-wider font-bold">
                  {quickViewItem.designer}
                </span>
                <span className="font-mono text-[10px] bg-gray-100 px-2 py-0.5 rounded">
                  {quickViewItem.code}
                </span>
              </div>

              <h3 className="text-xl font-black font-display text-gray-950 leading-tight">
                {quickViewItem.name}
              </h3>

              <p className="text-xs text-gray-600 leading-relaxed">
                {quickViewItem.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 pt-2">
                <strong className="text-2xl font-black text-[#123d32] font-display">
                  {formatPrice(quickViewItem.price)}
                </strong>
                {quickViewItem.compareAtPrice && (
                  <span className="text-sm font-semibold text-gray-400 line-through">
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
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
                <div className="flex gap-2">
                  {quickViewItem.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full border-2 ${
                        currentColor.name === c.name
                          ? "border-[#123d32] scale-110"
                          : "border-gray-300"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-gray-700 block mb-1">
                  Quantity
                </span>
                <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-2.5 py-1 w-max">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-gray-600 hover:text-gray-950 font-bold px-1.5"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-gray-900 w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(quickViewItem.stockQuantity, q + 1))}
                    className="text-gray-600 hover:text-gray-950 font-bold px-1.5"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-3 border-t border-gray-100">
              <button
                disabled={!isAvailable}
                onClick={handleAdd}
                className="w-full py-3 bg-[#123d32] hover:bg-[#0e2c24] disabled:bg-gray-300 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Icon name="bag" size={14} className="text-amber-300" />
                <span>
                  Add to Shopping Bag • {formatPrice(quickViewItem.price * quantity)}
                </span>
              </button>

              <Link
                to={`/product/${quickViewItem.id}`}
                onClick={closeQuickView}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold text-center block transition-colors"
              >
                View Full Product Details & Sizing →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
