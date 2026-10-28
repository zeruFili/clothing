import { ClothingItem } from "../types";

export const initialClothingItems: ClothingItem[] = [
  // =========================================================================
  // 1. EVENING GOWNS & GALA DRESSES
  // =========================================================================
  {
    id: "CLOTH-DQA-001",
    code: "SKU-GWN-010",
    name: "Aurelia Midnight Emerald Silk Gown",
    subtitle: "Fluid Bias-Cut Mulberry Silk with Open Cowl Back",
    description: "Crafted from heavy 28-momme mulberry silk, this emerald column gown is cut on the bias to drape seamlessly along the silhouette. Features a subtle puddle train, delicate hand-rolled straps, and a sultry scooped cowl back. A marquee statement for diplomatic galas and premier opera evenings.",
    category: "Evening Gowns & Gala Dresses",
    designer: "Maison DOQA Couture",
    silhouette: "Column / Bias Silhouette",
    gender: "Women",
    occasion: ["Galas & Black Tie", "Red Carpet", "Weddings & Ceremonies"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Midnight Emerald", hex: "#123d32" },
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Deep Amethyst", hex: "#4a2545" }
    ],
    fabric: "100% Grade 6A Organic Mulberry Silk",
    lining: "Double silk georgette inner lining",
    careInstructions: "Specialist dry clean only. Preserve in complimentary cedar garment bag.",
    boutiqueLocation: "Paris Flagship (Place Vendôme)",
    price: 980,
    compareAtPrice: 1250,
    isSale: true,
    discountPercentage: 22,
    stockQuantity: 8,
    isBestseller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 38,
    badge: "bestseller",
    imageUrl: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "28-momme Grade 6A mulberry silk with lustrous sheen",
      "Subtle 20cm evening puddle train with wrist loop",
      "Concealed side invisible zipper with hook-and-eye closure",
      "Complimentary white-glove velvet hanger & garment dust bag"
    ],
    modelMeasurements: "Model is 178cm / 5'10\" wearing size Small (Bust 34\", Waist 25\", Hips 36\").",
    createdAt: "2026-01-10",
  },
  {
    id: "CLOTH-DQA-002",
    code: "SKU-GWN-018",
    name: "Seraphina Corseted Noir Velvet Gown",
    subtitle: "Internal Boned Corsetry with Architectural Sculpted Shoulder",
    description: "Sovereign architectural elegance in plush Italian silk velvet. Fitted with an interior corset with 14 flexible spiral boning channels that cinch and contour effortlessly, falling into a sculpted floor-sweeping trumpet hem with high side thigh slit.",
    category: "Evening Gowns & Gala Dresses",
    designer: "Atelier Valadier",
    silhouette: "Hourglass Trumpet",
    gender: "Women",
    occasion: ["Galas & Black Tie", "Red Carpet"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Obsidian Noir", hex: "#111111" },
      { name: "Bordeaux Wine", hex: "#581825" }
    ],
    fabric: "82% Rayon, 18% Silk Velvet",
    lining: "100% Habotai Silk",
    careInstructions: "Specialist velvet steam & press. Never press directly with iron.",
    boutiqueLocation: "Milan Flagship (Via Montenapoleone)",
    price: 1350,
    stockQuantity: 5,
    isBestseller: false,
    isNewArrival: true,
    rating: 5.0,
    reviewCount: 42,
    badge: "exclusive",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Interior 14-point spiral steel boned foundation",
      "Thigh-grazing left leg slit with weighted hem",
      "Architectural one-shoulder twist drapery",
      "Satin internal waist stay belt"
    ],
    modelMeasurements: "Model is 180cm / 5'11\" wearing size Small (Bust 33\", Waist 24\", Hips 35\").",
    createdAt: "2026-02-14",
  },
  {
    id: "CLOTH-DQA-003",
    code: "SKU-GWN-024",
    name: "Helena Champagne Pleated Chiffon Dress",
    subtitle: "Mushroom Accordion Pleats with Hand-Embroidered Gold Pearls",
    description: "Sunburst accordion pleated chiffon gown in luminous antique champagne. Finished with dainty seed pearls and gold filigree hand-embroidery along the plunging neckline and empire waistband. Drifts poetically with every step.",
    category: "Evening Gowns & Gala Dresses",
    designer: "Maison DOQA Couture",
    silhouette: "A-Line Goddess",
    gender: "Women",
    occasion: ["Weddings & Ceremonies", "Cocktail & Soirées", "Galas & Black Tie"],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Champagne Gold", hex: "#e5cfb3" },
      { name: "Powder Rose", hex: "#ecd4ce" }
    ],
    fabric: "100% Silk Chiffon with Metallic Lurex Thread",
    lining: "Double silk charmeuse",
    careInstructions: "Professional dry clean only.",
    boutiqueLocation: "London Mayfair Showroom",
    price: 760,
    compareAtPrice: 980,
    isSale: true,
    discountPercentage: 22,
    stockQuantity: 6,
    isBestseller: false,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 29,
    badge: "sale",
    imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Precision permanent accordion pleating",
      "Hand-sewn freshwater seed pearls",
      "Breathable double silk lining",
      "Adjustable inner corset closure"
    ],
    modelMeasurements: "Model is 176cm / 5'9\" wearing size Small.",
    createdAt: "2026-03-01",
  },

  // =========================================================================
  // 2. TAILORED SUITS & TUXEDOS
  // =========================================================================
  {
    id: "CLOTH-DQA-004",
    code: "SKU-SUT-101",
    name: "Sartorial Mayfair Grosgrain Peak Tuxedo",
    subtitle: "Super 150s Merino Wool with Silk Grosgrain Lapels",
    description: "The definitive black-tie standard. Tailored from ultra-fine Super 150s Australian Merino wool spun in Biella, Italy. Features sharp silk grosgrain peak lapels, covered silk buttons, half-canvas chest construction for bespoke drape, and side tab trousers.",
    category: "Tailored Suits & Tuxedos",
    designer: "Sartoria Vesper",
    silhouette: "Tailored Slim Bespoke",
    gender: "Men",
    occasion: ["Galas & Black Tie", "Weddings & Ceremonies", "Red Carpet"],
    sizes: ["38R", "40R", "42R", "44R", "46L"],
    colors: [
      { name: "Midnight Navy", hex: "#0c1829" },
      { name: "Black Onyx", hex: "#141414" }
    ],
    fabric: "100% Super 150s Merino Wool (Biella Mill)",
    lining: "100% Bemberg Cupro",
    careInstructions: "Specialist dry cleaning only; steam pressing.",
    boutiqueLocation: "London Mayfair Showroom",
    price: 1480,
    stockQuantity: 12,
    isBestseller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 54,
    badge: "bestseller",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Traditional half-canvas natural horsehair chest piece",
      "Pure silk grosgrain peak lapel and button trims",
      "Side adjusters on waistband (no belt loops needed)",
      "Includes tailored trousers with satin side piping"
    ],
    modelMeasurements: "Model is 188cm / 6'2\" wearing size 40R (Chest 40\", Waist 32\").",
    createdAt: "2026-01-20",
  },
  {
    id: "CLOTH-DQA-005",
    code: "SKU-SUT-108",
    name: "Verona Emerald Velvet Dinner Jacket",
    subtitle: "Plush Cotton-Silk Velvet with Shawl Silk Lapels",
    description: "An aristocratic evening staple crafted in rich jewel-toned bottle green velvet with a subtle luminous sheen. Features a soft structured shoulder, rich quilted cupro interior, and midnight black silk faille shawl collar.",
    category: "Tailored Suits & Tuxedos",
    designer: "Sartoria Vesper",
    silhouette: "Classic Dinner Jacket",
    gender: "Men",
    occasion: ["Galas & Black Tie", "Cocktail & Soirées", "Red Carpet"],
    sizes: ["38R", "40R", "42R", "44L"],
    colors: [
      { name: "Verona Emerald", hex: "#123d32" },
      { name: "Royal Sapphire", hex: "#162b4d" }
    ],
    fabric: "Cotton-Silk Velvet",
    lining: "100% Jacquard Cupro with gold piping",
    careInstructions: "Specialist velvet dry clean only.",
    boutiqueLocation: "Paris Flagship (Place Vendôme)",
    price: 880,
    compareAtPrice: 1100,
    isSale: true,
    discountPercentage: 20,
    stockQuantity: 9,
    isBestseller: false,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 31,
    badge: "sale",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Deep bottle green velvet with soft hand feel",
      "Shawl collar in high-density silk faille",
      "Single button closure with satin fabric button",
      "Four internal utility ticket and card pockets"
    ],
    modelMeasurements: "Model is 185cm / 6'1\" wearing size 40R.",
    createdAt: "2026-02-05",
  },
  {
    id: "CLOTH-DQA-006",
    code: "SKU-SUT-114",
    name: "Isadora Double-Breasted Power Tuxedo",
    subtitle: "Feminine Haute Tailoring with Silk Duchesse Lapels",
    description: "Sculpted women's evening tuxedo tailored with a sharp shoulder line and tapered waist. Features satin-covered buttons in an asymmetrical 4x2 matrix, matching high-rise cigarette trousers with satin side-stripes.",
    category: "Tailored Suits & Tuxedos",
    designer: "Maison DOQA Couture",
    silhouette: "Sculpted Hourglass Suit",
    gender: "Women",
    occasion: ["Galas & Black Tie", "Executive & Boardroom", "Red Carpet"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Chalk Ivory", hex: "#f5f3ef" },
      { name: "Onyx Black", hex: "#121212" }
    ],
    fabric: "Wool Crepe with Silk Satin Facing",
    lining: "Silk Habotai",
    careInstructions: "Specialist dry cleaning only.",
    boutiqueLocation: "New York Madison Ave Flagship",
    price: 1190,
    stockQuantity: 7,
    isBestseller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 36,
    badge: "new",
    imageUrl: "https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Precision cut wool crepe with natural comfort stretch",
      "Silk duchesse lapel facing and jetted pocket accents",
      "Includes tailored cigarette pants with silk side stripe",
      "Internal discreet brass hook closure"
    ],
    modelMeasurements: "Model is 177cm / 5'10\" wearing size Small.",
    createdAt: "2026-03-12",
  },

  // =========================================================================
  // 3. CASHMERE COATS & CAPES
  // =========================================================================
  {
    id: "CLOTH-DQA-007",
    code: "SKU-COT-201",
    name: "Genevieve Double-Faced Cashmere Wrap Coat",
    subtitle: "Pure Mongolian Cashmere with Hand-Stitched Pick Edges",
    description: "An investment piece of peerless comfort and warmth. Unlined double-faced cashmere crafted using century-old Italian split-cloth hand sewing techniques. Accented with an oversized notched lapel and sash tie belt.",
    category: "Cashmere Coats & Capes",
    designer: "Atelier Valadier",
    silhouette: "Oversized Belted Wrap",
    gender: "Women",
    occasion: ["Casual Luxury", "Executive & Boardroom", "Galas & Black Tie"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Camel Sand", hex: "#c29b74" },
      { name: "Oatmeal Melange", hex: "#e0d6cb" },
      { name: "Forest Cypress", hex: "#1a382b" }
    ],
    fabric: "100% Grade A Mongolian Cashmere",
    careInstructions: "Cedar-infused storage; professional eco dry clean only.",
    boutiqueLocation: "Paris Flagship (Place Vendôme)",
    price: 1650,
    stockQuantity: 10,
    isBestseller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewCount: 47,
    badge: "bestseller",
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Double-faced hand-stitched construction (no visible seams)",
      "Featherlight yet exceptional thermal insulation",
      "Self-tie belt with topstitch reinforcement",
      "Deep slanted welt handwarmer pockets"
    ],
    modelMeasurements: "Model is 179cm / 5'10.5\" wearing size Small.",
    createdAt: "2026-01-18",
  },
  {
    id: "CLOTH-DQA-008",
    code: "SKU-COT-208",
    name: "Kensington Heavy Gabardine Trench Cape",
    subtitle: "Weatherproof Storm Flap with Tortoiseshell Hardware",
    description: "Modern reinterpretation of the heritage trench crafted as an aristocratic cape. Tailored from waterproof bonded cotton gabardine with leather-wrapped buckle accents and checked silk storm flap lining.",
    category: "Cashmere Coats & Capes",
    designer: "Sartoria Vesper",
    silhouette: "Trapeze Cape",
    gender: "Unisex",
    occasion: ["Casual Luxury", "Executive & Boardroom"],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Sage Khaki", hex: "#7a8a7a" },
      { name: "Black Ink", hex: "#171717" }
    ],
    fabric: "100% Water-Resistant Cotton Gabardine",
    lining: "Checkered Silk Twill",
    careInstructions: "Sponge clean or professional eco dry clean.",
    boutiqueLocation: "London Mayfair Showroom",
    price: 790,
    compareAtPrice: 990,
    isSale: true,
    discountPercentage: 20,
    stockQuantity: 11,
    isBestseller: false,
    isNewArrival: false,
    rating: 4.7,
    reviewCount: 22,
    badge: "sale",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Bonded water-repellent gabardine weave",
      "Cape arm slits with hidden magnetic closures",
      "Detachable throat latch collar",
      "Signature horn buttons"
    ],
    modelMeasurements: "Model is 182cm wearing size Medium.",
    createdAt: "2026-02-28",
  },

  // =========================================================================
  // 4. SILK BLOUSES & SHIRTS
  // =========================================================================
  {
    id: "CLOTH-DQA-009",
    code: "SKU-BLS-301",
    name: "Calliope Lavallière Silk Satin Blouse",
    subtitle: "Extended Tie Pussy-Bow with Mother-of-Pearl Button Placket",
    description: "Sublime liquid silk charmeuse blouse featuring an elongated lavallière collar that can be looped into an opulent bow or left trailing loosely. Shirred bishop sleeves culminate in extended 4-button cuffs.",
    category: "Silk Blouses & Shirts",
    designer: "Maison DOQA Couture",
    silhouette: "Romantic Bishop Sleeve",
    gender: "Women",
    occasion: ["Cocktail & Soirées", "Executive & Boardroom", "Casual Luxury"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Lustrous Emerald", hex: "#154236" },
      { name: "Cream Oyster", hex: "#f3ede3" },
      { name: "Burgundy Ruby", hex: "#611b27" }
    ],
    fabric: "100% Heavy Mulberry Silk Charmeuse",
    careInstructions: "Delicate silk wash or boutique dry clean.",
    boutiqueLocation: "Milan Flagship (Via Montenapoleone)",
    price: 460,
    stockQuantity: 15,
    isBestseller: false,
    isNewArrival: true,
    rating: 4.9,
    reviewCount: 39,
    badge: "new",
    imageUrl: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "100cm long convertible neck bow",
      "Genuine Australian mother-of-pearl buttons",
      "Gathered shoulders with soft internal structure",
      "French seam tailoring throughout"
    ],
    modelMeasurements: "Model is 175cm wearing size Small.",
    createdAt: "2026-03-05",
  },
  {
    id: "CLOTH-DQA-010",
    code: "SKU-SHR-305",
    name: "Savile Bespoke Marcella Bib Dress Shirt",
    subtitle: "200/2 Two-Ply Sea Island Cotton with French Cuffs",
    description: "The definitive tuxedo shirt. Features a textured Marcella honeycomb bib front, removable stud placket compatible with onyx or pearl dress sets, and hand-turned semi-spread dress collar.",
    category: "Silk Blouses & Shirts",
    designer: "Sartoria Vesper",
    silhouette: "Tailored Dress Cut",
    gender: "Men",
    occasion: ["Galas & Black Tie", "Weddings & Ceremonies"],
    sizes: ["15.0", "15.5", "16.0", "16.5", "17.0"],
    colors: [
      { name: "Optical White", hex: "#ffffff" }
    ],
    fabric: "100% Sea Island Long-Staple Cotton",
    careInstructions: "Laundered with organic starch & bespoke press.",
    boutiqueLocation: "London Mayfair Showroom",
    price: 295,
    stockQuantity: 18,
    isBestseller: true,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 45,
    badge: "bestseller",
    imageUrl: "https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Fine Marcella pique bib front that stays crisp all night",
      "Includes set of 4 complementary black obsidian dress studs",
      "Double French cuffs for cufflinks",
      "Single-needle lockstitch construction (22 stitches per inch)"
    ],
    modelMeasurements: "Model wears collar 15.5 with 34 sleeve length.",
    createdAt: "2026-01-15",
  },

  // =========================================================================
  // 5. DESIGNER BLAZERS & JACKETS
  // =========================================================================
  {
    id: "CLOTH-DQA-011",
    code: "SKU-BLZ-401",
    name: "Celeste Hourglass Crepe Jacket",
    subtitle: "Cinched Sculptural Waist with Gilt Coin Buttons",
    description: "An homage to timeless Parisian tailoring. Rendered in dense wool crepe that sculpts a dramatic hourglass silhouette. Embellished with custom cast 24k gold-plated coin buttons depicting the DOQA crest.",
    category: "Designer Blazers & Jackets",
    designer: "Maison DOQA Couture",
    silhouette: "Sculpted Hourglass",
    gender: "Women",
    occasion: ["Cocktail & Soirées", "Executive & Boardroom", "Casual Luxury"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Forest Cypress", hex: "#123d32" },
      { name: "Alabaster White", hex: "#fcfbfa" }
    ],
    fabric: "Heavy Italian Wool Crepe",
    lining: "100% Cupro silk feel",
    careInstructions: "Boutique dry clean only.",
    boutiqueLocation: "Paris Flagship (Place Vendôme)",
    price: 680,
    compareAtPrice: 890,
    isSale: true,
    discountPercentage: 24,
    stockQuantity: 9,
    isBestseller: false,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 34,
    badge: "sale",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1548624149-f9b1859aa9d0?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "High waist darting with dramatic hip peplum flair",
      "24k gold electroplated metal DOQA crest buttons",
      "Padded peak shoulders with clean modern pitch",
      "Flap besom hip pockets"
    ],
    modelMeasurements: "Model is 176cm wearing size Small.",
    createdAt: "2026-02-19",
  },
  {
    id: "CLOTH-DQA-012",
    code: "SKU-BLZ-408",
    name: "Sorrento Raw Silk Tailored Blazer",
    subtitle: "Textured Tussar Silk with Unstructured Neapolitan Shoulder",
    description: "Designed for Mediterranean galas and summer celebrations. Cut from organic slubbed raw silk with an unlined soft Neapolitan spalla camicia shoulder that molds to the body like a second skin.",
    category: "Designer Blazers & Jackets",
    designer: "Sartoria Vesper",
    silhouette: "Relaxed Sartorial Cut",
    gender: "Men",
    occasion: ["Cocktail & Soirées", "Weddings & Ceremonies", "Casual Luxury"],
    sizes: ["38R", "40R", "42R", "44R"],
    colors: [
      { name: "Oatmeal Cream", hex: "#e4decb" },
      { name: "Olive Earth", hex: "#5a634e" }
    ],
    fabric: "100% Slub Raw Tussar Silk",
    lining: "Buggy butterfly lining in silk",
    careInstructions: "Delicate dry clean.",
    boutiqueLocation: "Milan Flagship (Via Montenapoleone)",
    price: 840,
    stockQuantity: 8,
    isBestseller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 19,
    badge: "new",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Handmade spalla camicia pleated shirt-sleeve shoulder",
      "Real horn buttons with cross-stitching",
      "Dual rear vents for effortless movement",
      "Patch hip pockets with bar-tack reinforcement"
    ],
    modelMeasurements: "Model is 186cm wearing size 40R.",
    createdAt: "2026-03-01",
  },

  // =========================================================================
  // 6. HAUTE SKIRTS & TROUSERS
  // =========================================================================
  {
    id: "CLOTH-DQA-013",
    code: "SKU-TRS-501",
    name: "Palazzo High-Rise Pleated Trousers",
    subtitle: "Fluid Wide Leg with Double Forward Inverted Pleats",
    description: "Sweeping dramatic wide-leg palazzo trousers cut from featherlight wool-silk gabardine. Boasts an elongated waistband with hidden tab closures and deep side slash pockets that sway gracefully with stride.",
    category: "Haute Skirts & Trousers",
    designer: "Atelier Valadier",
    silhouette: "Flowing Palazzo",
    gender: "Women",
    occasion: ["Cocktail & Soirées", "Executive & Boardroom", "Casual Luxury"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Obsidian Black", hex: "#161616" },
      { name: "Sage Tea", hex: "#8d9b89" },
      { name: "Cream Ivory", hex: "#f5f0e6" }
    ],
    fabric: "Wool & Silk Crepe Blend",
    careInstructions: "Delicate dry clean only.",
    boutiqueLocation: "Paris Flagship (Place Vendôme)",
    price: 420,
    stockQuantity: 14,
    isBestseller: true,
    isNewArrival: false,
    rating: 4.9,
    reviewCount: 33,
    badge: "bestseller",
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "High-rise 32cm rise for leg-lengthening stature",
      "Double forward pleats with razor-sharp crease",
      "Internal grip waistband prevents shirt untucking",
      "Generous 5cm hem reserve for custom alterations"
    ],
    modelMeasurements: "Model is 178cm wearing size Small (Waist 25\").",
    createdAt: "2026-02-11",
  },
  {
    id: "CLOTH-DQA-014",
    code: "SKU-SKT-509",
    name: "Minerva Asymmetric Draped Silk Skirt",
    subtitle: "Hand-Gathered Hip Ruching with Cascading Waterfall Hem",
    description: "An architectural masterpiece in liquid silk satin. Gathers seductively at the hip before tumbling into an asymmetric cascade hem that dances between mid-calf and ankle.",
    category: "Haute Skirts & Trousers",
    designer: "Maison DOQA Couture",
    silhouette: "Asymmetrical Draped Waterfall",
    gender: "Women",
    occasion: ["Cocktail & Soirées", "Weddings & Ceremonies", "Galas & Black Tie"],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Deep Emerald", hex: "#123d32" },
      { name: "Copper Bronze", hex: "#8c533e" }
    ],
    fabric: "100% Silk Charmeuse",
    careInstructions: "Dry clean only.",
    boutiqueLocation: "New York Madison Ave Flagship",
    price: 440,
    compareAtPrice: 590,
    isSale: true,
    discountPercentage: 25,
    stockQuantity: 8,
    isBestseller: false,
    isNewArrival: false,
    rating: 4.8,
    reviewCount: 27,
    badge: "sale",
    imageUrl: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Dynamic movement with variable hem length",
      "Elasticated back waistband discreetly concealed",
      "Pure silk with anti-static finish",
      "Hidden side zip with silk hook"
    ],
    modelMeasurements: "Model is 177cm wearing size Small.",
    createdAt: "2026-03-08",
  },

  // =========================================================================
  // 7. LEATHER ACCESSORIES & BAGS
  // =========================================================================
  {
    id: "CLOTH-DQA-015",
    code: "SKU-BAG-601",
    name: "Vendôme Gilded Minaudière Clutch",
    subtitle: "Hand-Hammered Brass Frame with Malachite Stone Clasp",
    description: "An evening jewel. The Vendôme Minaudière is enveloped in lustrous bottle green box calf leather framed by 24k gold-dipped polished brass and crowned with an authentic raw malachite jewel clasp. Includes a detachable serpentine chain.",
    category: "Leather Accessories & Bags",
    designer: "Maison DOQA Couture",
    silhouette: "Hard-Case Minaudière",
    gender: "Women",
    occasion: ["Galas & Black Tie", "Weddings & Ceremonies", "Red Carpet"],
    sizes: ["One Size"],
    colors: [
      { name: "Malachite & Emerald", hex: "#123d32" },
      { name: "Black Onyx & Gold", hex: "#1a1a1a" }
    ],
    fabric: "Box Calfskin Leather & Solid Brass",
    lining: "Nappa lambskin leather in blush pink",
    careInstructions: "Preserved in silk-lined velvet presentation case.",
    boutiqueLocation: "Paris Flagship (Place Vendôme)",
    price: 680,
    compareAtPrice: 780,
    isSale: true,
    discountPercentage: 13,
    stockQuantity: 11,
    isBestseller: true,
    isNewArrival: false,
    rating: 5.0,
    reviewCount: 41,
    badge: "bestseller",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Authentic semi-precious malachite gemstone clasp",
      "Detachable 105cm 24k gold-plated serpentine chain",
      "Accommodates iPhone Pro Max, cardholder, lipstick and keys",
      "Individual serial number engraved on internal gold plaque"
    ],
    createdAt: "2026-01-28",
  },

  // =========================================================================
  // 8. FOOTWEAR & OCCASION HEELS
  // =========================================================================
  {
    id: "CLOTH-DQA-016",
    code: "SKU-SHS-701",
    name: "Bellini Velvet Ankle-Strap Evening Stiletto",
    subtitle: "100mm Spindle Heel with Crystal-Encrusted Buckle",
    description: "Crafted in Florence from plush emerald velvet with hand-buffed leather soles. Features a featherlight 100mm stiletto spindle heel and a delicate crystal-pavé ankle buckle that catches candlelight brilliantly.",
    category: "Footwear & Occasion Heels",
    designer: "Atelier Valadier",
    silhouette: "100mm D'Orsay Stiletto",
    gender: "Women",
    occasion: ["Galas & Black Tie", "Weddings & Ceremonies", "Red Carpet"],
    sizes: ["36 EU", "37 EU", "38 EU", "39 EU", "40 EU", "41 EU"],
    colors: [
      { name: "Emerald Velvet", hex: "#123d32" },
      { name: "Obsidian Silk", hex: "#111111" }
    ],
    fabric: "Italian Silk Velvet & Tuscan Calf Leather",
    lining: "Padded kidskin footbed with arch support",
    careInstructions: "Wipe clean with soft microfiber velvet brush.",
    boutiqueLocation: "Milan Flagship (Via Montenapoleone)",
    price: 640,
    stockQuantity: 16,
    isBestseller: false,
    isNewArrival: true,
    rating: 4.8,
    reviewCount: 35,
    badge: "new",
    imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85"
    ],
    features: [
      "Handmade in Florence, Italy",
      "Ergonomic dual-density memory foam arch cushioning",
      "Anti-slip buffed leather outsoles",
      "Includes protective DOQA satin dustbags"
    ],
    createdAt: "2026-02-17",
  }
];
