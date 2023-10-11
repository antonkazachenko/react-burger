import React from 'react';

type OrderContextType = {
    bunData: any[];
    orderData: any;
    setBunData: React.Dispatch<any>;
    setOrderData: React.Dispatch<any>;
}

const OrderContext = React.createContext<OrderContextType | undefined>(undefined);

export default OrderContext;
