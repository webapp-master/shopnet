import { SAVE_SHIPPING_ADDRESS } from "../constants/shippingConstants";

// Retrieve shipping address data from localStorage if available
const initialShippingAddress = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

export const shippingAddressReducer = (state = initialShippingAddress, action) => {
  switch (action.type) {
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
