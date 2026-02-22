export interface RequiredPersonalInfoInputs {
  firstName: string;
  lastName: string;
  email: string;
  socialTitle: string;
}

export interface ProductQuantity {
  productId: number;
  quantity: number;
}

export type ProductColor = 'White' | 'Black';

export type ProductSize = 'S' | 'M' | 'L' | 'XL';

export interface FilterFacet {
  facet: string;
  facetGroupName: string;
}

export interface WishlistProduct {
  productId: number;
  wishlistId: number;
  productAttributeId: number;
}

