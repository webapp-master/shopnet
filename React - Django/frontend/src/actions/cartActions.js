import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'; // Import the constant


export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}



// Define the action to save the shipping address
export const saveShippingAddress = (shippingAddress) => (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_ADDRESS,
      payload: shippingAddress,
    });
  
    // You can also save the shipping address to local storage if needed
    localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
  };
