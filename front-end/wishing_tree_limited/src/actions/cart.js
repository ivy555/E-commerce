import product from '../apis/api'
import {
  CART_ADD_ITEM,
  UPDATE_CART_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from './types'

export const addToCart = (productId, qty, sizeType, color) => async (
  dispatch,
  getState,
) => {
  const { data } = await product.get(`/product/${productId}`)

  const getSize = data.size.filter((s) => s.sizeType === sizeType)

  const colorRemaining = getSize[0].colors.filter(
    (s) => s.color[getState().settings.language] === color,
  )
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productId: data._id,
      name: data.productName[getState().settings.language],
      image: data.image,
      price: data.price[getState().settings.currency],
      size: sizeType,
      qty: Number(qty),
      color: color,
      totalSize: colorRemaining ? colorRemaining[0].count : 1,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCart = (
  productId,
  qty,
  sizeType,
  color,
  cartIndex,
) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_CART_ITEM,
    payload: {
      productId: productId,
      qty: Number(qty),
      size: sizeType,
      color: color,
      cartIndex: cartIndex,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemInCart = (productId, size, color) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: {
      productId: productId,
      size: size,
      color: color,
    },
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  })
  localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}
