import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ClothingItem,
  CartItem,
  ColorSwatch,
  Currency,
  User,
  UserRole,
} from "../types";
import { initialClothingItems } from "../data/mockClothing";

interface ToastState {
  message: string;
  submessage?: string;
  type?: "success" | "info" | "warning";
}

interface AppContextType {
  items: ClothingItem[];
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  wishlist: string[];
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (id: string) => void;
  quickViewItem: ClothingItem | null;
  openQuickView: (item: ClothingItem) => void;
  closeQuickView: () => void;
  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountUSD: number) => string;
  toast: ToastState | null;
  showToast: (message: string, submessage?: string, type?: "success" | "info" | "warning") => void;
  currentUser: User;
  switchUserRole: (role: UserRole) => void;
  addToCart: (
    item: ClothingItem,
    size?: string,
    color?: ColorSwatch,
    quantity?: number
  ) => void;
  updateCartQuantity: (index: number, delta: number) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const usersList: Record<UserRole, User> = {
  stylist: {
    id: "USR-001",
    name: "Genevieve Laurent",
    email: "g.laurent@doqa-atelier.com",
    role: "stylist",
    avatar: "GL",
    tier: "Haute Couturier",
  },
  vip_client: {
    id: "USR-002",
    name: "Lady Eleanor Sterling",
    email: "e.sterling@privateluxury.co.uk",
    role: "vip_client",
    avatar: "ES",
    tier: "Gold Client",
  },
  guest: {
    id: "USR-003",
    name: "Atelier Guest",
    email: "guest@atelier-privilege.com",
    role: "guest",
    avatar: "AG",
    tier: "Member",
  },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items] = useState<ClothingItem[]>(initialClothingItems);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("doqa_cloth_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("doqa_cloth_wishlist");
      return saved ? JSON.parse(saved) : ["CLOTH-DQA-001", "CLOTH-DQA-004"];
    } catch {
      return ["CLOTH-DQA-001", "CLOTH-DQA-004"];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewItem, setQuickViewItem] = useState<ClothingItem | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");
  const [currentUser, setCurrentUser] = useState<User>(usersList.vip_client);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    localStorage.setItem("doqa_cloth_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("doqa_cloth_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, submessage?: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, submessage, type });
    setTimeout(() => {
      setToast(null);
    }, 3600);
  };

  const switchUserRole = (role: UserRole) => {
    setCurrentUser(usersList[role]);
    showToast(`Switched account to ${usersList[role].name}`, `Tier: ${usersList[role].tier}`, "info");
  };

  const formatPrice = (amountUSD: number): string => {
    switch (currency) {
      case "EUR":
        return `€${Math.round(amountUSD * 0.92).toLocaleString()}`;
      case "GBP":
        return `£${Math.round(amountUSD * 0.79).toLocaleString()}`;
      case "ETB":
        return `ETB ${(amountUSD * 130).toLocaleString()}`;
      case "USD":
      default:
        return `$${amountUSD.toLocaleString()}`;
    }
  };

  const addToCart = (
    item: ClothingItem,
    size?: string,
    color?: ColorSwatch,
    quantity: number = 1
  ) => {
    const chosenSize = size || item.sizes[0] || "Standard";
    const chosenColor = color || item.colors[0];

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (ci) =>
          ci.item.id === item.id &&
          ci.selectedSize === chosenSize &&
          ci.selectedColor.name === chosenColor.name
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity = Math.min(
          copy[existingIdx].quantity + quantity,
          item.stockQuantity
        );
        return copy;
      }

      return [
        ...prev,
        {
          item,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity,
        },
      ];
    });

    showToast(
      "Added to Shopping Bag",
      `${item.name} (${chosenSize} • ${chosenColor.name})`,
      "success"
    );
    setIsCartOpen(true);
  };

  const updateCartQuantity = (index: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci, i) => {
          if (i === index) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: Math.min(newQty, ci.item.stockQuantity) } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
    showToast("Item removed from shopping bag", undefined, "info");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((x) => x !== id) : [...prev, id];
      const garment = items.find((i) => i.id === id);
      showToast(
        exists ? "Removed from Wishlist" : "Saved to Wishlist",
        garment ? garment.name : undefined,
        exists ? "info" : "success"
      );
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        wishlist,
        isWishlistOpen,
        openWishlist: () => setIsWishlistOpen(true),
        closeWishlist: () => setIsWishlistOpen(false),
        toggleWishlist,
        quickViewItem,
        openQuickView: (item) => setQuickViewItem(item),
        closeQuickView: () => setQuickViewItem(null),
        isSizeGuideOpen,
        openSizeGuide: () => setIsSizeGuideOpen(true),
        closeSizeGuide: () => setIsSizeGuideOpen(false),
        currency,
        setCurrency,
        formatPrice,
        toast,
        showToast,
        currentUser,
        switchUserRole,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
