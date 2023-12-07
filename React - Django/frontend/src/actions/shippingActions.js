import { SAVE_SHIPPING_ADDRESS } from '../constants/shippingConstants';


// Define the action to save the shipping address details in the Redux store

export const saveShippingAddress = (shippingDetails) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: shippingDetails,
  });

  // You can also save the shipping address to local storage if needed
  localStorage.setItem('shippingAddress', JSON.stringify(shippingDetails));
};