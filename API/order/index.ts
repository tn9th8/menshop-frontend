import api from 'API'
import { IReviewCheckout } from 'interfaces/order'

export async function getReviewCheckout(data: any): Promise<IReviewCheckout> {
  const response = await api.post('/api/v1/client/orders/review-checkout', data)
  return response?.data?.data
}

export async function confirmCheckout(data: any): Promise<IReviewCheckout> {
  const response = await api.post('/api/v1/client/orders/confirm-checkout', data)
  return response?.data?.data
}
