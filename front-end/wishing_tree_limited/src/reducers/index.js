import { combineReducers } from 'redux'
import { productListReducer, productDetailsReducer } from './productReducers'
import { cartReducer } from './cartReducers'
import { changeSettingsReducer } from './settingsReducers'
import {
  userAuthenticationReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './userReducers'

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  settings: changeSettingsReducer,
  userAuth: userAuthenticationReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null

export const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  settings: { language: 'en', country: 'hk', currency: 'hkd' },
  userAuth: { userInfo: userInfoFromStorage },
}
