import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CUR, Order, SellOrder, WishList } from "@/types/type";
import { USERLOGINRESPONSE } from "./utils";

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
  user: USERLOGINRESPONSE | null;
  addNewDevise: (dev: CURRENCY) => void;
  addUserAfterLogin: (user: USERLOGINRESPONSE) => void;
  removeUser: () => void;
  wishlist: WishList[];
  wishListItem: number;
  addToWishList: (server: WishList) => void;
  removeFromWish: (serverId: string | undefined) => void;
  ordersBuys: Order[];
  ordersSells: SellOrder[];
  addOrderBuys: (orders: Order[]) => void;
  orderBuysLength: number;
  addOrderSells: (orders: SellOrder[]) => void;
  orderSellsLength: number;
}

const useStore = create<MyCartStore>()(
  persist(
    (set) => ({
      carts: [],
      totalItems: 0,
      devise: { currencyName: "mad", curencyVal: 1 },
      user: null,
      wishlist: [],
      wishListItem: 0,
      ordersBuys: [],
      ordersSells: [],
      orderBuysLength: 0,
      orderSellsLength: 0,
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
      addUserAfterLogin: (userAdded) =>
        set({
          user: userAdded,
        }),
      removeUser: () =>
        set({
          user: null,
        }),
      addToWishList: (server) =>
        set((state) => {
          const productAdded = [...state.wishlist];
          if (!state.wishlist.some((wish) => wish._id === server._id)) {
            return {
              wishlist: [...productAdded, server],
              wishListItem: [...productAdded, server].length,
            };
          }
          return state;
        }),
      removeFromWish: (serverId) =>
        set((state) => {
          if (serverId) {
            const wishListFiltered = [...state.wishlist].filter(
              (wish) => wish._id !== serverId
            );
            return {
              wishlist: wishListFiltered,
              wishListItem: wishListFiltered.length,
            };
          }
          return state;
        }),
      addOrderBuys: (orders) =>
        set(() => {
          return {
            ordersBuys: orders,
            orderBuysLength: orders?.length,
          };
        }),
      addOrderSells: (orders) =>
        set(() => {
          return {
            ordersSells: orders,
            orderSellsLength: orders?.length,
          };
        }),
    }),
    {
      name: "ibendouma-app",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useStore;
