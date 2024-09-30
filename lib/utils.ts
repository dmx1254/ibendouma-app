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
  },
  {
    id: "pac18",
    name: "PayPal",
    slug: "paypal",
    icon: "account-balance-wallet",
  },
  {
    id: "qbj36",
    name: "Google Pay",
    slug: "google-pay",
    icon: "payment",
  },
  {
    id: "yen57",
    name: "Apple Pay",
    slug: "apple-pay",
    icon: "smartphone",
  },
  {
    id: "xkq91",
    name: "Bank Transfer",
    slug: "bank-transfer",
    icon: "account-balance",
  },
  {
    id: "gxi17",
    name: "Cryptocurrency",
    slug: "cryptocurrency",
    icon: "attach-money",
  },
];

interface PAYMENTMETHOD {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface UserRegister{
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