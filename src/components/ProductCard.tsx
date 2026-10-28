import React from "react";
import { Link } from "react-router-dom";
import { ClothingItem } from "../types";
import { useApp } from "../context/AppContext";
import Icon from "./Icons";

interface ProductCardProps {
  item: ClothingItem;
  viewMode?: "grid" | "list";
}

export const ProductCard: React.FC<ProductCardProps> = ({ item, viewMode = "grid" }) => {
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

  const handleQuickAdd = (e: React.MouseEvent) => {
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
      <article className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group">
        {/* Media Thumbnail */}
        <div className="relative md:w-72 lg:w-80 aspect-4/3 md:aspect-3/4 shrink-0 overflow-hidden bg-gray-100">
          <Link to={`/product/${item.id}`} className="block w-full h-full">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-gray-800 px-2.5 py-0.8 rounded-full border border-gray-200 shadow-2xs">
              {item.category}
            </span>
            {item.isSale && item.discountPercentage && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-md animate-pulse border border-rose-500/80">
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
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
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
              className="font-display font-black text-xl text-gray-950 group-hover:text-emerald-950 transition-colors block"
            >
              {item.name}
            </Link>

            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
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

          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-[#123d32] font-display">
                {formatPrice(item.price)}
              </span>
              {item.compareAtPrice && (
                <span className="text-sm font-semibold text-gray-400 line-through">
                  {formatPrice(item.compareAtPrice)}
                </span>
              )}
              {item.isSale && (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                  Save {item.discountPercentage}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleQuickViewClick}
                className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 flex items-center gap-1.5 transition-colors"
              >
                <Icon name="eye" size={14} />
                <span>Quick View</span>
              </button>
              <button
                disabled={!isAvailable}
                onClick={handleQuickAdd}
                className="px-5 py-2.5 bg-[#123d32] hover:bg-[#0e2c24] disabled:bg-gray-300 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <Icon name="bag" size={14} className="text-amber-300" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default: Grid Card
  return (
    <article className="h-full bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col group relative">
      {/* Media Image Showcase */}
      <Link
        to={`/product/${item.id}`}
        className="relative aspect-3/4 bg-gray-100 overflow-hidden block"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-gray-900 px-2.5 py-0.8 rounded-full border border-gray-200 shadow-2xs self-start">
            {item.category.split("&")[0].trim()}
          </span>

          {item.isSale && item.discountPercentage && (
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-1 rounded-full shadow-md animate-pulse border border-rose-500/80 self-start">
              <Icon name="tag" size={11} className="text-amber-300" />
              <span>SAVE {item.discountPercentage}%</span>
            </span>
          )}

          {item.badge === "exclusive" && (
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#123d32] text-amber-300 px-2.5 py-0.8 rounded-full shadow-xs self-start">
              Haute Edition
            </span>
          )}
        </div>

        {/* Top Right Stock Badge & Wishlist Action */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
          <span
            className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border shadow-2xs ${
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
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-700 hover:text-rose-600 transition-colors shadow-xs"
            title="Save to Wishlist"
          >
            <Icon
              name="heart"
              size={15}
              className={isWishlisted ? "text-rose-600 fill-rose-600" : ""}
            />
          </button>
        </div>

        {/* Hover Quick View Trigger Pill */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10 flex gap-2">
          <button
            onClick={handleQuickViewClick}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-gray-900 text-xs font-bold rounded-xl shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Icon name="eye" size={14} className="text-emerald-800" />
            <span>Quick View</span>
          </button>
          <button
            disabled={!isAvailable}
            onClick={handleQuickAdd}
            className="px-3.5 py-2 bg-[#123d32] hover:bg-[#0e2c24] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1 transition-colors"
            title="Add to Shopping Bag"
          >
            <Icon name="bag" size={13} className="text-amber-300" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Location Depot Tag */}
        <div className="absolute bottom-3 left-3 opacity-100 group-hover:opacity-0 transition-opacity">
          <span className="text-[9px] font-semibold bg-[#123d32]/90 text-white px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
            <Icon name="mapPin" size={9} />
            {item.boutiqueLocation.split(" ")[0]}
          </span>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
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
                  className="w-3.5 h-3.5 rounded-full border border-gray-300 shadow-2xs block"
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
        <div className="pt-3 border-t border-gray-100 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <strong className="text-xl sm:text-2xl font-black text-[#123d32] font-display">
                {formatPrice(item.price)}
              </strong>
              {item.compareAtPrice && (
                <span className="text-xs sm:text-sm font-semibold text-gray-400 line-through">
                  {formatPrice(item.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-800 font-bold">
                Free Express Shipping
              </span>
            </div>
          </div>

          {/* Direct Add to Bag Button */}
          <button
            disabled={!isAvailable}
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-emerald-50 hover:bg-[#123d32] text-[#123d32] hover:text-white border border-emerald-200/80 hover:border-[#123d32] rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 group/btn disabled:opacity-50"
          >
            <Icon
              name="bag"
              size={13}
              className="text-emerald-700 group-hover/btn:text-amber-300"
            />
            <span>{isAvailable ? "Add to Shopping Bag" : "Currently Sold Out"}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
