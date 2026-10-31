import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Icon from "./Icons";

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatPrice,
    showToast,
  } = useApp();

  const [checkingOut, setCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isCartOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  );

  const discountAmount = discountApplied ? Math.round(rawSubtotal * 0.1) : 0;
  const subtotal = rawSubtotal - discountAmount;
  const shippingFee = subtotal > 250 || subtotal === 0 ? 0 : 25;
  const grandTotal = subtotal + shippingFee;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "DOQA10") {
      setDiscountApplied(true);
      showToast("10% Atelier Privilege Discount Applied!", undefined, "success");
    } else {
      showToast("Invalid Promo Code", "Try using code 'DOQA10'", "warning");
    }
  };

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setOrderConfirmed(true);
      clearCart();
      showToast(
        "Order Confirmed & Payment Authorized!",
        "Your garments are being prepared for dispatch.",
        "success"
      );
    }, 1200);
  };

  return typeof document !== "undefined"
    ? createPortal(
        <div
          className="fixed inset-0 z-[9999] overflow-hidden bg-black/60 backdrop-blur-xs animate-fade-in flex justify-end"
          role="dialog"
          aria-modal="true"
        >
          {/* Background click to close */}
          <div className="fixed inset-0" onClick={closeCart} />

          <div
            className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between animate-drawer-in z-10"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#123d32] text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
              <Icon name="bag" size={15} />
            </div>
            <div>
              <h2 className="font-display font-black text-sm sm:text-base text-gray-950">
                Shopping Bag
              </h2>
              <span className="text-[10px] text-gray-500 font-semibold block">
                {cartItems.reduce((acc, ci) => acc + ci.quantity, 0)} Items Selected
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Close bag"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-emerald-50 px-4 sm:px-5 py-2 sm:py-2.5 border-b border-emerald-100 flex items-center gap-2 text-xs text-emerald-950 font-semibold shrink-0">
          <Icon name="truck" size={15} className="text-emerald-700 shrink-0" />
          <span className="text-[11px] sm:text-xs">
            {subtotal >= 250
              ? "✨ Complimentary Express Worldwide Courier Included!"
              : `Add ${formatPrice(250 - subtotal)} more for Complimentary Express Delivery`}
          </span>
        </div>

        {/* Order Confirmed Screen */}
        {orderConfirmed ? (
          <div className="p-6 sm:p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-900 flex items-center justify-center mx-auto shadow-sm">
              <Icon name="check" size={32} />
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl text-gray-900">
              Thank You for Your Order!
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto">
              Your pieces have been allocated and are being inspected by our master tailors. You will receive an email confirmation with tracking shortly.
            </p>
            <button
              onClick={() => {
                setOrderConfirmed(false);
                closeCart();
              }}
              className="px-6 py-2.5 bg-[#123d32] text-white rounded-xl text-xs font-bold hover:bg-[#0e2c24] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Bag State */
          <div className="p-6 sm:p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-3xl bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <Icon name="bag" size={28} />
            </div>
            <h3 className="font-display font-black text-xl text-gray-900">
              Your Shopping Bag is Empty
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Explore our evening gowns, bespoke tuxedos, and cashmere coats to add pieces to your bag.
            </p>
            <button
              onClick={closeCart}
              className="px-6 py-2.5 bg-[#123d32] text-white rounded-xl text-xs font-bold hover:bg-[#0e2c24] transition-colors"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          /* Items List */
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3">
            {cartItems.map((ci, idx) => {
              const itemTotal = ci.item.price * ci.quantity;

              return (
                <div
                  key={`${ci.item.id}-${ci.selectedSize}-${ci.selectedColor.name}-${idx}`}
                  className="p-3 sm:p-3.5 bg-gray-50 rounded-2xl border border-gray-200 flex gap-3 relative group"
                >
                  <img
                    src={ci.item.imageUrl}
                    alt={ci.item.name}
                    className="w-16 h-20 rounded-xl object-cover bg-gray-200 shrink-0"
                  />

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-1.5">
                      <Link
                        to={`/product/${ci.item.id}`}
                        onClick={closeCart}
                        className="text-xs font-black text-gray-900 hover:text-emerald-950 block truncate"
                      >
                        {ci.item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove piece"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="text-[10px] text-gray-500 flex items-center gap-2 flex-wrap">
                      <span>
                        Size: <strong>{ci.selectedSize}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-gray-300"
                          style={{ backgroundColor: ci.selectedColor.hex }}
                        />
                        {ci.selectedColor.name}
                      </span>
                    </div>

                    <div className="text-[10px] text-gray-400">
                      SKU: {ci.item.code} • {ci.item.boutiqueLocation.split(" ")[0]}
                    </div>

                    {/* Pricing & Quantity row */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-gray-200">
                        <button
                          onClick={() => updateCartQuantity(idx, -1)}
                          className="text-gray-500 hover:text-gray-900 font-bold px-1"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-gray-800 w-4 text-center">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(idx, 1)}
                          className="text-gray-500 hover:text-gray-900 font-bold px-1"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <strong className="text-xs sm:text-sm font-black text-[#123d32] font-display block">
                          {formatPrice(itemTotal)}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Checkout Summary */}
        {!orderConfirmed && cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-200 bg-white space-y-3 shrink-0">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code (e.g. DOQA10)"
                className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#123d32]"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors shrink-0"
              >
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <strong className="text-gray-900">{formatPrice(rawSubtotal)}</strong>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>VIP Discount (10%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Courier Shipping:</span>
                <span className={shippingFee === 0 ? "text-emerald-700 font-bold" : "text-gray-900"}>
                  {shippingFee === 0 ? "Complimentary ($0)" : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline font-bold">
                <span className="text-gray-950 text-sm">Estimated Total:</span>
                <span className="text-xl sm:text-2xl font-black text-[#123d32] font-display">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            <button
              disabled={checkingOut}
              onClick={handleCheckout}
              className="w-full py-3.5 sm:py-4 bg-[#123d32] hover:bg-[#0d2d25] disabled:bg-gray-400 text-white rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98"
            >
              <Icon name="shield" size={16} className="text-amber-300" />
              <span>{checkingOut ? "Processing Payment..." : "Proceed to Checkout"}</span>
            </button>

            <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 pt-0.5">
              <span>🔒 256-Bit Encrypted</span>
              <span>•</span>
              <span>30-Day Doorstep Returns</span>
            </div>
          </div>
        )}
        </div>
      </div>,
      document.body
    )
  : null;
};

export default CartDrawer;
