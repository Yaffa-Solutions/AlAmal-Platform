export type Address = {
  street?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export type Organization = {
  id?: number;
  name: string;
  phone?: string;
  address: Address;
  userId: number;
  registrationCertificate: string; // server path/url
  professionalLicense: string; // server path/url
  createdAt?: string;
  updatedAt?: string;
};
