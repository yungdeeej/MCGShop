import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/lib/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const product = products.find(p => p.slug === slug);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  }

  // Try Replit DB first, fall back to static products
  try {
    const Database = (await import('@replit/database')).default;
    const db = new Database();
    const keysResult = await db.list('product:');
    const keys = keysResult as unknown as string[];
    if (Array.isArray(keys) && keys.length > 0) {
      const dbProducts = await Promise.all(
        keys.map(async (key: string) => {
          const val = await db.get(key);
          return val;
        })
      );
      return NextResponse.json(dbProducts);
    }
  } catch {
    // Not running on Replit — use static products
  }

  return NextResponse.json(products);
}
