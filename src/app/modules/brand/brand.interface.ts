export interface IBrand {
  name: string;
  slug: string;
  established: number;
  country: string;
  stores: number;
  products: number;
  tagline: string;
  logo: string;
  image: string;
  status: 'active' | 'inactive',
}
