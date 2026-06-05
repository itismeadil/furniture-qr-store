import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
  useRef,
} from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "Onyx Dining Table",
    category: "Tables",
    price: 4200,
    material: "Solid Black Walnut",
    color: "Ebony",
    availability: "In Stock",
    description:
      "A commanding presence in any dining room. Hand-crafted from solid black walnut with a waterfall edge that reveals the wood's natural grain. The hairpin legs add industrial contrast to the organic form.",
    dimensions: { W: "220cm", D: "100cm", H: "76cm" },
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
    ],
    tags: ["dining", "wood", "minimalist"],
  },
  {
    id: 2,
    name: "Phantom Lounge Chair",
    category: "Chairs",
    price: 1850,
    material: "Full-Grain Leather",
    color: "Charcoal",
    availability: "In Stock",
    description:
      "Sink into silence. The Phantom is engineered for hours of comfort with its foam-and-feather fill, wrapped in full-grain Italian leather that darkens beautifully with age.",
    dimensions: { W: "85cm", D: "90cm", H: "78cm" },
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    ],
    tags: ["lounge", "leather", "comfort"],
  },
  {
    id: 3,
    name: "Void Sectional Sofa",
    category: "Sofas",
    price: 8900,
    material: "Bouclé Fabric",
    color: "Ash White",
    availability: "Made to Order",
    description:
      "Architecture you can sit in. The Void's modular system adapts to any space, upholstered in premium bouclé that invites touch and resists daily life equally well.",
    dimensions: { W: "320cm", D: "175cm", H: "72cm" },
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    ],
    tags: ["modular", "fabric", "large"],
  },
  {
    id: 4,
    name: "Monolith Bed Frame",
    category: "Beds",
    price: 5600,
    material: "Steel & Oak",
    color: "Matte Black",
    availability: "In Stock",
    description:
      "Sleep beneath something substantial. The Monolith's steel frame is powder-coated in matte black, with a solid oak headboard that floats 8cm from the wall—space for integrated LED ambiance.",
    dimensions: { W: "200cm", D: "220cm", H: "110cm" },
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    ],
    tags: ["king", "steel", "contemporary"],
  },
  {
    id: 5,
    name: "Arc Floor Lamp",
    category: "Tables",
    price: 920,
    material: "Brushed Brass & Marble",
    color: "Gold / White",
    availability: "In Stock",
    description:
      "The Arc bends light where you need it. A 180cm arm of brushed brass rises from a solid Carrara marble base, casting a warm pool of light over reading nooks and sofas alike.",
    dimensions: { W: "35cm", D: "35cm", H: "180cm" },
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80",
    ],
    tags: ["lighting", "brass", "marble"],
  },
  {
    id: 6,
    name: "Slate Cabinet",
    category: "Cabinets",
    price: 3100,
    material: "Smoked Oak Veneer",
    color: "Dark Slate",
    availability: "In Stock",
    description:
      "Storage elevated to sculpture. Smoked oak veneer panels in a staggered herringbone pattern conceal two large compartments with soft-close mechanisms. Push-to-open hardware keeps the facade pristine.",
    dimensions: { W: "160cm", D: "45cm", H: "85cm" },
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    tags: ["storage", "oak", "herringbone"],
  },
  {
    id: 7,
    name: "Ritual Coffee Table",
    category: "Tables",
    price: 1400,
    material: "Travertine & Steel",
    color: "Sand / Black",
    availability: "Low Stock",
    description:
      "A ritual of gathering. The Ritual pairs a honed travertine top with a welded steel base in matte black—each stone slab unique in its natural veining and fossil imprints.",
    dimensions: { W: "120cm", D: "60cm", H: "38cm" },
    images: [
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
    ],
    tags: ["stone", "coffee", "living room"],
  },
  {
    id: 8,
    name: "Gravity Bar Stool",
    category: "Chairs",
    price: 680,
    material: "Polished Aluminum",
    color: "Silver",
    availability: "In Stock",
    description:
      "Effortless balance. The Gravity stool's single-leg counterweighted design appears to defy physics while offering rock-solid stability. Adjustable height from 65–90cm. Set of 2.",
    dimensions: { W: "40cm", D: "40cm", H: "90cm" },
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80",
    ],
    tags: ["bar", "aluminum", "adjustable"],
  },
  {
    id: 9,
    name: "Echo Bookshelf",
    category: "Cabinets",
    price: 2250,
    material: "Solid Ash",
    color: "Natural Ash",
    availability: "In Stock",
    description:
      "Shelving that echoes your taste. Six open shelves in solid ash wood with a subtle curve at each edge. The asymmetric ladder frame leans confidently without wall fixings.",
    dimensions: { W: "90cm", D: "30cm", H: "200cm" },
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&q=80",
    ],
    tags: ["open shelving", "ash", "leaning"],
  },
  {
    id: 10,
    name: "Dusk Sofa",
    category: "Sofas",
    price: 4800,
    material: "Velvet",
    color: "Midnight Blue",
    availability: "Made to Order",
    description:
      "The hour between day and night. The Dusk's deep midnight velvet absorbs light and the eye in equal measure. Solid beech legs in a natural finish create a warm contrast beneath the rich upholstery.",
    dimensions: { W: "240cm", D: "95cm", H: "80cm" },
    images: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=800&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    ],
    tags: ["velvet", "3-seater", "color"],
  },
  {
    id: 11,
    name: "Loft Platform Bed",
    category: "Beds",
    price: 3200,
    material: "Solid Pine",
    color: "Raw Pine",
    availability: "In Stock",
    description:
      "Grounded. The Loft sits just 18cm from the floor, its platform base eliminating the need for a box spring. Raw pine is wire-brushed then sealed to enhance grain and resist moisture.",
    dimensions: { W: "180cm", D: "210cm", H: "60cm" },
    images: [
      "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=80",
    ],
    tags: ["platform", "pine", "low profile"],
  },
  {
    id: 12,
    name: "Vessel Side Table",
    category: "Tables",
    price: 590,
    material: "Turned Concrete",
    color: "Warm Grey",
    availability: "In Stock",
    description:
      "Small scale, strong presence. Cast from a proprietary lightweight concrete mix, the Vessel's organic barrel form is hand-sanded to a silky finish. Available in three diameters.",
    dimensions: { W: "40cm", D: "40cm", H: "55cm" },
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80",
    ],
    tags: ["concrete", "side table", "accent"],
  },
];

