import { SAVE_SHIPPING_ADDRESS } from "../constants/shippingConstants";

// Retrieve shipping address data from localStorage if available
let initialShippingAddress = {}; // Default initial value

try {
  const storedShippingAddress = localStorage.getItem('shippingAddress');
  if (storedShippingAddress) {
    initialShippingAddress = JSON.parse(storedShippingAddress);
  }
} catch (error) {
  console.error('Error parsing shippingAddress from localStorage:', error);
}

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
