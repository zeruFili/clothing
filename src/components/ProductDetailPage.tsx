import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Icon from "./Icons";
import ProductCard from "./ProductCard";
import { ColorSwatch } from "../types";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    items,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
    openSizeGuide,
  } = useApp();

  const item = items.find((i) => i.id === id);

  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [activeTab, setActiveTab] = useState<
    "fabric" | "fit" | "shipping" | "boutiques"
  >("fabric");

  if (!item) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-2xl flex items-center justify-center mx-auto">
          <Icon name="alert" size={32} />
        </div>
        <h2 className="text-2xl font-black font-display text-gray-900">
          Garment Not Found
        </h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          The requested designer piece could not be located in our active ready-to-wear collection.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2.5 bg-[#123d32] text-white rounded-xl text-xs font-bold hover:bg-[#0e2c24] transition-colors"
        >
          ← Return to Haute Collection
        </Link>
      </div>
    );
  }

  const currentSize = selectedSize || item.sizes[0];
  const currentColor = selectedColor || item.colors[0];
  const isWishlisted = wishlist.includes(item.id);
  const isAvailable = item.stockQuantity > 0;
  const isLowStock = isAvailable && item.stockQuantity <= 5;

  const galleryImages = item.images && item.images.length > 0 ? item.images : [item.imageUrl];

  // Related items
  const relatedItems = items
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    if (!isAvailable) return;
    addToCart(item, currentSize, currentColor, quantity);
  };

  const handleBuyNow = () => {
    if (!isAvailable) return;
    addToCart(item, currentSize, currentColor, quantity);
    // User is automatically opened into the CartDrawer with items ready to check out
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Breadcrumb Navigation */}
      <nav
        className="flex items-center gap-2 text-xs text-gray-500 font-semibold"
        aria-label="Breadcrumb"
      >
        <Link to="/" className="hover:text-emerald-950 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          to={`/?cat=${encodeURIComponent(item.category)}`}
          className="hover:text-emerald-950 transition-colors truncate"
        >
          {item.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold truncate">{item.name}</span>
      </nav>

      {/* Main Dual-Column Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-start">
        {/* Left Column: Gallery & Boutique Summary */}
        <div className="space-y-5">
          {/* Main Visual Display */}
          <div className="relative aspect-3/4 rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 shadow-lg group">
            <img
              src={galleryImages[activeImageIdx]}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
            />

            {/* Badges on Gallery */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              <span className="px-3.5 py-1 bg-white/95 backdrop-blur-xs font-bold text-xs uppercase tracking-wider text-gray-900 rounded-full border border-gray-200 shadow-xs self-start">
                {item.category}
              </span>
              {item.isSale && item.discountPercentage && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 text-white font-black text-xs uppercase tracking-wider rounded-full shadow-md animate-pulse border border-rose-500/80 self-start">
                  <Icon name="tag" size={12} className="text-amber-300" />
                  <span>SAVE {item.discountPercentage}%</span>
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4 z-10">
              <span
                className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border shadow-sm ${
                  isAvailable
                    ? isLowStock
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-emerald-50 text-emerald-900 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                {isAvailable
                  ? isLowStock
                    ? `Only ${item.stockQuantity} Left in Stock`
                    : "In Stock & Ready to Ship"
                  : "Currently Sold Out"}
              </span>
            </div>

            {/* Zoom / Full Preview indicator */}
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
              {activeImageIdx + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 sm:w-24 aspect-3/4 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx
                      ? "border-[#123d32] ring-2 ring-[#123d32]/20 scale-102"
                      : "border-gray-200 hover:border-gray-400 opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="Angle thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Boutique Origin & Craftsmanship Summary Box (Doqa Signature) */}
          <div className="p-5 bg-white rounded-3xl border border-gray-200 shadow-2xs grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Origin Flagship
              </span>
              <strong className="text-gray-900 block truncate mt-0.5">
                {item.boutiqueLocation}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Certificate
              </span>
              <strong className="text-gray-900 block mt-0.5">
                Haute Authenticity
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Fabric Grade
              </span>
              <strong className="text-emerald-800 font-bold block mt-0.5 truncate">
                {item.fabric.split(" ")[0]} 6A Certified
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Atelier SKU
              </span>
              <strong className="text-gray-700 block mt-0.5 font-mono text-[11px]">
                {item.code}
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Packaging
              </span>
              <strong className="text-gray-900 block mt-0.5">
                Wooden Gift Box
              </strong>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                Dispatch Valet
              </span>
              <strong className="text-emerald-800 font-semibold block mt-0.5">
                Same-Day Available
              </strong>
            </div>
          </div>
        </div>

        {/* Right Column: Pricing, Options & Purchasing Flow */}
        <div className="space-y-6">
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
              <span>{item.designer}</span>
              <span>•</span>
              <span>{item.silhouette}</span>
              <span>•</span>
              <span className="font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-[10px]">
                {item.code}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-gray-950 tracking-tight leading-tight">
              {item.name}
            </h1>

            <p className="text-xs sm:text-sm font-semibold text-emerald-950/70">
              {item.subtitle}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Icon name="star" size={15} fill="currentColor" />
                <span>{item.rating}</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500 underline cursor-pointer">
                {item.reviewCount} customer reviews
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-emerald-800 font-semibold">
                Complimentary Bespoke Alterations
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
              {item.description}
            </p>
          </div>

          {/* Purchasing Box */}
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-2xs space-y-6">
            {/* Price Showcase */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-baseline gap-3">
                <strong className="text-3xl sm:text-4xl font-black text-[#123d32] font-display">
                  {formatPrice(item.price)}
                </strong>
                {item.compareAtPrice && (
                  <span className="text-base sm:text-lg font-semibold text-gray-400 line-through">
                    {formatPrice(item.compareAtPrice)}
                  </span>
                )}
                {item.isSale && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2.5 py-1 rounded-full uppercase">
                    Save {item.discountPercentage}%
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-[10px] text-emerald-900 font-bold uppercase tracking-wider block">
                  Delivery
                </span>
                <span className="text-xs font-bold text-emerald-800">
                  Free Express Shipping
                </span>
              </div>
            </div>

            {/* Installment note */}
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              <span>💳</span>
              <span>
                or 4 interest-free payments of{" "}
                <strong className="text-gray-800">{formatPrice(Math.round(item.price / 4))}</strong>{" "}
                with Klarna or Afterpay
              </span>
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900">
                  Select Size: <strong className="text-emerald-900">{currentSize}</strong>
                </span>
                <button
                  onClick={openSizeGuide}
                  className="text-emerald-800 font-bold flex items-center gap-1 hover:underline text-xs"
                >
                  <Icon name="ruler" size={13} />
                  <span>Size & Measurement Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-12 h-10 px-3 rounded-xl text-xs font-extrabold border transition-all ${
                      currentSize === sz
                        ? "bg-[#123d32] text-white border-[#123d32] shadow-sm scale-102"
                        : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Selector */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-900 block">
                Color: <strong className="text-emerald-900">{currentColor.name}</strong>
              </span>
              <div className="flex items-center gap-2.5">
                {item.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
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

            {/* Quantity Selector */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-900 block">
                Quantity
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-gray-100 border border-gray-200 rounded-xl px-3 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-gray-600 hover:text-gray-950 font-bold px-2"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-gray-900 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(item.stockQuantity, q + 1))}
                    className="text-gray-600 hover:text-gray-950 font-bold px-2"
                  >
                    +
                  </button>
                </div>
                <span className="text-[11px] text-gray-500">
                  ({item.stockQuantity} pieces available in atelier inventory)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                disabled={!isAvailable}
                onClick={handleAddToCart}
                className="w-full py-4 bg-[#123d32] hover:bg-[#0e2c24] disabled:bg-gray-300 text-white rounded-2xl text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-98"
              >
                <Icon name="bag" size={18} className="text-amber-300" />
                <span>
                  Add to Shopping Bag • {formatPrice(item.price * quantity)}
                </span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleWishlist(item.id)}
                  className={`flex-1 py-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
                    isWishlisted
                      ? "bg-rose-50 border-rose-200 text-rose-700"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon
                    name="heart"
                    size={15}
                    className={isWishlisted ? "text-rose-600 fill-rose-600" : ""}
                  />
                  <span>{isWishlisted ? "Saved in Wishlist" : "Save to Wishlist"}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Piece link copied to clipboard!");
                  }}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-xs font-bold transition-colors"
                  title="Share link"
                >
                  Share
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <Icon name="truck" size={16} className="text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block">Complimentary Shipping</strong>
                  <span>Fast express courier with tracking</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="shield" size={16} className="text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block">30-Day Returns</strong>
                  <span>Effortless doorstep return pickup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Accordion Specification Tabs */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xs">
            <div className="flex border-b border-gray-200">
              {[
                { id: "fabric", label: "Details & Care" },
                { id: "fit", label: "Fit & Measurements" },
                { id: "shipping", label: "Shipping & Returns" },
                { id: "boutiques", label: "Boutique Stock" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 text-xs font-bold transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? "border-[#123d32] text-[#123d32] bg-emerald-50/40"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5 text-xs text-gray-600 leading-relaxed space-y-3">
              {activeTab === "fabric" && (
                <div className="space-y-2">
                  <p>
                    <strong>Composition:</strong> {item.fabric}
                  </p>
                  {item.lining && (
                    <p>
                      <strong>Lining:</strong> {item.lining}
                    </p>
                  )}
                  <p>
                    <strong>Care & Preservation:</strong> {item.careInstructions}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-500 pt-1">
                    {item.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "fit" && (
                <div className="space-y-2">
                  <p>
                    <strong>Silhouette:</strong> {item.silhouette}
                  </p>
                  <p>
                    <strong>Model Fit:</strong>{" "}
                    {item.modelMeasurements || "Fits true to luxury European sizing standards."}
                  </p>
                  <p className="text-gray-500">
                    Complimentary in-boutique fitting and tailor adjustments available upon presentation of your purchase order.
                  </p>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-2">
                  <p>
                    <strong>Complimentary Express Delivery:</strong> Dispatched within 24 hours in our reinforced luxury gift box.
                  </p>
                  <p>
                    <strong>30-Day Effortless Returns:</strong> Enjoy 30 days to try on in the comfort of your home. Free prepaid return courier labels included.
                  </p>
                </div>
              )}

              {activeTab === "boutiques" && (
                <div className="space-y-2">
                  <p>
                    <strong>Flagship Depot:</strong> {item.boutiqueLocation}
                  </p>
                  <p className="text-gray-500">
                    Available for immediate in-store collection or private VIP fitting appointments in Paris, Milan, London, and New York salons.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look / Related Garments */}
      {relatedItems.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                Curated Pairings
              </span>
              <h2 className="text-2xl font-black font-display text-gray-950">
                Complete the Ensemble
              </h2>
            </div>
            <Link
              to={`/?cat=${encodeURIComponent(item.category)}`}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>View full collection</span>
              <Icon name="arrowRight" size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <ProductCard key={rel.id} item={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
