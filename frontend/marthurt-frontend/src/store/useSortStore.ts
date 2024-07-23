// src/store/useSortStore.ts
import {create} from 'zustand';

interface SortState {
  sortBy: string;
  setSortBy: (field: string) => void;
}

export const useSortStore = create<SortState>((set) => ({
  sortBy: '',
  setSortBy: (field) => set({ sortBy: field }),
}));
