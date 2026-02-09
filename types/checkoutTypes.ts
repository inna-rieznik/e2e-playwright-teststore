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
