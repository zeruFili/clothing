import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClothingItem } from "../types";
import { useApp } from "../context/AppContext";
import Icon from "./Icons";

interface ProductCardProps {
  item: ClothingItem;
  viewMode?: "grid" | "list";
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, viewMode = "grid" }) => {
  const navigate = useNavigate();
  const {
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    openQuickView,
  } = useApp();

  const isWishlisted = wishlist.includes(item.id);
  const isAvailable = item.stockQuantity > 0;
  const isLowStock = isAvailable && item.stockQuantity <= 5;
  const hasSpecialOffer = Boolean(item.isSale || (item.discountPercentage && item.discountPercentage > 0));

  // Navigate to product detail page on card click
  const handleCardClick = (e: React.MouseEvent) => {
    // If the click originated from an interactive element like a button, let the button handle it
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("select")
    ) {
      return;
    }

    navigate(`/product/${item.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/product/${item.id}`);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addToCart(item, item.sizes[0], item.colors[0], 1);
  };

  const handleClaimOffer = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAvailable) return;
    addToCart(item, item.sizes[0], item.colors[0], 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(item);
  };

  if (viewMode === "list") {
    return (
      <article
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${item.name}`}
        className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-emerald-300/70 transition-all duration-300 flex flex-col md:flex-row group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#123d32]/30"
      >
        {/* Media Thumbnail */}
        <div className="relative md:w-72 lg:w-80 aspect-4/3 md:aspect-3/4 shrink-0 overflow-hidden bg-gray-100">
          <Link
            to={`/product/${item.id}`}
            className="block w-full h-full"
            tabIndex={-1}
            aria-hidden="true"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none max-w-[65%]">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-gray-800 px-2.5 py-0.8 rounded-full border border-gray-200 shadow-2xs truncate self-start">
              {item.category}
            </span>
            {hasSpecialOffer && item.discountPercentage && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-md animate-pulse border border-rose-500/80 self-start">
                <Icon name="tag" size={11} className="text-amber-300" />
                <span>SAVE {item.discountPercentage}%</span>
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={handleWishlistClick}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:text-rose-600 transition-colors shadow-xs"
              title="Add to Wishlist"
              aria-label="Add to Wishlist"
            >
              <Icon
                name="heart"
                size={16}
                className={isWishlisted ? "text-rose-600 fill-rose-600" : ""}
              />
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-emerald-800 uppercase tracking-wider">
                {item.designer} • {item.silhouette}
              </span>
              <span className="font-mono text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {item.code}
              </span>
            </div>

            <Link
              to={`/product/${item.id}`}
              className="font-display font-black text-lg sm:text-xl text-gray-950 group-hover:text-emerald-950 transition-colors block"
            >
              {item.name}
            </Link>

            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-500 pt-1 flex-wrap">
              <span>
                <strong>Composition:</strong> {item.fabric}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Icon name="star" size={13} fill="currentColor" />
                {item.rating} ({item.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
              <span className="text-xl sm:text-2xl font-black text-[#123d32] font-display">
                {formatPrice(item.price)}
              </span>
              {item.compareAtPrice && (
                <span className="text-xs sm:text-sm font-semibold text-gray-400 line-through">
                  {formatPrice(item.compareAtPrice)}
                </span>
              )}
              {hasSpecialOffer && item.discountPercentage && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Save {item.discountPercentage}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleQuickViewClick}
                className="px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors"
                title="Quick preview"
              >
                <Icon name="eye" size={14} />
                <span>Quick View</span>
              </button>

              {hasSpecialOffer ? (
                <button
                  disabled={!isAvailable}
                  onClick={handleClaimOffer}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-gray-300 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-98"
                  title="Claim Special Offer"
                >
                  <Icon name="tag" size={14} className="text-amber-300" />
                  <span>Claim Special Offer</span>
                </button>
              ) : (
                <button
                  disabled={!isAvailable}
                  onClick={handleQuickAdd}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-[#123d32] hover:bg-[#0d2d25] disabled:bg-gray-300 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-98"
                  title="Add to Shopping Bag"
                >
                  <Icon name="bag" size={14} className="text-amber-300" />
                  <span>Add to Bag</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default: Grid Card
  return (
    <article
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.name}`}
      className="h-full bg-white rounded-2xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-xl hover:border-emerald-300/70 transition-all duration-300 flex flex-col group relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#123d32]/30"
    >
      {/* Media Image Showcase */}
      <div className="relative aspect-3/4 bg-gray-100 overflow-hidden block">
        <Link
          to={`/product/${item.id}`}
          className="block w-full h-full"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 flex flex-col gap-1.5 z-10 pointer-events-none max-w-[65%]">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-gray-900 px-2.5 py-0.5 sm:py-0.8 rounded-full border border-gray-200 shadow-2xs self-start truncate">
            {item.category.split("&")[0].trim()}
          </span>

          {hasSpecialOffer && item.discountPercentage && (
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md animate-pulse border border-rose-500/80 self-start">
              <Icon name="tag" size={11} className="text-amber-300" />
              <span>SAVE {item.discountPercentage}%</span>
            </span>
          )}

          {item.badge === "exclusive" && (
            <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-[#123d32] text-amber-300 px-2 sm:px-2.5 py-0.5 sm:py-0.8 rounded-full shadow-xs self-start">
              Haute Edition
            </span>
          )}
        </div>

        {/* Top Right Stock Badge & Wishlist Action */}
        <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 flex flex-col items-end gap-2 z-10">
          <span
            className={`text-[9px] sm:text-[10px] font-extrabold uppercase px-2 sm:px-2.5 py-0.5 rounded-full border shadow-2xs pointer-events-none ${
              isAvailable
                ? isLowStock
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-emerald-50 text-emerald-900 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            {isAvailable
              ? isLowStock
                ? `Only ${item.stockQuantity} Left`
                : "In Stock"
              : "Sold Out"}
          </span>

          <button
            onClick={handleWishlistClick}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:text-rose-600 transition-colors shadow-xs"
            title="Save to Wishlist"
            aria-label="Save to Wishlist"
          >
            <Icon
              name="heart"
              size={15}
              className={isWishlisted ? "text-rose-600 fill-rose-600" : ""}
            />
          </button>
        </div>

        {/* Hover Quick Action Trigger Pills */}
        <div className="absolute inset-x-2.5 sm:inset-x-3 bottom-2.5 sm:bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 flex gap-2">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-1.5 sm:py-2 bg-white/95 hover:bg-white text-gray-900 text-xs font-bold rounded-xl shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Icon name="eye" size={14} className="text-emerald-800" />
            <span>Quick View</span>
          </button>

          {hasSpecialOffer ? (
            <button
              disabled={!isAvailable}
              onClick={handleClaimOffer}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1 transition-colors active:scale-95"
              title="Claim Special Offer"
            >
              <Icon name="tag" size={13} className="text-amber-300" />
              <span className="hidden sm:inline">Claim</span>
            </button>
          ) : (
            <button
              disabled={!isAvailable}
              onClick={handleQuickAdd}
              className="px-3 sm:px-3.5 py-1.5 sm:py-2 bg-[#123d32] hover:bg-[#0e2c24] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1 transition-colors active:scale-95"
              title="Add to Shopping Bag"
            >
              <Icon name="bag" size={13} className="text-amber-300" />
              <span className="hidden sm:inline">Add</span>
            </button>
          )}
        </div>

        {/* Location Depot Tag */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none">
          <span className="text-[9px] font-semibold bg-[#123d32]/90 text-white px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
            <Icon name="mapPin" size={9} />
            {item.boutiqueLocation.split(" ")[0]}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
            <span className="truncate text-emerald-800 font-bold uppercase tracking-wider">
              {item.designer}
            </span>
            <span className="font-mono text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
              {item.code}
            </span>
          </div>

          <Link
            to={`/product/${item.id}`}
            className="text-sm sm:text-base font-bold text-gray-950 group-hover:text-emerald-950 transition-colors line-clamp-1 font-display block leading-snug"
          >
            {item.name}
          </Link>

          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {item.subtitle}
          </p>

          {/* Color Swatch Dots & Available Sizes */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              {item.colors.slice(0, 3).map((col) => (
                <span
                  key={col.name}
                  className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full border border-gray-300 shadow-2xs block"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {item.colors.length > 3 && (
                <span className="text-[9px] text-gray-400 font-bold pl-0.5">
                  +{item.colors.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
              {item.sizes.slice(0, 4).join(" • ")}
            </div>
          </div>
        </div>

        {/* Pricing Matrix & Call-to-action */}
        <div className="pt-2.5 sm:pt-3 border-t border-gray-100 space-y-2 sm:space-y-2.5">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
              <strong className="text-lg sm:text-2xl font-black text-[#123d32] font-display">
                {formatPrice(item.price)}
              </strong>
              {item.compareAtPrice && (
                <span className="text-xs sm:text-sm font-semibold text-gray-400 line-through">
                  {formatPrice(item.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-[9px] sm:text-[10px] text-emerald-800 font-bold">
                Free Shipping
              </span>
            </div>
          </div>

          {/* Direct CTA Button: "Claim Special Offer" (when on sale) or "Add to Bag" */}
          {hasSpecialOffer ? (
            <button
              disabled={!isAvailable}
              onClick={handleClaimOffer}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-98 disabled:opacity-50"
              title="Claim Special Offer"
            >
              <Icon name="tag" size={13} className="text-amber-300" />
              <span>{isAvailable ? "Claim Special Offer" : "Offer Expired"}</span>
            </button>
          ) : (
            <button
              disabled={!isAvailable}
              onClick={handleQuickAdd}
              className="w-full py-2.5 bg-emerald-50 hover:bg-[#123d32] text-[#123d32] hover:text-white border border-emerald-200/80 hover:border-[#123d32] rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 group/btn disabled:opacity-50 active:scale-98"
              title="Add to Shopping Bag"
            >
              <Icon
                name="bag"
                size={13}
                className="text-emerald-700 group-hover/btn:text-amber-300"
              />
              <span>{isAvailable ? "Add to Bag" : "Currently Sold Out"}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
