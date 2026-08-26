# AquaPure — Modern Water Delivery & E-commerce Demo

A premium, responsive water delivery storefront demo built with **TanStack Start**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**. Features a polished blue-and-white theme, dark mode, a fully functional shopping cart persisted to `localStorage`, and a simulated multi-step checkout.

![AquaPure Preview](public/preview.png)

## Live Demo

- **Preview**: [https://id-preview--3cf01e89-7f30-46e7-9a91-e7a4a3c962c4.lovable.app](https://id-preview--3cf01e89-7f30-46e7-9a91-e7a4a3c962c4.lovable.app)
- **Published**: [https://pure-stream-cart.lovable.app](https://pure-stream-cart.lovable.app)

## Features

- **Homepage**: Animated hero banner, category cards, bestsellers, and delivery coverage map.
- **Shop**: 26 products across 5 categories with real-time filtering by category, bottle size, price range, and search.
- **Product Details**: Image gallery, features, quantity selector, and related-product recommendations.
- **Cart**: Add, update quantities, remove items, and persist cart state in `localStorage`.
- **Checkout**: Step-by-step demo checkout (Information → Delivery → Payment) with order summary and success state.
- **Dark Mode**: Full theme toggle with smooth transitions.
- **Responsive**: Mobile-first layout with sticky navigation and footer newsletter.
- **Performance**: Route-level code splitting, SSR-friendly loaders, and TanStack Query caching.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 (OKLCH tokens) |
| Animation | Framer Motion |
| Routing | TanStack Router (file-based) |
| State | React Context + `localStorage` |
| Icons | Lucide React |

## Design Tokens

```css
--primary: #0099FF;
--primary-dark: #005F99;
--accent: #00CFFF;
--background: #FFFFFF;
--background-dark: #0F172A;
```

## Project Structure

```text
src/
├── components/        # Shared UI components (Navbar, Footer, ProductCard, etc.)
├── data/products.ts   # 26 demo products
├── lib/
│   ├── cart.tsx       # Cart context & localStorage persistence
│   ├── theme.tsx      # Dark mode context
│   └── utils.ts       # Helper utilities
├── routes/            # TanStack file-based routes
│   ├── __root.tsx     # Root layout
│   ├── index.tsx      # Home
│   ├── shop.tsx       # Product listing
│   ├── product.$productId.tsx
│   ├── cart.tsx
│   ├── checkout.tsx
│   ├── about.tsx
│   ├── contact.tsx
│   └── faq.tsx
├── assets/            # Product & hero images
└── styles.css         # Global theme & Tailwind config
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- [Bun](https://bun.sh/) or npm

### Install Dependencies

```bash
bun install
# or
npm install
```

### Run Development Server

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build for Production

```bash
bun run build
# or
npm run build
```

## Deployment

This project is configured for Lovable Cloud / edge deployment. Connect your GitHub repository in the [Lovable editor](https://lovable.dev) to enable automatic deployments on every push.

## Customization

- **Products**: Edit `src/data/products.ts` to add, remove, or update items.
- **Theme**: Adjust CSS variables in `src/styles.css`.
- **Routes**: Add new pages under `src/routes/` using TanStack Router conventions.

## License

MIT — feel free to fork, remix, and ship your own version.

---

Built with Lovable.
