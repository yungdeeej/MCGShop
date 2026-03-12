# MCG Career College — Merch Store Build Prompt

> Paste this entire file into Claude Code to scaffold the MCG merch store from scratch.

---

## PROJECT OVERVIEW

Build a complete MCG Career College merch store as a Next.js 14 app. This should look and feel like a premium Shopify store — not a school project. Use Replit's native key-value Database (`@replit/database`) for all data persistence (products, orders, cart sessions). No Supabase, no external database.

---

## BRAND SYSTEM

- **Primary orange**: `#E8751A`
- **Teal accent**: `#2AAA8A`
- **Dark charcoal** (text/backgrounds): `#1A1A2E`
- **White**: `#FFFFFF`
- **Font**: Inter (Google Fonts) — weights 400, 500, 600, 700
- **Logo**: Render "MCG" in the header with an inline SVG shield icon. Do not hotlink any external logo.
- **Tagline**: "Developing Leaders, Supporting Community"
- **Tone**: Professional, warm, achievement-oriented — not corporate-cold, not budget-school.

---

## TECH STACK

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State**: React Context + `useState` for cart
- **Database**: `@replit/database` — used server-side in API routes for products and orders
- **Payments**: Stripe Checkout (test mode)
- **Images**: Next.js `<Image>` component with SVG/CSS gradient placeholders (no external image services)
- **Deployment**: Replit (include a `.replit` config)

---

## FILE STRUCTURE

```
mcg-store/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── shop/page.tsx               # All products
│   ├── products/[slug]/page.tsx    # Product detail page
│   ├── cart/page.tsx               # Cart page
│   ├── graduation/page.tsx         # Graduation collection
│   ├── checkout/success/page.tsx   # Post-purchase confirmation
│   └── api/
│       ├── checkout/route.ts       # Stripe Checkout session
│       ├── products/route.ts       # GET all products (reads Replit DB)
│       └── orders/route.ts         # POST create order (writes Replit DB)
├── components/
│   ├── Header.tsx
│   ├── AnnouncementBar.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── CartDrawer.tsx
│   ├── SizeSelector.tsx
│   ├── ColorSwatch.tsx
│   └── Badge.tsx
├── context/
│   └── CartContext.tsx
├── lib/
│   ├── products.ts                 # Static product catalog + TypeScript types
│   ├── stripe.ts                   # Stripe client init
│   └── db.ts                       # Replit Database client wrapper
├── types/
│   └── index.ts
├── scripts/
│   └── seed.ts                     # Run once to seed Replit DB with product catalog
├── public/
│   └── (static assets)
├── .env.local.example
├── .replit
└── README.md
```

---

## REPLIT DATABASE SETUP

Install the package:
```bash
npm install @replit/database
```

### `/lib/db.ts`
```ts
import Database from '@replit/database';
export const db = new Database();
```

### `/scripts/seed.ts`
Create a seed script that writes the full product catalog (defined below) into Replit DB under the key prefix `product:`. Each product stored as JSON under `product:{slug}`. Run with:
```bash
npx ts-node scripts/seed.ts
```

### `/app/api/products/route.ts`
- `GET /api/products` — reads all keys with prefix `product:` from Replit DB, returns array of products
- `GET /api/products?slug=mcg-grad-hoodie` — returns single product by slug

### `/app/api/orders/route.ts`
- `POST /api/orders` — accepts order payload (items, total, customer email from Stripe), writes to Replit DB under `order:{timestamp}-{random}` key
- `GET /api/orders` — admin use only, returns all orders (prefix `order:`)

---

## PRODUCT CATALOG

Define this in `/lib/products.ts` as the static source of truth. The seed script reads from here to populate Replit DB. TypeScript interface first:

```ts
export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number; // CAD
  category: 'Wearables' | 'Clinical Wear' | 'Keepsakes' | 'Accessories' | 'Bundles';
  program?: 'Healthcare' | 'Business' | 'Architecture' | 'Massage Therapy';
  description: string;
  sizes?: string[];
  colors?: string[];
  badge?: string;
  featured: boolean;
  gradCollection: boolean;
}
```

Products:

| # | Name | Slug | Price | Category | Program | Sizes | Colors | Featured | Grad |
|---|------|------|-------|----------|---------|-------|--------|----------|------|
| 1 | MCG Grad Hoodie | `mcg-grad-hoodie` | $79.99 | Wearables | — | S M L XL XXL | Charcoal, Orange, Navy | ✓ | ✓ |
| 2 | MCG Classic Tee — Class of 2025 | `mcg-classic-tee` | $34.99 | Wearables | — | S M L XL XXL | White, Charcoal | ✓ | ✓ |
| 3 | MCG Clinical Scrubs Set | `mcg-scrubs` | $94.99 | Clinical Wear | Healthcare | XS S M L XL | Teal, Navy, Charcoal | ✓ | — |
| 4 | MCG Diploma Frame | `mcg-diploma-frame` | $54.99 | Keepsakes | — | One size | Black/Gold, Navy/Silver | ✓ | ✓ |
| 5 | MCG Insulated Tumbler 750ml | `mcg-tumbler` | $44.99 | Accessories | — | One size | Orange, Charcoal | ✓ | — |
| 6 | MCG Grad Bundle — Tee + Tumbler + Tote | `mcg-grad-bundle` | $79.99 | Bundles | — | S M L XL | — | ✓ | ✓ |
| 7 | MCG Embroidered Tote Bag | `mcg-tote` | $29.99 | Accessories | — | One size | Natural, Navy | — | — |
| 8 | MCG Grad Backpack | `mcg-backpack` | $64.99 | Accessories | — | One size | Charcoal, Orange | — | ✓ |

