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
  userId?: number; // frontend naming
  user_id?: number; // backend naming
  registrationCertificate: string; // server path/url
  professionalLicense: string; // server path/url
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  _count?: {
    inventory: number;
    requests: number;
    campaigns: number;
  };
};
