// src/store/useFilterStore.ts
import { create } from 'zustand';

interface FilterState {
  priceFrom: number;
  priceTo: number;
  selectedColors: string[];
  selectedSize: string[];
  selectedFinish: string[];
  setPriceFrom: (value: number) => void;
  setPriceTo: (value: number) => void;
  setSelectedColor: (colors: string[] | ((prev: string[]) => string[])) => void;
  setSelectedSize: (size: string[] | ((prev: string[]) => string[])) => void;
  setSelectedFinish: (finish: string[] | ((prev: string[]) => string[])) => void;
  applyFilters: () => void;
  filtersApplied: boolean;
}

export const useFilterStore = create<FilterState>((set) => ({
  priceFrom: 0,
  priceTo: 20000,
  selectedColors: [],
  selectedSize: [],
  selectedFinish: [],
  filtersApplied: false,
  setPriceFrom: (value) => set({ priceFrom: value }),
  setPriceTo: (value) => set({ priceTo: value }),
  setSelectedColor: (colors) =>
    set((state) => ({
      selectedColors:
        typeof colors === "function"
          ? colors(state.selectedColors)
          : colors,
    })),
    setSelectedSize: (size) =>
      set((state) => ({
        selectedColors:
          typeof size === "function"
            ? size(state.selectedSize)
            : size,
      })),
  setSelectedFinish: (finish) =>
    set((state) => ({
      selectedFinish:
        typeof finish === "function"
          ? finish(state.selectedFinish)
          : finish,
    })),
  applyFilters: () => set((state) => ({ filtersApplied: !state.filtersApplied })),
}));


