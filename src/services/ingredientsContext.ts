import React from "react";

type IngredientsContextType = {
  data: any[]; // Replace any with a more specific type if available.
  totalPriceDispatcher: React.Dispatch<any>; // Replace any with the action type you expect.
  totalPrice: { price: number };
};

export const IngredientsContext = React.createContext<IngredientsContextType | undefined>(undefined);