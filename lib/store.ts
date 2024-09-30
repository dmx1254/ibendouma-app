import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CUR } from "@/types/type";

interface Cart {
  productId: string;
  category: string;
  server: string;
  qty: number;
  amount: number;
  unitPrice: number;
  totalPrice: number;
  image: string;
  type: string;
  currency: string;
  valCurrency: number;
}

interface CURRENCY {
  currencyName: string;
  curencyVal: number;
}

interface MyCartStore {
  carts: Cart[];
  addToCart: (cart: Cart) => void;
  updateToCart: (productId: string, amount: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  devise: CURRENCY;
  addNewDevise: (dev: CURRENCY) => void;
}

const useStore = create<MyCartStore>()(
  persist(
    (set) => ({
      carts: [],
      totalItems: 0,
      devise: { currencyName: "mad", curencyVal: 1 },
      addToCart: (cart) =>
        set((state) => {
          const updateCart = state.carts.map((crt) => {
            if (
              cart?.productId === crt?.productId &&
              crt.unitPrice === cart?.unitPrice
            ) {
              return {
                ...crt,
                totalPrice: crt.totalPrice + cart.totalPrice,
                amount: crt.amount + cart.amount,
              };
            }
            return crt;
          });
          if (!state.carts.some((crt) => crt?.productId === cart.productId)) {
            updateCart.push(cart);
          }
          return {
            carts: updateCart,
            totalItems: updateCart.length,
          };
        }),
      updateToCart: (productId, amount) =>
        set((state) => {
          const updatedCart = state.carts.map((crt) => {
            if (crt?.productId === productId) {
              return {
                ...crt,
                amount: amount,
                totalPrice: crt.unitPrice * amount,
              };
            }
            return crt;
          });
          return {
            carts: updatedCart,
            totalItems: updatedCart.length,
          };
        }),
      removeFromCart: (productId) =>
        set((state) => {
          const removeFromCart = state.carts.filter(
            (crt) => crt?.productId !== productId
          );
          return {
            carts: removeFromCart,
            totalItems: removeFromCart.length,
          };
        }),
      clearCart: () => set({ carts: [], totalItems: 0 }),
      addNewDevise: (dev) => set({ devise: dev }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
