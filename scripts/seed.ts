import Database from '@replit/database';
import { products } from '../lib/products';

async function seed() {
  const db = new Database();

  console.log('Seeding Replit Database with MCG products...\n');

  for (const product of products) {
    const key = `product:${product.slug}`;
    await db.set(key, product);
    console.log(`  ✓ ${key} — ${product.name}`);
  }

  console.log(`\nDone! Seeded ${products.length} products.`);
}

seed().catch(console.error);
