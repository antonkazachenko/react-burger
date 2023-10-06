import React from "react";

type IngredientsContextType = {
  data: any[];
  totalPriceDispatcher: React.Dispatch<any>;
  totalPrice: { price: number };
};

export const IngredientsContext = React.createContext<IngredientsContextType | undefined>(undefined);