Write compelling 2–3 sentence product descriptions for each item. Use MCG brand voice — professional, proud, achievement-focused.

---

## PRODUCT IMAGE PLACEHOLDERS

Since there are no real product photos yet, generate beautiful inline SVG placeholder cards for each product. Each placeholder should:
- Be a perfect square (1:1 aspect ratio)
- Use a gradient background in MCG brand colors (vary per product — orange-to-charcoal, teal-to-navy, etc.)
- Display the product name centered in white text
- Display the MCG shield icon SVG above the name

Do NOT use external image services (picsum, placeholder.com, etc.). All placeholders must be self-contained SVG or CSS.

---

## PAGES

### `/` — Homepage

- **Announcement bar** (top, dismissible): teal background — `"🎓 Graduation Collection 2025 — Now Available | Free shipping on orders over $75 CAD"`
- **Hero section**: full-width, dark charcoal (`#1A1A2E`) background, large headline `"Wear Your Achievement."` with orange underline accent, subtext `"Official MCG Career College Merchandise"`, CTA button `"Shop Now"` in orange (`#E8751A`)
- **Category row**: 5 cards — Wearables / Clinical Wear / Keepsakes / Accessories / Graduation. Each card has an icon (inline SVG), label, hover lift effect with orange bottom border.
- **Featured products**: 4-column grid using `featured: true` products
- **Social proof strip**: `"Worn by 1,200+ MCG Graduates"` — 5 star icons in orange, clean centered layout
- **Footer**: 4-column — MCG branding + tagline / Quick Links / Programs / Contact. Social icons for Instagram and Facebook (inline SVG). Copyright `© 2025 MCG Career College`.

---

### `/shop` — All Products

- **Filter sidebar** (desktop) / **filter drawer** (mobile):
  - Filter by Category (checkboxes)
  - Filter by Program (checkboxes)
  - Filter by Price (slider or range: Under $35 / $35–$65 / $65–$100 / Over $100)
- **Product grid**: 3 columns desktop / 2 tablet / 1 mobile
- **Sort dropdown**: Featured / Price: Low to High / Price: High to Low / Newest
- Products fetched from `/api/products`

---

### `/products/[slug]` — Product Detail Page

Left column (60%): product image placeholder, thumbnail strip if multiple colors

Right column (40%):
- Program badge (if applicable)
- Product name (large, 28px+)
- Price in CAD (bold, orange)
- Short description
- **Color selector**: circular swatches, selected state has 2px orange ring
- **Size selector**: pill buttons (S/M/L/XL/XXL), selected state filled orange, out-of-stock greyed with line-through
- **Quantity stepper**: minus / number / plus
- **"Add to Cart"** button: orange, full width, pill shape → triggers cart drawer slide-in
- **"Buy Now"** button: teal, full width, pill shape → goes directly to Stripe Checkout
- **Tabs below fold**: Description / Size Guide / Care Instructions / Shipping & Returns (each with real placeholder content)
- **Related products strip**: 4 products from same category

---

### `/cart` — Cart Page

- Line items: product image, name, size/color, quantity stepper, line total, remove (×) button
- **Order summary sidebar**:
  - Subtotal
  - Shipping: Free if ≥ $75, otherwise $9.99
  - Tax: 5% GST (Alberta default) — display as line item
  - **Total in CAD**
- `"Proceed to Checkout"` → calls `/api/checkout` → redirects to Stripe
- Empty cart state: MCG shield icon + `"Your cart is empty."` + `"Browse the Store"` CTA

---

### `/graduation` — Graduation Collection

- **Hero**: `"Class of 2025"` in large type (64px+), orange/teal gradient text or accent, subheading `"Celebrate Your Achievement in Style"`
- **Countdown timer** to June 1, 2025 (SAIT Heritage Hall ceremony) — live JavaScript countdown showing days / hours / minutes / seconds
- **Pre-order urgency banner**: `"Pre-orders close May 20 — Don't miss out"`
- **Grad product grid**: products where `gradCollection: true`

---

### `/checkout/success` — Confirmation Page

- Large checkmark icon (teal)
- `"Order Confirmed!"` heading
- Order number (from Stripe session)
- Brief order summary
- `"Continue Shopping"` button → `/shop`

---

## CART & CHECKOUT

### Cart Context (`/context/CartContext.tsx`)

```ts
interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}
```

