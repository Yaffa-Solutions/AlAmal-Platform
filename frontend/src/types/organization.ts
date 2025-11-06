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
  type?: string;
  address: Address;
  user_id?: number;
  registrationCertificate: string;
  professionalLicense: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  _count?: {
    inventory: number;
    requests: number;
    campaigns: number;
  };
};
