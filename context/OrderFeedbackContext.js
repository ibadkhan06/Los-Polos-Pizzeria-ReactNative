import { createContext, useContext, useState } from "react";

export const OrderFeedbackContext = createContext();

export const OrderFeedbackProvider = ({ children }) => {
  const [isModal, setIsModal] = useState(false);
  const [orderID, setOrderID] = useState(null);

  return (
    <OrderFeedbackContext.Provider value={{ isModal, setIsModal, orderID, setOrderID }}>
      {children}
    </OrderFeedbackContext.Provider>
  );
};

export const useOrderFeedbackContext = () => {
  return useContext(OrderFeedbackContext);
};
