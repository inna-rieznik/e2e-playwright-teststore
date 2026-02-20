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

export interface RequiredAddressInputs {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipPostalCode: string;
  country: string;
}

export interface OptionalAddressInputs {
  alias?: string;
  company?: string;
  addressComplement?: string;
  phone?: string;
}
