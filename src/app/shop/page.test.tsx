import { beforeAll, describe, test, expect } from "vitest";
import { render, screen } from '@testing-library/react';

// app components
import { Product } from "@prisma/client";
import { ProductCard } from "../_components/product-card";

describe('Shop Page: Listing Items', () => {
  beforeAll(async () => {
    // 
  });

  const testProduct: Product = {
    id: 'test',
    description: "Lake Tennyson, 1860s, New Zealand, by Honorable James Richmond.",
    altDescription: 'a painting of a forest with trees and animals',
    museum: 'Museum of New Zealand Te Papa Tongarewa',
    museumBio: null,
    museumLocation: 'Wellington, New Zealand',
    museumProfilePicture: 'https://images.unsplash.com/profile-1683214917800-95fd80936f9eimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128',
    museumProfilePictureThumbnail: 'https://images.unsplash.com/profile-1683214917800-95fd80936f9eimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32',
    price: 100,
    rawImageUrl: 'https://images.unsplash.com/photo-1681238339260-67f4e6ab5717?ixid=M3w2Mzc3MjJ8MHwxfGFsbHwxNXx8fHx8fDF8fDE3MjIxMjExODR8&ixlib=rb-4.0.3',
    fullImageUrl: 'https://images.unsplash.com/photo-1681238339260-67f4e6ab5717?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2Mzc3MjJ8MHwxfGFsbHwxNXx8fHx8fDF8fDE3MjIxMjExODR8&ixlib=rb-4.0.3&q=85',
    imageUrl: 'https://images.unsplash.com/photo-1681238339260-67f4e6ab5717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2Mzc3MjJ8MHwxfGFsbHwxNXx8fHx8fDF8fDE3MjIxMjExODR8&ixlib=rb-4.0.3&q=80&w=1080',
    smallImageUrl: 'https://images.unsplash.com/photo-1681238339260-67f4e6ab5717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2Mzc3MjJ8MHwxfGFsbHwxNXx8fHx8fDF8fDE3MjIxMjExODR8&ixlib=rb-4.0.3&q=80&w=400',
    thumbnailUrl: 'https://images.unsplash.com/photo-1681238339260-67f4e6ab5717?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2Mzc3MjJ8MHwxfGFsbHwxNXx8fHx8fDF8fDE3MjIxMjExODR8&ixlib=rb-4.0.3&q=80&w=200',
    blurHash: 'empty on purpose',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('ProductCard', () => {
    render(<ProductCard product={testProduct}/>);
    const sampleItem = screen.getByText(testProduct.museum);
    expect(sampleItem).toBeInTheDocument();
})});
