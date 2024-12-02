import api from 'API'
import { IShop } from 'interfaces/shop'

export async function getAllShops(): Promise<IShop[]> {
  const response = await api.get('/api/v1/admin/shops/active')
  return response?.data?.data
}

export async function getMyShop(): Promise<IShop> {
  const response = await api.get('/api/v1/seller/shops')
  return response?.data?.data
}
