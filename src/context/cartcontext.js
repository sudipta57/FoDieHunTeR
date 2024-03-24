"use client";
import cartReducer from "@/reducers/cartReducer";

const { createContext, useReducer, useState } = require("react");

export const cartContext = createContext();

const initialstate = {
  islogin: false,
};

const CartcontextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialstate);
  const [cartdata, setcartdata] = useState([]);
  return (
    <cartContext.Provider value={{ state, dispatch, cartdata, setcartdata }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartcontextProvider;
