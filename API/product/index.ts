import api from 'API'
import { IProduct } from 'interfaces/product'

export async function getPublishedProducts(): Promise<IProduct[]> {
  const response = await api.get('/api/v1/seller/products/published')
  return response?.data?.data
}

export async function getDraftProducts(): Promise<IProduct[]> {
  const response = await api.get('/api/v1/seller/products/draft')
  return response?.data?.data
}

export async function getProductByIdForSeller(id: string): Promise<IProduct> {
  const response = await api.get(`api/v1/seller/products/${id}`)
  return response?.data?.data
}

export async function getProductByIdForClient(id: string): Promise<IProduct> {
  const response = await api.get(`api/v1/client/products/${id}`)
  return response?.data?.data
}

export async function getProductsForClient(params: string): Promise<IProduct[]> {
  const response = await api.get(`api/v1/client/products/search${params}`)
  return response?.data?.data
}
