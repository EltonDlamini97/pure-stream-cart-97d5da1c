import bottleSmall from "@/assets/bottle-small.jpg";
import bottleLarge from "@/assets/bottle-large.jpg";
import container20l from "@/assets/container-20l.jpg";
import bulkCase from "@/assets/bulk-case.jpg";

export type Category =
  | "Bottled Water"
  | "Large Water Containers"
  | "Office Water"
  | "Home Delivery"
  | "Bulk Orders";

export const CATEGORIES: { name: Category; blurb: string; image: string }[] = [
  { name: "Bottled Water", blurb: "Everyday still & sparkling bottles", image: bottleSmall },
  { name: "Large Water Containers", blurb: "10L – 25L refill containers", image: container20l },
  { name: "Office Water", blurb: "Dispensers & boardroom packs", image: bottleLarge },
  { name: "Home Delivery", blurb: "Weekly doorstep water plans", image: bottleLarge },
  { name: "Bulk Orders", blurb: "Cases, pallets & event supply", image: bulkCase },
];

export type Product = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: Category;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  stock: number;
  popularity: number;
  addedAt: string;
  image: string;
  gallery: string[];
};

const img = {
  small: bottleSmall,
  large: bottleLarge,
  container: container20l,
  bulk: bulkCase,
};

type Seed = [string, number, string, Category, keyof typeof img, number, number, number, string, string];

