import React from "react";

type OrderContextType = {
    bunData: any[];
    orderData: any;
    setBunData: React.Dispatch<any>;
    setOrderData: React.Dispatch<any>;
}

export const OrderContext = React.createContext<OrderContextType | undefined>(undefined);