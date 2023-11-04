import { SAVE_SHIPPING_ADDRESS } from '../constants/shippingConstants'; 


// Define the action to save the shipping address
export const saveShippingAddress = (shippingAddress) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: shippingAddress,
  });

  // You can also save the shipping address to local storage if needed
  localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
};
