export interface Rating {
  id: number;
  rating: number; // 1-5
  name?: string | null; // Optional name
  tripDate: string; // ISO date string
  createdAt: string; // ISO date string
}
