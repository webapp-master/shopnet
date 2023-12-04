import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducers,productDetailsReducers} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducers } from './reducers/userReducers';
import { userRegisterReducers } from './reducers/userReducers';
import { shippingAddressReducer } from './reducers/shippingReducers'; // Import the shipping address reducer


const reducer =combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    cart:cartReducer,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    shippingAddress: shippingAddressReducer, // Add the shipping address reducer to the root reducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')): []

const userInfoFromStorage = localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')): null



const initialState = {
    cart: {
      cartItems: cartItemsFromStorage,
      // Other cart-related state fields if any
    },
    userLogin: {
      userInfo: userInfoFromStorage,
      // Other user-related state fields if any
    },
    // Add other top-level state slices if present
  };
  

const middleware=[thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;