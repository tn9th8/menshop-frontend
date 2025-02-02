import api, { auth, handleError } from 'API'
import { IUser, IUserPagination } from 'interfaces/user'
import get from 'lodash/get'

const USER_URL = '/api/v1/users'

export async function getAllUsers(filter = '') {
  try {
    const response = await api.get('/api/v1/admin/users/active')
    return {
      users: response?.data?.data,
      total: response?.data?.metadata?.items
    }
  } catch (error) {
    handleError(error as Error, 'API/user', 'getAllUsers')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function getUserById(userId: string): Promise<IUser> {
  try {
    const response = await api.get(`api/v1/admin/users/${userId}`)
    return response?.data?.data
  } catch (error) {
    handleError(error as Error, 'API/user', 'getUserById')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function updateUser(userId: string, data: IUser): Promise<IUser> {
  try {
    const response = await api.post(`${USER_URL}/${userId}`, data, {
      headers: auth()
    })
    return response.data.metadata.user
  } catch (error) {
    handleError(error as Error, 'API/user', 'updateUser')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}

export async function deleteUser(userId: string): Promise<void> {
  try {
    await api.delete(`${USER_URL}/${userId}`, {
      headers: auth()
    })
  } catch (error) {
    handleError(error as Error, 'API/user', 'deleteUser')
    const errorMessage: string = get(error, 'data.error.message', '') || JSON.stringify(error)
    throw new Error(errorMessage)
  }
}