# MCG Career College — Official Merch Store

The official merchandise store for MCG Career College, built as a premium e-commerce experience. Shop hoodies, tees, clinical scrubs, graduation keepsakes, and accessories — all designed for MCG students, graduates, and supporters.

**Developing Leaders, Supporting Community.**

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Context + useState (cart)
- **Database**: Replit Database (`@replit/database`)
- **Payments**: Stripe Checkout (test mode)
- **Language**: TypeScript (strict mode)

---

## Local Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Add your Stripe test keys to .env.local
# STRIPE_SECRET_KEY=sk_test_...
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Start development server
npm run dev
```

The app will be running at [http://localhost:3000](http://localhost:3000).

---

## Seed the Database

When running on Replit, seed the product catalog into Replit Database:

```bash
npx ts-node scripts/seed.ts
```

This writes all products from `/lib/products.ts` into Replit DB under the key prefix `product:`.

---

## Stripe Test Mode

Use these test card numbers during checkout:

| Scenario | Card Number |
|----------|-------------|
| **Visa success** | `4242 4242 4242 4242` |
| **Decline** | `4000 0000 0000 0002` |

- Use any future expiry date (e.g., 12/34)
- Use any 3-digit CVC (e.g., 123)
- Use any billing address

---

## Adding / Editing Products

1. Edit the product catalog in `/lib/products.ts`
2. Re-run the seed script to update Replit DB:
   ```bash
   npx ts-node scripts/seed.ts
   ```
3. Products are served from the static catalog in development and from Replit DB in production

---

## Deployment on Replit

1. Fork this repository on Replit
2. Add your environment variables in **Replit Secrets**:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_SITE_URL` (your Replit deployment URL)
3. Click **Run** — the `.replit` config is already set up

---

## Custom Domain

To use a custom domain like `store.mcgcollege.com`:

1. In your Replit project, go to **Settings > Custom Domain**
2. Point a CNAME record for `store.mcgcollege.com` to your Replit deployment URL
3. Update `NEXT_PUBLIC_SITE_URL` in Replit Secrets to match

---

## Project Structure

```
├── app/
│   ├── page.tsx                    # Homepage
│   ├── shop/page.tsx               # All products with filters
│   ├── products/[slug]/page.tsx    # Product detail page
│   ├── cart/page.tsx               # Cart page
│   ├── graduation/page.tsx         # Graduation collection
│   ├── checkout/success/page.tsx   # Post-purchase confirmation
│   └── api/
│       ├── checkout/route.ts       # Stripe Checkout session
│       ├── products/route.ts       # GET all products
│       └── orders/route.ts         # POST/GET orders
├── components/                     # Reusable UI components
├── context/CartContext.tsx          # Cart state management
├── lib/
│   ├── products.ts                 # Product catalog
│   ├── stripe.ts                   # Stripe client
│   └── db.ts                       # Replit Database client
├── types/index.ts                  # TypeScript interfaces
├── scripts/seed.ts                 # Database seed script
└── .replit                         # Replit config
```
