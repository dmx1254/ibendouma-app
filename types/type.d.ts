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
