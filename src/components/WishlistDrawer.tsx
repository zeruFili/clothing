import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Icon from "./Icons";

export const WishlistDrawer: React.FC = () => {
  const {
    items,
    wishlist,
    isWishlistOpen,
    closeWishlist,
    toggleWishlist,
    addToCart,
    formatPrice,
  } = useApp();

  if (!isWishlistOpen) return null;

  const wishlistedItems = items.filter((i) => wishlist.includes(i.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-fade-in flex justify-end">
      {/* Background click to close */}
      <div className="fixed inset-0" onClick={closeWishlist} />

      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-drawer-in z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs border border-rose-200 shrink-0">
              <Icon name="heart" size={15} fill="currentColor" />
            </div>
            <div>
              <h2 className="font-display font-black text-sm sm:text-base text-gray-950">
                Saved to Wishlist
              </h2>
              <span className="text-[10px] text-gray-500 font-semibold block">
                {wishlistedItems.length} Pieces Saved
              </span>
            </div>
          </div>

          <button
            onClick={closeWishlist}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Close wishlist"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Content */}
        {wishlistedItems.length === 0 ? (
          <div className="p-6 sm:p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
              <Icon name="heart" size={28} />
            </div>
            <h3 className="font-display font-black text-xl text-gray-900">
              No Pieces Saved Yet
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Click the heart icon on any gown, tuxedo, or coat to save it to your wishlist.
            </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3">
            {wishlistedItems.map((item) => (
              <div
                key={item.id}
                className="p-3 sm:p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex gap-3 relative group"
              >
                <Link
                  to={`/product/${item.id}`}
                  onClick={closeWishlist}
                  className="w-16 h-20 rounded-xl overflow-hidden bg-gray-200 shrink-0 block"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </Link>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block truncate">
                      {item.designer}
                    </span>
                    <button
                      onClick={() => toggleWishlist(item.id)}
                      className="text-gray-400 hover:text-rose-600 transition-colors p-0.5"
                      title="Remove from wishlist"
                    >
                      ✕
                    </button>
                  </div>

                  <Link
                    to={`/product/${item.id}`}
                    onClick={closeWishlist}
                    className="text-xs font-black text-gray-900 hover:text-emerald-950 block truncate"
                  >
                    {item.name}
                  </Link>

                  <div className="flex items-baseline justify-between pt-1">
                    <strong className="text-xs sm:text-sm font-black text-[#123d32] font-display">
                      {formatPrice(item.price)}
                    </strong>
                    {item.compareAtPrice && (
                      <span className="text-[10px] font-semibold text-gray-400 line-through">
                        {formatPrice(item.compareAtPrice)}
                      </span>
                    )}
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      disabled={item.stockQuantity <= 0}
                      onClick={() => {
                        addToCart(item, item.sizes[0], item.colors[0], 1);
                        toggleWishlist(item.id);
                      }}
                      className="flex-1 py-1.5 px-2 bg-[#123d32] hover:bg-[#0e2c24] disabled:bg-gray-300 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1 active:scale-98"
                    >
                      <Icon name="bag" size={13} className="text-amber-300" />
                      <span>{item.stockQuantity > 0 ? "Move to Bag" : "Sold Out"}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {wishlistedItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-200 bg-white space-y-2 shrink-0">
            <button
              onClick={() => {
                wishlistedItems.forEach((item) => {
                  if (item.stockQuantity > 0) {
                    addToCart(item, item.sizes[0], item.colors[0], 1);
                  }
                });
                closeWishlist();
              }}
              className="w-full py-3 sm:py-3.5 bg-emerald-50 hover:bg-[#123d32] text-[#123d32] hover:text-white border border-emerald-200 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Add All Available to Bag
            </button>
            <p className="text-[10px] text-gray-400 text-center">
              Pieces in wishlist are reserved for 48 hours for Atelier members.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
