import * as SecureStore from "expo-secure-store";

const paypal = require("@/assets/payment-methods/paypal.png");
const cards = require("@/assets/payment-methods/cards.png");
const googlepay = require("@/assets/payment-methods/googlepay.png");
const crypto = require("@/assets/payment-methods/crypto.png");
const trc20 = require("@/assets/payment-methods/trc20.png");

export const getImg = (imgName: string) => {
  let imgToRet = "";
  switch (imgName) {
    case "dofus-kamas":
      imgToRet = require("@/assets/images/dofus-kamas.png");
      break;
    case "dofus-touch":
      imgToRet = require("@/assets/images/dofus-touch.png");
      break;
    case "dofus-retro":
      imgToRet = require("@/assets/images/dofus-retro.png");
      break;

    default:
      imgToRet = require("@/assets/images/dofus-kamas.png");
  }
  return imgToRet;
};

export const getServerImg = (imgName: string) => {
  let imgToRet = "";
  switch (imgName) {
    case "dofus-kamas":
      imgToRet = require("@/assets/server/dofus-server.png");
      break;
    case "dofus-touch":
      imgToRet = require("@/assets/server/touch-server.png");
      break;
    case "dofus-retro":
      imgToRet = require("@/assets/server/retro-server.png");
      break;

    default:
      imgToRet = require("@/assets/server/dofus-server.png");
  }
  return imgToRet;
};

interface ServerCAT {
  id: string;
  title: string;
  slug: string;
}

export const serverCat: ServerCAT[] = [
  {
    id: "YBD80m",
    title: "All servers",
    slug: "all-servers",
  },
  {
    id: "HNG14q",
    title: "Dofus kamas",
    slug: "dofus-kamas",
  },
  {
    id: "KOP81R",
    title: "Dofus touch",
    slug: "dofus-touch",
  },
  {
    id: "ZLA61o",
    title: "Dofus retro",
    slug: "dofus-retro",
  },
];

export const currencies = [
  { id: "mad", name: "mad" },
  { id: "eur", name: "euro" },
  { id: "usd", name: "dollar" },
];

export const paymentMethods: PAYMENTMETHOD[] = [
  {
    id: "nmj47",
    name: "Credit Card",
    slug: "credit-card",
    icon: "credit-card",
    image: cards,
  },
  {
    id: "pac18",
    name: "PayPal",
    slug: "paypal",
    icon: "account-balance-wallet",
    image: paypal,
  },
  {
    id: "qbj36",
    name: "Google Pay",
    slug: "google-pay",
    icon: "payment",
    image: googlepay,
  },
  {
    id: "gxi17",
    name: "Crypto",
    slug: "crypto",
    icon: "attach-money",
    image: crypto,
  },
  {
    id: "kqn52",
    name: "TRC20",
    slug: "trc20",
    icon: "attach-money",
    image: trc20,
  },
];

export interface PAYMENTMETHOD {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
}

export interface UserRegister {
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  // country: string;
  // city: string;
  address: string;
  postalCode: string;
  password: string;
}

export interface USERLOGINRESPONSE {
  _id: string;
  address: string;
  city: string;
  country: string;
  clientIp: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstname: string;
  lastname: string;
  isAdmin: boolean;
  moderator: boolean;
  online: boolean;
  password?: string;
  phone: string;
  profil: string;
}

// interface TOKEN {
//   token: string;
// }

// interface USERID {
//   user: string;
// }

export interface USER {
  person: USERLOGINRESPONSE;
  token: string;
  user: string;
}

export async function saveToken(key: string, value: string) {
  await SecureStore.deleteItemAsync("token");
  await SecureStore.setItemAsync(key, value);
}

export interface DECODEDTOKEN {
  token: TokenDecode | null;
}

interface TokenDecode {
  userId: string;
  iat: Date;
  exp: Date;
}

export const convertedDate = (date: Date) => {
  const dateConverted = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return dateConverted;
};

export const orderBuyStatus = [
  "Terminée",
  "En attente",
  "Annulée",
  "En Cours de payment",
];

export const orderSellStatus = [
  "Payée",
  "En attente",
  "Annulée",
  "En Cours de payment",
];

export const resetTime = (date: Date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export const sellPaymentMethods: string[] = [
  "cih bank",
  "attijariwafa bank",
  "barid bank",
  "Western Union",
  "Cash Plus",
  "ADV Cash",
  "Binance Pay",
  "Payeer",
  "Wise",
  "TRC20",
];

export const codeGenerated = () => {
  const generateRandomCode =
    "0123456789abcdefghijklmnopkrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let myCode = "";
  for (let i = 0; i < 7; i++) {
    let code = Math.floor(Math.random() * generateRandomCode.length);
    myCode += generateRandomCode[code];
  }
  return myCode;
};

export const getLabel = (paymentMethod: string) => {
  switch (paymentMethod) {
    case "cih bank":
    case "attijariwafa bank":
    case "barid bank":
      return "Complete RIB";
    case "Western Union":
    case "Cash Plus":
      return "Full name";
    case "Binance Pay":
    case "Payeer":
    case "Wise":
      return "Payment email";
    case "ADV Cash":
      return "Account number";
    case "TRC20":
      return "TRX address";
    default:
      return "";
  }
};

export const getPlaceholder = (paymentMethod: string) => {
  switch (paymentMethod) {
    case "cih bank":
    case "attijariwafa bank":
    case "barid bank":
      return "Your RIB";
    case "Western Union":
    case "Cash Plus":
      return "Fullname";
    case "Binance Pay":
    case "Payeer":
    case "Wise":
      return "Payment email";
    case "ADV Cash":
      return "Account number";
    case "TRC20":
      return "TRX address";
    default:
      return "";
  }
};
