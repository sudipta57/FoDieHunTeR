const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "removeItem":
      const { removeIndex1, removeIndex2 } = action.payload;
      const filteredCart = state.cart
        .map((item, index) => {
          if (index === removeIndex1) {
            return item.filter((_, innerIndex) => innerIndex !== removeIndex2);
          }
          return item;
        })
        .filter((item) => item.length > 0);
      return {
        ...state,
        cart: filteredCart,
      };
    case "isloggedin":
      return {
        ...state,
        islogin: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
