import { NextRequest, NextResponse } from 'next/server';
import { getCart } from '../../../lib/cart';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const cartId = searchParams.get('id');
    const cart = await getCart({ cartId });
    return new NextResponse(JSON.stringify(cart), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
