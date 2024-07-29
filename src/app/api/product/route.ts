import { NextRequest } from 'next/server';
import { getProduct } from '~/lib/product';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('id');
    const product = await getProduct({ productId });
    return new Response(JSON.stringify(product), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
