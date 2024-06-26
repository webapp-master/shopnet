import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_RESET } from '../constants/cartConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data.id,
            name: data.name,
            image: data.image,
            price: data.price,
            tax: data.tax,
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





export const resetCart = () => (dispatch) => {
  dispatch({
    type: CART_RESET,
  });
  localStorage.removeItem('cartItems'); // Clear cartItems from localStorage
};
