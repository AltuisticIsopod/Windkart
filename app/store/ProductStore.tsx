import {create} from 'zustand';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  getProductById: (id: number) => Product | undefined;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  setProducts: (products: Product[]) => set({ products }),
  getProductById: (id: number) => {
    return get().products.find((product) => product.id === id);
  },
}));