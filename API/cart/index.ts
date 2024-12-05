import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import {
  ICart,
  IAddToCart,
  IUpdateToCart,
  IDeleteCart,
  IUpdatedCart,
} from 'interfaces/cart'
import get from 'lodash/get'

const CART_URL = '/api/v1/carts'

export async function addToCart(data: IAddToCart): Promise<void> {
  try {
    await api.patch('api/v1/client/carts/add-to-cart', data)
  } catch (error) {
    handleError(error as Error, 'API/cart', 'addToCart')
    const errorMessage: string =
    get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getMyCarts(): Promise<ICart[]> {
  try {
    const response = await api.get('api/v1/client/cart-discount')
    return response?.data?.data
  } catch (error) {
    handleError(error as Error, 'API/cart', 'getMyCarts')
    const errorMessage: string =
    get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function updateQuantity(data: { _id: string, quantity: number }): Promise<void> {
  await api.patch('api/v1/client/carts/update-quantity', data)
}

export async function updateCart(data: IUpdateToCart): Promise<IUpdatedCart> {
  try {
    const response = await api.post(`${CART_URL}/update`, data, {
      headers: auth(PLATFORM.WEBSITE),
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/cart', 'updateCart')
    const errorMessage: string =
    get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteCart(data: IDeleteCart): Promise<void> {
  try {
    await api.patch('api/v1/client/carts/remove-from-cart', data)
  } catch (error) {
    handleError(error as Error, 'API/cart', 'updateCart')
    const errorMessage: string =
    get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}
