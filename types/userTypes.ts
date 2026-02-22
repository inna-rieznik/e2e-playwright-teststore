export interface UserToCreate {
    gender: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday?: string;
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


