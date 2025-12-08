export interface Property {
  id: string;
  title: string;
  price: number;
  type: string;
  location: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  rooms: number;
  bathrooms: number;
  surface: number;
  description: string;
  statut: "en vente" | "à louer";
  images: string[];
  video_url: string;
  features: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  created_at: string;
}

export interface PropertyFilters {
  search?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  city?: string;
}