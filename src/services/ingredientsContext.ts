import React from 'react';

type IngredientsContextType = {
  totalPriceDispatcher: React.Dispatch<any>;
  totalPrice: { price: number };
};

const IngredientsContext = React.createContext<IngredientsContextType | undefined>(undefined);

export default IngredientsContext;