const seeds: Seed[] = [
  ["Pure Life Still Water 500ml", 12.99, "500ml", "Bottled Water", "small", 4.8, 240, 96, "2026-06-01", "Compact 500ml bottle of triple-purified still water — the perfect grab-and-go size."],
  ["Pure Life Still Water 750ml", 16.5, "750ml", "Bottled Water", "small", 4.7, 188, 88, "2026-05-20", "A 750ml sports-cap bottle built for gym bags, commutes and long meetings."],
  ["Pure Life Still Water 1L", 21.0, "1L", "Bottled Water", "large", 4.9, 402, 91, "2026-05-11", "One litre of crisp purified water in a slim, easy-pour bottle."],
  ["Pure Life Still Water 1.5L", 27.5, "1.5L", "Bottled Water", "large", 4.6, 121, 74, "2026-04-28", "Family-sized 1.5L bottle that keeps the whole table hydrated."],
  ["Pure Life Still Water 2L", 32.0, "2L", "Bottled Water", "large", 4.8, 310, 82, "2026-04-14", "Our best-selling 2L bottle — great value for daily household use."],
  ["Sparkling Spring Water 500ml", 18.0, "500ml", "Bottled Water", "small", 4.5, 96, 60, "2026-03-30", "Naturally carbonated sparkling water with a fine, lively bubble."],
  ["Sparkling Spring Water 1L", 26.0, "1L", "Bottled Water", "large", 4.4, 77, 55, "2026-03-18", "A litre of chilled sparkling water for the table or the bar."],
  ["Alkaline Water pH 9.5 – 750ml", 29.99, "750ml", "Bottled Water", "small", 4.7, 143, 68, "2026-03-02", "Mineral-balanced alkaline water at pH 9.5 for smooth, clean hydration."],
  ["Mineral Enriched Water 1L", 24.5, "1L", "Bottled Water", "large", 4.6, 118, 70, "2026-02-21", "Purified water re-mineralised with magnesium, calcium and potassium."],
  ["Kids Hydration Bottle 330ml", 9.99, "330ml", "Bottled Water", "small", 4.9, 205, 84, "2026-02-08", "Small, spill-safe 330ml bottles sized perfectly for lunchboxes."],
  ["Pure Life 5L Home Bottle", 44.0, "5L", "Large Water Containers", "container", 4.8, 260, 78, "2026-01-27", "A handled 5L bottle that fits neatly in the fridge door or on the counter."],
  ["Pure Life 10L Container", 74.0, "10L", "Large Water Containers", "container", 4.7, 174, 65, "2026-01-15", "Ten litres of purified water with a sturdy carry handle and tap-ready cap."],
  ["Pure Life 20L Water Container", 119.0, "20L", "Large Water Containers", "container", 4.9, 388, 95, "2026-01-04", "Our flagship 20L container — the standard fit for home and office dispensers."],
  ["Pure Life 25L Refill Drum", 139.0, "25L", "Large Water Containers", "container", 4.5, 64, 44, "2025-12-12", "Extra-capacity 25L refill drum for high-use kitchens and workshops."],
  ["Refill Exchange 20L (Bottle Swap)", 79.0, "20L", "Large Water Containers", "container", 4.6, 132, 58, "2025-11-30", "Swap your empty 20L container for a freshly filled, sanitised one."],
  ["Office Dispenser Pack – 4 x 20L", 439.0, "20L", "Office Water", "container", 4.8, 89, 72, "2026-05-06", "Four 20L containers delivered and loaded — a month of water for a small team."],
  ["Boardroom Glass Pack – 12 x 750ml", 189.0, "750ml", "Office Water", "small", 4.7, 51, 50, "2026-04-02", "Twelve elegant 750ml bottles for meeting rooms and client presentations."],
  ["Staff Room Case – 24 x 500ml", 269.0, "500ml", "Office Water", "bulk", 4.6, 143, 69, "2026-03-11", "A 24-bottle case that keeps the staff room stocked all week."],
  ["Office Starter Kit + Dispenser", 1299.0, "20L", "Office Water", "container", 4.9, 37, 62, "2026-02-16", "Hot & cold dispenser plus two 20L containers, installed on delivery."],
  ["Weekly Home Plan – 6 x 5L", 239.0, "5L", "Home Delivery", "container", 4.8, 156, 80, "2026-05-25", "Six 5L bottles delivered every week on a schedule that suits you."],
  ["Family Monthly Plan – 4 x 20L", 429.0, "20L", "Home Delivery", "container", 4.9, 201, 87, "2026-05-02", "Monthly delivery of four 20L containers, swapped at your door."],
  ["Doorstep Starter Bundle", 159.0, "Mixed", "Home Delivery", "bulk", 4.5, 74, 47, "2026-04-19", "A mixed bundle of bottle sizes so you can find your household favourite."],
  ["Bulk Case – 24 x 1L", 449.0, "1L", "Bulk Orders", "bulk", 4.7, 112, 66, "2026-03-24", "Twenty-four litre bottles per case — ideal for shops, gyms and canteens."],
  ["Bulk Case – 12 x 2L", 349.0, "2L", "Bulk Orders", "bulk", 4.6, 98, 61, "2026-02-27", "A dozen 2L bottles shrink-wrapped for easy stacking and storage."],
  ["Event Pallet – 480 x 500ml", 4899.0, "500ml", "Bulk Orders", "bulk", 4.8, 29, 53, "2026-01-20", "A full pallet of 500ml bottles for races, festivals and conferences."],
  ["Contractor Bulk – 10 x 20L", 1049.0, "20L", "Bulk Orders", "container", 4.7, 41, 49, "2025-12-28", "Ten 20L containers delivered to site for crews working long shifts."],
];

export const products: Product[] = seeds.map(
  ([name, price, size, category, key, rating, reviews, popularity, addedAt, description], i) => ({
    id: name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    name,
    price,
    size,
    category,
    description,
    features: [
      "Triple-filtered & UV purified",
      "BPA-free, 100% recyclable packaging",
      "Sealed and batch tested for quality",
      category === "Bulk Orders" ? "Free delivery on bulk orders" : "Free delivery on orders above R500",
    ],
    rating,
    reviews,
    stock: 12 + ((i * 7) % 60),
    popularity,
    addedAt,
    image: img[key],
    gallery: [img[key], img.small, img.large, img.container],
  }),
);

export const SIZES = Array.from(new Set(products.map((p) => p.size)));

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (value: number) =>
  `R${value.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
