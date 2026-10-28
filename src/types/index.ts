export type UserRole = "stylist" | "vip_client" | "guest";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  tier: "Haute Couturier" | "Gold Client" | "Member";
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export type ClothingCategory =
  | "All"
  | "Evening Gowns & Gala Dresses"
  | "Tailored Suits & Tuxedos"
  | "Cashmere Coats & Capes"
  | "Silk Blouses & Shirts"
  | "Designer Blazers & Jackets"
  | "Haute Skirts & Trousers"
  | "Leather Accessories & Bags"
  | "Footwear & Occasion Heels";

export interface ClothingItem {
  id: string;
  code: string; // SKU e.g. SKU-DQA-012
  name: string;
  subtitle: string;
  description: string;
  category: ClothingCategory;
  designer: string;
  silhouette: string;
  gender: "Women" | "Men" | "Unisex";
  occasion: string[]; // e.g. ["Galas & Black Tie", "Weddings"]
  sizes: string[]; // e.g. ["XS", "S", "M", "L", "XL"]
  colors: ColorSwatch[];
  fabric: string;
  lining?: string;
  careInstructions: string;
  boutiqueLocation: string; // Boutique / Warehouse showroom
  price: number; // Current retail price
  compareAtPrice?: number; // Original price before sale/discount
  isSale?: boolean;
  discountPercentage?: number;
  stockQuantity: number; // Available inventory
  isNewArrival?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  badge?: "sale" | "new" | "bestseller" | "exclusive";
  imageUrl: string;
  images: string[];
  features: string[];
  modelMeasurements?: string;
  createdAt: string;
}

export interface CartItem {
  item: ClothingItem;
  selectedSize: string;
  selectedColor: ColorSwatch;
  quantity: number;
}

export type Currency = "USD" | "EUR" | "GBP" | "ETB";
