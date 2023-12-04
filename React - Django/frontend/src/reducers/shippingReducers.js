import { SAVE_SHIPPING_ADDRESS } from '../constants/shippingConstants';

export const shippingAddressReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return state;
  }
};
