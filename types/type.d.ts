declare interface ServerP {
  _id: string;
  serverName: string;
  serverCategory: string;
  serverStatus: string;
  serverPrice: number;
  serverMinQty: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface SellServerType {
  _id: string;
  serverName: string;
  serverCategory: string;
  serverStatus: string;
  serverPriceDh: number;
  serverMinQty: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ToastProps {
  text1?: string; // Texte principal
  text2?: string; // Texte secondaire
  type?: "success" | "error" | "info"; // Type de toast
  position?: "top" | "bottom" | "center"; // Position du toast
  visibilityTime?: number; // Temps de visibilité
  onHide?: () => void; // Callback lors de la fermeture
  [key: string]: any; // Propriétés supplémentaires personnalisées
}

export interface CUR {
  _id: string;
  [string]: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface USERSIGNIN {
  email: string;
  password: string;
}

export type Product = {
  productId: string;
  category: string;
  server: string;
  qty: number;
  amount: number;
  price: number;
  character: string;
};

export type Order = {
  _id: string;
  orderNum: string;
  cur?: string;
  paymentMethod: string;
  products: Product[];
  address: string;
  status: string;
  totalPrice: string;
  date: string;
  detailUser?: any;
  paid: string;
  orderIdPaid: string;
  infoObjetctPay?: any;
  createdAt: Date;
  updatedAt: Date;
};

export type Orders = Order[];

export type SellOrder = {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  currencymethod: string;
  _id: string;
  userId: string;
  numBuy: string;
  jeu: string;
  server: string;
  pu: number;
  qte: number;
  totalPrice: number;
  paymentInfoDetails?: string;
  detailUser?: any;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderSelling = SellOrder[];

export interface WishList extends ServerP {
  userId: string;
}

export interface ProfilePage {
  icon: string;
  title: string;
  value: string;
  path: string;
}

export type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  isQty?: boolean;
};


export interface Cart {
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
  character: string;
}