- Persist cart to `localStorage`
- Cart drawer triggered by `addItem` — slides in from right with backdrop overlay

### Stripe Checkout (`/app/api/checkout/route.ts`)

- `POST` — accepts cart items array from client
- Creates a Stripe Checkout Session with:
  - `line_items` mapped from cart
  - `currency: 'cad'`
  - `mode: 'payment'`
  - `success_url: /checkout/success?session_id={CHECKOUT_SESSION_ID}`
  - `cancel_url: /cart`
- Returns `{ url }` — client redirects to Stripe hosted page

---

## COMPONENT SPECS

### `<Header>`
- Sticky, white background, subtle bottom border
- Left: MCG inline SVG shield logo + "MCG" wordmark
- Center: nav links — Home / Shop / Graduation
- Right: search icon + cart bag icon with orange item count badge

### `<AnnouncementBar>`
- Teal (`#2AAA8A`) background, white text, 13px
- Dismissible via × button (stores dismissed state in localStorage)
- Optional: CSS marquee scroll on mobile

### `<CartDrawer>`
- Fixed right panel, slides in with CSS transition (`translate-x`)
- Dark overlay backdrop (click to close)
- Header: "Your Cart" + item count + × close
- Line items list
- Footer: subtotal + "Checkout" CTA

### `<ProductCard>`
- 12px border radius
- Square image area (aspect-ratio: 1/1), light grey bg
- Program badge (top-left corner of image)
- Product name, price
- "Add to Cart" button — appears on hover (desktop), always visible (mobile)
- Subtle hover: `scale(1.02)` + shadow lift

### `<Badge>`
- Healthcare: teal bg, white text
- Business: navy bg, white text
- Architecture: charcoal bg, white text
- Massage Therapy: orange bg, white text

### `<SizeSelector>`
- Pill buttons, 36px height
- Default: white bg, charcoal border
- Selected: orange bg (`#E8751A`), white text
- Out of stock: grey bg, strikethrough text, `cursor: not-allowed`

### `<ColorSwatch>`
- 28px circles
- Selected: 2px orange ring with 2px gap (use `ring-2 ring-offset-2 ring-orange-500` in Tailwind)

---

## DESIGN RULES

- **Shopify Dawn/Prestige aesthetic** — clean whites, strong typography, generous whitespace
- **Card border-radius**: 12px consistently
- **Button shapes**: pill (`rounded-full`) for primary CTAs, `rounded-lg` for secondary
- **Hover states**: all interactive elements get subtle scale or shadow
- **Orange** (`#E8751A`) = primary CTA color (buttons, badges, accents, selected states)
- **Teal** (`#2AAA8A`) = secondary CTA color (secondary buttons, healthcare badges, announcement bar)
- **Typography scale**:
  - Hero: 56–72px
  - Section headings: 36–48px
  - Product titles: 20–24px
  - Body: 16px
  - Captions/badges: 12–13px
- **Responsive**: mobile-first, flawless on iPhone 14 viewport (390px)
- **Accessibility**: aria labels on all icon buttons, focus-visible states, semantic HTML throughout
- **No Lorem Ipsum** — all copy must be on-brand MCG language
- **TypeScript throughout** — no `any` types

---

## ENV VARIABLES

Create `.env.local.example`:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=https://your-replit-url.repl.co
```

Replit Database requires no env variable — it auto-connects when running on Replit via `@replit/database`.

---

## `.replit` CONFIG

```toml
run = "npm run dev"
entrypoint = "app/page.tsx"

[nix]
channel = "stable-22_11"

[env]
PORT = "3000"

[packager]
language = "nodejs"

  [packager.features]
  packageSearch = true
  guessImports = true
  enabledForHosting = false

[languages.javascript]
pattern = "**/{*.js,*.jsx,*.ts,*.tsx}"

  [languages.javascript.languageServer]
  start = "typescript-language-server --stdio"
```

---

## README

Include a complete `README.md` with:

1. **Project overview** — what this is and who it's for
2. **Local setup**:
   ```bash
   npm install
   cp .env.local.example .env.local
   # Add Stripe test keys
   npm run dev
   ```
3. **Seed the database**:
   ```bash
   npx ts-node scripts/seed.ts
   ```
4. **Stripe test mode** — include test card numbers:
   - Visa success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - Any future expiry date, any CVC
5. **Adding/editing products** — edit `/lib/products.ts`, re-run seed script
6. **Deployment on Replit** — fork repo → add env vars in Replit Secrets → click Run
7. **Custom domain** — point `store.mcgcollege.com` CNAME to Replit deployment URL

---

## QUALITY BAR

This should look like a $10,000 Shopify build. Every component must be:
- Fully responsive
- Accessible (aria labels, focus states, semantic HTML)
- Performant (no unnecessary re-renders, lazy load images)
- Type-safe (TypeScript throughout, strict mode)
- Complete — no placeholder TODOs, no unfinished sections

Build the entire application end-to-end. Start with layout + components, then wire up cart context, then Stripe API route, then Replit DB integration.
