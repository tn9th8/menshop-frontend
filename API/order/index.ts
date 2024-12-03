import api from 'API'
import { IOrder, IReviewCheckout } from 'interfaces/order'

export async function getReviewCheckout(data: any): Promise<IReviewCheckout> {
  const response = await api.post('/api/v1/client/orders/review-checkout', data)
  return response?.data?.data
}

export async function confirmCheckout(data: any): Promise<IReviewCheckout> {
  const response = await api.post('/api/v1/client/orders/confirm-checkout', data)
  return response?.data?.data
}

export async function getMyOrders(status: string): Promise<IOrder[]> {
  const response = await api.get(`api/v1/client/orders?status=${status}`)
  return response?.data?.data
}

export async function cancelOrder(id: string): Promise<IOrder[]> {
  const response = await api.patch(`api/v1/client/orders/${id}`)
  return response?.data?.data
}
