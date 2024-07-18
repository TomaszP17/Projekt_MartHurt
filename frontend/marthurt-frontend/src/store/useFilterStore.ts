// src/store/useFilterStore.ts
import create from 'zustand';

interface FilterState {
  priceFrom: number;
  priceTo: number;
  selectedSuppliers: string[];
  setPriceFrom: (value: number) => void;
  setPriceTo: (value: number) => void;
  setSelectedSuppliers: (suppliers: string[] | ((prev: string[]) => string[])) => void;
  applyFilters: () => void;
  filtersApplied: boolean;
}

interface SortState {
  sortBy: string;
  sortAscending: boolean;
  setSortBy: (field: string) => void;
  toggleSortDirection: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  priceFrom: 0,
  priceTo: 20000,
  selectedSuppliers: [],
  filtersApplied: false,
  setPriceFrom: (value) => set({ priceFrom: value }),
  setPriceTo: (value) => set({ priceTo: value }),
  setSelectedSuppliers: (suppliers) => set((state) => ({
    selectedSuppliers: typeof suppliers === 'function' ? suppliers(state.selectedSuppliers) : suppliers
  })),
  applyFilters: () => set((state) => ({ filtersApplied: !state.filtersApplied })),
}));


export const useSortStore = create<SortState>((set) => ({
  sortBy: 'productName', 
  sortAscending: true, 
  setSortBy: (field) => set({ sortBy: field }),
  toggleSortDirection: () => set((state) => ({ sortAscending: !state.sortAscending })),
}));


