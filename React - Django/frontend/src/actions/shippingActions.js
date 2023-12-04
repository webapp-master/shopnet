// In shippingActions.js
import { SAVE_SHIPPING_ADDRESS } from '../constants/shippingConstants';

export const saveShippingAddress = (shippingAddress, orderId) => (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: {
            shippingAddress,
            orderId,
        },
    });

    // You can also save the shipping address to local storage if needed
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
};
