import create from "zustand";
import { persist } from "zustand/middleware";

interface IProductStore {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}

export const useProductStore = create<IProductStore>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (id: number) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favorite) => favorite !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: "products",
      getStorage: () => localStorage, // or sessionStorage, the requisit is not clear here
    }
  )
);
