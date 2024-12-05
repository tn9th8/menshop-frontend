import api, { auth, handleError } from 'API'
import { PLATFORM } from 'enums/common'
import { IDiscount, IDiscountPagination } from 'interfaces/discount'
import get from 'lodash/get'

const DISCOUNT_URL = '/api/v1/discounts'

export async function searchDiscounts(code: string): Promise<IDiscountPagination> {
  try {
    const response = await api.get(`${DISCOUNT_URL}/search/${code}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/discount', 'searchDiscounts')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getAllDiscountsByShop(shop: string): Promise<any[]> {
  try {
    const response = await api.get(`api/v1/client/discounts?shop=${shop}`)
    return response?.data?.data
  } catch (error) {
    handleError(error as Error, 'API/discount', 'getAllDiscountsByShop')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getValidDiscounts(params: string): Promise<any[]> {
  const response = await api.get(`api/v1/admin/discounts/valid${params}`)
  return response?.data?.data
}

export async function getExpiredDiscounts(params: string): Promise<any[]> {
  const response = await api.get(`api/v1/admin/discounts/expired${params}`)
  return response?.data?.data
}

export async function getDiscountDetail(discountId: string): Promise<IDiscount> {
  try {
    const response = await api.get(`${DISCOUNT_URL}/${discountId}`, {
      headers: auth(PLATFORM.CMS)
    })
    return response.data.metadata
  } catch (error) {
    handleError(error as Error, 'API/discount', 'getDiscountDetail')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function createDiscount(discount: IDiscount): Promise<void> {
  try {
    await api.post(DISCOUNT_URL, discount, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/discount', 'createDiscount')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}


export async function updateDiscount(discountId: string, discount: IDiscount): Promise<void> {
  try {
    await api.post(`${DISCOUNT_URL}/${discountId}`, discount, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/discount', 'updateDiscount')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteDiscount(discountId: string): Promise<void> {
  try {
    await api.delete(`${DISCOUNT_URL}/${discountId}`, {
      headers: auth(PLATFORM.CMS)
    })
  } catch (error) {
    handleError(error as Error, 'API/discount', 'deleteDiscount')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}
