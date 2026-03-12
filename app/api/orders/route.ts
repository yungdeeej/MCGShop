import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, total, email } = body;

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: 'Items are required' }, { status: 400 });
    }

    const orderKey = `order:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const order = {
      id: orderKey,
      items,
      total,
      email,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    // Try Replit DB
    try {
      const Database = (await import('@replit/database')).default;
      const db = new Database();
      await db.set(orderKey, order);
    } catch {
      // Not running on Replit — log order
      console.log('Order created (no DB):', order);
    }

    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const Database = (await import('@replit/database')).default;
    const db = new Database();
    const keysResult = await db.list('order:');
    const keys = keysResult as unknown as string[];
    if (!Array.isArray(keys)) {
      return NextResponse.json([]);
    }
    const orders = await Promise.all(
      keys.map(async (key: string) => {
        const val = await db.get(key);
        return val;
      })
    );
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([]);
  }
}
