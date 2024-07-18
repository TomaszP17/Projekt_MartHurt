import { create } from "zustand";

interface SearchState {
    searchBy: string;
    setSearchBy: (field: string) => void;
  }
  
  export const useSearchStore = create<SearchState>((set) => ({
    searchBy: '',
    setSearchBy: (field) => set({ searchBy: field }),
  }));