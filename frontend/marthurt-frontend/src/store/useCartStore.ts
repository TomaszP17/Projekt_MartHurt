// src/store/useCartStore.ts
import {create} from 'zustand';

// Define the interface for a cart item
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Define the interface for the cart state
interface CartState {
  items: CartItem[]; // Array of cart items
  totalItems: number; // Total number of items in the cart
  totalPrice: number; // Total price of items in the cart
  addItem: (item: CartItem) => void; // Function to add an item to the cart
  removeItem: (id: string) => void; // Function to remove an item from the cart by id
  clearCart: () => void; // Function to clear the cart
  increaseQuantity: (id: string) => void; // Function to increase the quantity of an item
  decreaseQuantity: (id: string) => void; // Function to decrease the quantity of an item
}

// Create the Zustand store
export const useCartStore = create<CartState>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  // Add an item to the cart
  addItem: (newItem: CartItem) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === newItem.id);

      let updatedItems;

      if (existingItem) {
        // If the item exists, update its quantity
        updatedItems = state.items.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      } else {
        // Otherwise, add the new item
        updatedItems = [...state.items, newItem];
      }

      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
    }),

  // Remove an item from the cart
  removeItem: (id: string) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);

      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
    }),

  // Clear the cart
  clearCart: () =>
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    }),

  // Increase the quantity of an item
  increaseQuantity: (id: string) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
    }),

  // Decrease the quantity of an item
  decreaseQuantity: (id: string) =>
    set((state) => {
      const updatedItems = state.items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item))
        .filter((item) => item.quantity > 0); // Ensure no zero-quantity items

      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0),
        totalPrice: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      };
    }),
}));