const CATEGORIES = ["All", "Tables", "Chairs", "Sofas", "Beds", "Cabinets"];
const WA_NUMBER = "966500000000";

// ─── CONTEXT ─────────────────────────────────────────────────────────────────

const SavedContext = createContext(null);
const useSaved = () => useContext(SavedContext);

function SavedProvider({ children }) {
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("fw_saved") || "[]");
    } catch {
      return [];
    }
  });
  const toggle = useCallback((id) => {
    setSaved((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      localStorage.setItem("fw_saved", JSON.stringify(next));
      return next;
    });
  }, []);
  return (
    <SavedContext.Provider value={{ saved, toggle }}>
      {children}
    </SavedContext.Provider>
  );
}

// ─── ROUTER ──────────────────────────────────────────────────────────────────

function useRouter() {
  const [path, setPath] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setPath(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (to) => {
    window.location.hash = to;
  };
  return { path, navigate };
}

// ─── STYLES ──────────────────────────────────────────────────────────────────

const G = {
  black: "#000000",
  darkGrey: "#1F1F1F",
  lightGrey: "#2D2D2D",
  white: "#FFFFFF",
  dim: "#888",
  accent: "#C8A96E",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #000; color: #fff; font-family: 'DM Sans', sans-serif; font-weight: 300; -webkit-font-smoothing: antialiased; }
  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; font-family: inherit; }
  img { display: block; width: 100%; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #000; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }

  .nav { position: sticky; top: 0; z-index: 100; background: rgba(0,0,0,0.92); backdrop-filter: blur(20px); border-bottom: 1px solid #1a1a1a; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; }
  .nav-logo span { color: ${G.accent}; }
  .nav-links { display: flex; align-items: center; gap: 8px; }
  .nav-btn { background: none; border: none; color: #aaa; font-size: 13px; letter-spacing: 0.08em; padding: 8px 14px; border-radius: 6px; transition: all 0.2s; text-transform: uppercase; }
  .nav-btn:hover, .nav-btn.active { color: #fff; background: #1f1f1f; }
  .nav-saved { position: relative; }
  .nav-badge { position: absolute; top: 4px; right: 10px; background: ${G.accent}; color: #000; font-size: 9px; font-weight: 500; width: 14px; height: 14px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

  .hero { min-height: 88vh; display: flex; flex-direction: column; justify-content: flex-end; padding: 60px 24px 80px; background: linear-gradient(160deg, #0a0a0a 0%, #000 60%); position: relative; overflow: hidden; }
  .hero-bg { position: absolute; inset: 0; background-image: url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=60'); background-size: cover; background-position: center; opacity: 0.12; }
  .hero-label { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: ${G.accent}; margin-bottom: 20px; }
  .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(48px, 10vw, 96px); font-weight: 300; line-height: 1.0; letter-spacing: -0.02em; max-width: 700px; margin-bottom: 32px; }
  .hero-title em { font-style: italic; color: ${G.accent}; }
  .hero-sub { font-size: 15px; color: #777; max-width: 400px; line-height: 1.7; margin-bottom: 48px; }
  .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
  .btn-primary { background: ${G.accent}; color: #000; border: none; padding: 14px 32px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; border-radius: 4px; transition: all 0.25s; }
  .btn-primary:hover { background: #d4b87a; transform: translateY(-1px); }
  .btn-outline { background: none; color: #fff; border: 1px solid #333; padding: 14px 32px; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 400; border-radius: 4px; transition: all 0.25s; }
  .btn-outline:hover { border-color: #666; background: #111; }

  .section { padding: 80px 24px; max-width: 1200px; margin: 0 auto; }
  .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 48px; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(28px, 5vw, 44px); font-weight: 400; letter-spacing: -0.02em; }
  .section-link { font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: ${G.accent}; cursor: pointer; transition: opacity 0.2s; }
  .section-link:hover { opacity: 0.7; }

  .search-bar { max-width: 1200px; margin: 0 auto; padding: 0 24px 48px; }
  .search-inner { position: relative; }
  .search-input { width: 100%; background: #111; border: 1px solid #222; color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; padding: 14px 48px 14px 20px; border-radius: 8px; outline: none; transition: border-color 0.2s; }
  .search-input::placeholder { color: #555; }
  .search-input:focus { border-color: #444; }
  .search-icon { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #555; pointer-events: none; font-size: 16px; }

  .cats { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 48px; max-width: 1200px; padding: 0 24px; margin-left: auto; margin-right: auto; }
  .cat-btn { background: #111; border: 1px solid #222; color: #888; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; padding: 9px 20px; border-radius: 100px; transition: all 0.2s; cursor: pointer; }
  .cat-btn:hover { border-color: #444; color: #ccc; }
  .cat-btn.active { background: #fff; border-color: #fff; color: #000; }

  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
  .card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.3s, border-color 0.3s; }
  .card:hover { transform: translateY(-4px); border-color: #333; }
  .card-img-wrap { aspect-ratio: 4/3; overflow: hidden; position: relative; background: #111; }
  .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
  .card:hover .card-img { transform: scale(1.05); }
  .card-cat-badge { position: absolute; top: 12px; left: 12px; background: rgba(0,0,0,0.75); backdrop-filter: blur(8px); border: 1px solid #333; font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #aaa; padding: 4px 10px; border-radius: 100px; }
  .card-body { padding: 20px; }
  .card-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; margin-bottom: 6px; }
  .card-price { font-size: 15px; color: ${G.accent}; font-weight: 400; letter-spacing: 0.03em; margin-bottom: 16px; }
  .card-cta { width: 100%; background: #1a1a1a; border: none; color: #fff; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; padding: 11px; border-radius: 6px; transition: background 0.2s; }
  .card-cta:hover { background: #2d2d2d; }

  .avail-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; }
  .avail-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

  .product-page { max-width: 1200px; margin: 0 auto; padding: 40px 24px 100px; }
  .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
  @media (max-width: 768px) { .product-grid { grid-template-columns: 1fr; gap: 40px; } .nav-links { display: none; } }
  .gallery { position: sticky; top: 80px; }
  .gallery-main { aspect-ratio: 1; border-radius: 16px; overflow: hidden; background: #0d0d0d; border: 1px solid #1a1a1a; margin-bottom: 12px; cursor: zoom-in; }
  .gallery-main img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
  .gallery-main:hover img { transform: scale(1.03); }
  .gallery-thumbs { display: flex; gap: 10px; }
  .gallery-thumb { flex: 1; aspect-ratio: 1; border-radius: 8px; overflow: hidden; background: #111; border: 1px solid transparent; cursor: pointer; transition: border-color 0.2s; }
  .gallery-thumb.active { border-color: ${G.accent}; }
  .gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }

  .product-info { display: flex; flex-direction: column; gap: 28px; }
  .product-cat { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: ${G.accent}; }
  .product-name { font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 5vw, 52px); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; }
  .product-price { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: ${G.accent}; }
  .product-desc { font-size: 14px; color: #888; line-height: 1.9; }
  .divider { border: none; border-top: 1px solid #1a1a1a; }
  .spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .spec-item label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #555; display: block; margin-bottom: 4px; }
  .spec-item span { font-size: 14px; color: #ccc; }
  .dim-row { display: flex; gap: 20px; }
  .dim-box { flex: 1; background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; padding: 14px 12px; text-align: center; }
  .dim-box .val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; }
  .dim-box .lbl { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #555; margin-top: 2px; }
  .actions { display: flex; flex-direction: column; gap: 12px; }
  .btn-wa { background: #1a8a2e; color: #fff; border: none; padding: 16px 24px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 10px; transition: background 0.2s; }
  .btn-wa:hover { background: #1d9e34; }
  .btn-save { background: #111; color: #fff; border: 1px solid #2d2d2d; padding: 14px 24px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 400; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 10px; transition: all 0.2s; }
  .btn-save:hover { border-color: #555; background: #1a1a1a; }
  .btn-save.saved { border-color: ${G.accent}; color: ${G.accent}; }

  .qr-section { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; }
  .qr-wrap { flex-shrink: 0; background: #fff; border-radius: 8px; padding: 8px; width: 80px; height: 80px; }
  .qr-wrap canvas, .qr-wrap svg { width: 100% !important; height: 100% !important; }
  .qr-text h4 { font-size: 13px; margin-bottom: 4px; }
  .qr-text p { font-size: 11px; color: #555; line-height: 1.5; }

  .related { margin-top: 80px; border-top: 1px solid #1a1a1a; padding-top: 60px; }
  .related h3 { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 400; margin-bottom: 32px; }

  .page-header { padding: 60px 24px 40px; max-width: 1200px; margin: 0 auto; border-bottom: 1px solid #111; margin-bottom: 0; }
  .page-header h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 6vw, 56px); font-weight: 400; letter-spacing: -0.02em; }
  .page-header p { font-size: 14px; color: #666; margin-top: 8px; }
  .empty-state { text-align: center; padding: 100px 24px; }
  .empty-icon { font-size: 48px; margin-bottom: 24px; opacity: 0.3; }
  .empty-state h3 { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 400; margin-bottom: 12px; }
  .empty-state p { font-size: 14px; color: #666; margin-bottom: 32px; }

  .skeleton { animation: pulse 1.5s ease-in-out infinite; background: linear-gradient(90deg, #111 25%, #1a1a1a 50%, #111 75%); background-size: 200% 100%; border-radius: 8px; }
  @keyframes pulse { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  .skel-card { background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 12px; overflow: hidden; }
  .skel-img { aspect-ratio: 4/3; }
  .skel-body { padding: 20px; display: flex; flex-direction: column; gap: 10px; }

  .fade-in { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .footer { border-top: 1px solid #111; padding: 48px 24px; text-align: center; }
  .footer-logo { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px; }
  .footer-logo span { color: ${G.accent}; }
  .footer-text { font-size: 13px; color: #444; line-height: 1.8; }
  .footer-text a { color: ${G.accent}; }

  .back-btn { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #666; cursor: pointer; margin-bottom: 40px; transition: color 0.2s; background: none; border: none; padding: 0; }
  .back-btn:hover { color: #fff; }

  .toast { position: fixed; bottom: 24px; right: 24px; background: #1f1f1f; border: 1px solid #333; border-radius: 10px; padding: 14px 20px; font-size: 13px; z-index: 999; animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  @media (max-width: 600px) {
    .grid { grid-template-columns: 1fr 1fr; gap: 12px; }
    .card-name { font-size: 15px; }
    .spec-grid { grid-template-columns: 1fr; }
    .dim-row { gap: 8px; }
    .hero { padding: 40px 20px 60px; min-height: 75vh; }
    .hero-bg { opacity: 0.08; }
  }
`;

// ─── QR CODE (Simple SVG generation using URL pattern) ────────────────────────

function QRPlaceholder({ url, size = 64 }) {
  // Visual QR-like placeholder using SVG pattern
  const seed = url.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = 9;
  const cell = size / cells;
  const bits = [];
  // Fixed finder patterns + data cells
  const corners = [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [2, 0],
    [0, 6],
    [0, 7],
    [0, 8],
    [1, 8],
    [2, 8],
    [6, 0],
    [7, 0],
    [8, 0],
    [8, 1],
    [8, 2],
    [6, 8],
    [7, 8],
    [8, 8],
    [8, 7],
    [8, 6],
  ];
  const inner = [
    [1, 1],
    [1, 7],
    [7, 1],
    [7, 7],
  ];
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      const isCorner = corners.some(([cr, cc]) => cr === r && cc === c);
      const isInner = inner.some(([ir, ic]) => ir === r && ic === c);
      const rng = ((seed * (r * 13 + c * 7 + 1)) % 97) / 97;
      const dark = isCorner || isInner || rng > 0.55;
      bits.push({ r, c, dark });
    }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {bits.map(
        ({ r, c, dark }) =>
          dark && (
            <rect
              key={`${r}-${c}`}
              x={c * cell}
              y={r * cell}
              width={cell - 0.5}
              height={cell - 0.5}
              fill="black"
            />
          ),
      )}
    </svg>
  );
}

// ─── AVAILABILITY ─────────────────────────────────────────────────────────────

function AvailBadge({ status }) {
  const color =
    status === "In Stock"
      ? "#4ade80"
      : status === "Low Stock"
        ? "#facc15"
        : "#f87171";
  return (
    <span className="avail-badge">
      <span className="avail-dot" style={{ background: color }} />
      <span style={{ color }}>{status}</span>
    </span>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────

function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, []);
  return <div className="toast">{message}</div>;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────

function Nav({ navigate, path }) {
  const { saved } = useSaved();
  const links = [
    { label: "Catalogue", hash: "#/products" },
    { label: "Saved", hash: "#/saved" },
  ];
  return (
    <nav className="nav">
      <div
        className="nav-logo"
        onClick={() => navigate("#/")}
        style={{ cursor: "pointer" }}
      >
        NOIR<span>.</span>STUDIO
      </div>
      <div className="nav-links">
        {links.map((l) => (
          <button
            key={l.hash}
            className={`nav-btn ${path === l.hash ? "active" : ""}`}
            onClick={() => navigate(l.hash)}
          >
            {l.label}
            {l.label === "Saved" && saved.length > 0 && (
              <span
                style={{
                  marginLeft: 6,
                  background: G.accent,
                  color: "#000",
                  borderRadius: "100px",
                  padding: "1px 6px",
                  fontSize: 10,
                }}
              >
                {saved.length}
              </span>
            )}
          </button>
        ))}
      </div>
      <button
        className="nav-btn"
        style={{ display: "flex", alignItems: "center", gap: 6 }}
        onClick={() => navigate("#/saved")}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        {saved.length > 0 && (
          <span
            style={{
              background: G.accent,
              color: "#000",
              borderRadius: "100px",
              padding: "1px 6px",
              fontSize: 10,
            }}
          >
            {saved.length}
          </span>
        )}
      </button>
    </nav>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ product, navigate }) {
  return (
    <div
      className="card fade-in"
      onClick={() => navigate(`#/product/${product.id}`)}
    >
      <div className="card-img-wrap">
        <img
          className="card-img"
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
        />
        <div className="card-cat-badge">{product.category}</div>
      </div>
      <div className="card-body">
        <div className="card-name">{product.name}</div>
        <div className="card-price">SAR {product.price.toLocaleString()}</div>
        <button className="card-cta">View Details →</button>
      </div>
    </div>
  );
}

// ─── SKELETON CARD ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="skel-card">
      <div className="skel-img skeleton" />
      <div className="skel-body">
        <div className="skeleton" style={{ height: 20, width: "70%" }} />
        <div className="skeleton" style={{ height: 16, width: "40%" }} />
        <div className="skeleton" style={{ height: 36, borderRadius: 6 }} />
      </div>
    </div>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ navigate }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const featured = PRODUCTS.slice(0, 4);
  const filtered = PRODUCTS.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="hero-label">Curated Furniture — Riyadh Showroom</div>
          <h1 className="hero-title">
            Pieces that <em>define</em> the space around them
          </h1>
          <p className="hero-sub">
            Each item in our showroom carries a QR code. Scan it to explore
            specs, dimensions, and place an inquiry — right from your phone.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => navigate("#/products")}
            >
              Browse Catalogue
            </button>
            <button
              className="btn-outline"
              onClick={() =>
                document
                  .getElementById("featured")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Featured
            </button>
          </div>
        </div>
      </section>

      {/* Search */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 0" }}>
        <div className="search-inner">
          <input
            className="search-input"
            placeholder="Search furniture, categories…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCat("All");
            }}
          />
          <span className="search-icon">⌕</span>
        </div>
      </div>

      {/* Categories */}
      <div className="cats" style={{ marginTop: 24 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`cat-btn ${cat === c ? "active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Featured / filtered */}
      <section className="section" id="featured">
        <div className="section-header">
          <h2 className="section-title">
            {search || cat !== "All"
              ? `Results (${filtered.length})`
              : "Featured Pieces"}
          </h2>
          {!search && cat === "All" && (
            <span
              className="section-link"
              onClick={() => navigate("#/products")}
            >
              View All →
            </span>
          )}
        </div>
        <div className="grid">
          {loading
            ? Array(4)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : (search || cat !== "All" ? filtered : featured).map((p) => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          NOIR<span>.</span>STUDIO
        </div>
        <p className="footer-text">
          Luxury furniture showroom · Riyadh, Saudi Arabia
          <br />
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp us at +966 50 000 0000
          </a>
          <br />
          <br />
          <span style={{ opacity: 0.4 }}>
            Prototype — QR codes link to /product/:id
          </span>
        </p>
      </footer>
    </div>
  );
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────

function ProductsPage({ navigate }) {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = PRODUCTS.filter(
    (p) =>
      (cat === "All" || p.category === cat) &&
      (search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div>
      <div className="page-header">
        <h1>Full Catalogue</h1>
        <p>{PRODUCTS.length} pieces — all in our Riyadh showroom</p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 0" }}>
        <div className="search-inner">
          <input
            className="search-input"
            placeholder="Search furniture…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">⌕</span>
        </div>
      </div>
      <div className="cats" style={{ marginTop: 20 }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`cat-btn ${cat === c ? "active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="section" style={{ paddingTop: 0 }}>
        <div className="grid">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((p) => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
        </div>
        {!loading && filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <h3>No results found</h3>
            <p>Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── QR CODE COMPONENT (Using external API for simplicity) ─────────────────

function QRCode({ value }) {
  return (
    <img
      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        value,
      )}`}
      alt="QR Code"
    />
  );
}

// ─── PRODUCT DETAIL PAGE ──────────────────────────────────────────────────────

function ProductDetailPage({ id, navigate }) {
  const product = PRODUCTS.find((p) => p.id === parseInt(id));
  const { saved, toggle } = useSaved();
  const [imgIdx, setImgIdx] = useState(0);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const isSaved = saved.includes(product?.id);

  useEffect(() => {
    // Avoid synchronous setState inside effects by deferring the img index reset
    const t1 = setTimeout(() => setImgIdx(0), 0);
    const t2 = setTimeout(() => setLoading(false), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [id]);

  if (!product)
    return (
      <div className="empty-state">
        <div className="empty-icon">◎</div>
        <h3>Product not found</h3>
        <button
          className="btn-outline"
          style={{ margin: "0 auto" }}
          onClick={() => navigate("#/products")}
        >
          Back to Catalogue
        </button>
      </div>
    );

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);
  const waMsg = encodeURIComponent(
    `Hi! I'm interested in the "${product.name}" (ID: ${product.id}) — priced at SAR ${product.price.toLocaleString()}. Can you provide more information?`,
  );
  const productUrl = `https://furniture-qr-store.vercel.app/product/${product.id}`;

  const handleSave = () => {
    toggle(product.id);
    setToast(isSaved ? "Removed from saved items" : "✓ Saved for later");
  };

  if (loading)
    return (
      <div className="product-page">
        <div
          style={{ height: 40, width: 120, marginBottom: 40 }}
          className="skeleton"
        />
        <div className="product-grid">
          <div>
            <div
              style={{ aspectRatio: "1", borderRadius: 16 }}
              className="skeleton"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[200, 80, 300, 60, 200].map((w, i) => (
              <div
                key={i}
                style={{
                  height: i === 0 ? 56 : 20,
                  width: `${w / 3}%`,
                  maxWidth: w,
                }}
                className="skeleton"
              />
            ))}
          </div>
        </div>
      </div>
    );

  return (
    <div className="product-page fade-in">
      <button className="back-btn" onClick={() => navigate("#/products")}>
        ← Back to Catalogue
      </button>

      <div className="product-grid">
        {/* Gallery */}
        <div className="gallery">
          <div className="gallery-main">
            <img src={product.images[imgIdx]} alt={product.name} />
          </div>
          <div className="gallery-thumbs">
            {product.images.map((img, i) => (
              <div
                key={i}
                className={`gallery-thumb ${imgIdx === i ? "active" : ""}`}
                onClick={() => setImgIdx(i)}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="product-info">
          <div>
            <div className="product-cat">{product.category}</div>
            <h1 className="product-name">{product.name}</h1>
          </div>

          <div className="product-price">
            SAR {product.price.toLocaleString()}
          </div>

          <AvailBadge status={product.availability} />

          <hr className="divider" />

          <p className="product-desc">{product.description}</p>

          <hr className="divider" />

          {/* Specs */}
          <div className="spec-grid">
            <div className="spec-item">
              <label>Material</label>
              <span>{product.material}</span>
            </div>
            <div className="spec-item">
              <label>Colour</label>
              <span>{product.color}</span>
            </div>
          </div>

          {/* Dimensions */}
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#555",
                marginBottom: 12,
              }}
            >
              Dimensions
            </div>
            <div className="dim-row">
              {Object.entries(product.dimensions).map(([k, v]) => (
                <div key={k} className="dim-box">
                  <div className="val">{v}</div>
                  <div className="lbl">
                    {k === "W" ? "Width" : k === "D" ? "Depth" : "Height"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="divider" />

          {/* Actions */}
          <div className="actions">
            <a
              className="btn-wa"
              href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Inquire on WhatsApp
            </a>
            <button
              className={`btn-save ${isSaved ? "saved" : ""}`}
              onClick={handleSave}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isSaved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {isSaved ? "Saved ✓" : "Save for Later"}
            </button>
          </div>

          {/* QR */}
          <div className="qr-section">
            <div className="qr-wrap">
              <QRCode value={productUrl} />
            </div>
            <div className="qr-text">
              <h4>QR Code — Product #{product.id}</h4>
              <p>
                This code is displayed on the showroom tag. Scan to open this
                page directly on your phone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="related">
          <h3>More {product.category}</h3>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        </div>
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ─── SAVED PAGE ───────────────────────────────────────────────────────────────

function SavedPage({ navigate }) {
  const { saved, toggle } = useSaved();
  const items = PRODUCTS.filter((p) => saved.includes(p.id));

  return (
    <div>
      <div className="page-header">
        <h1>Saved Items</h1>
        <p>
          {items.length} item{items.length !== 1 ? "s" : ""} saved
        </p>
      </div>
      <div className="section">
        {items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <h3>Nothing saved yet</h3>
            <p>
              Tap the bookmark icon on any product to save it here for easy
              comparison.
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate("#/products")}
            >
              Browse Catalogue
            </button>
          </div>
        ) : (
          <div className="grid fade-in">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { path, navigate } = useRouter();

  let page = null;
  if (path === "#/" || path === "") page = <HomePage navigate={navigate} />;
  else if (path === "#/products") page = <ProductsPage navigate={navigate} />;
  else if (path === "#/saved") page = <SavedPage navigate={navigate} />;
  else if (path.startsWith("#/product/")) {
    const id = path.replace("#/product/", "");
    page = <ProductDetailPage key={id} id={id} navigate={navigate} />;
  }

  return (
    <SavedProvider>
      <style>{css}</style>
      <Nav navigate={navigate} path={path} />
      <main style={{ minHeight: "80vh" }}>
        {page ?? (
          <div className="empty-state">
            <h3>Page not found</h3>
            <button className="btn-primary" onClick={() => navigate("#/")}>
              Go Home
            </button>
          </div>
        )}
      </main>
    </SavedProvider>
  );
}
