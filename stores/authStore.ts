import { forgotPassword, login, resetPassword, signUp } from 'API/auth'
import { ILoginForm, IResetPasswordRequest, ISignUpForm } from 'interfaces/auth'
import { IUser } from 'interfaces/user'
import { makeAutoObservable } from 'mobx'
import omit from 'lodash/omit'
import RootStore from 'stores'
import { getUserById } from 'API/user'
import { PLATFORM } from 'enums/common'
import { getAccessToken } from 'utils/common'

export default class AuthStore {
  rootStore: RootStore
  token: string = ''
  user: IUser = {} as IUser
  isLogin: boolean = !!getAccessToken(PLATFORM.WEBSITE)

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false, token: false })
    this.rootStore = rootStore
  }

  async getMyUser(): Promise<void> {
    const userId = localStorage.getItem(`userId`) ?? sessionStorage.getItem(`userId`)
    if (userId) {
      const user = await getUserById(userId)
      this.user = user
      this.isLogin = true
    }
  }

  async getUserbyId(platform: PLATFORM): Promise<void> {
    const userId = localStorage.getItem('userId')
    if (userId) {
      const user = await getUserById(userId)
      this.isLogin = true
      this.user = user
    }
  }

  async login(data: ILoginForm): Promise<void> {
    const { accessToken, user } = await login(omit(data, 'isRemember'))
    console.log('login -> user', user)
    console.log('login -> accessToken', accessToken)
    if (accessToken) {
      if (data?.isRemember) {
        localStorage.setItem('userId', user?.id)
        localStorage.setItem('accessToken', accessToken)
      } else {
        sessionStorage.setItem('userId', user?.id)
        sessionStorage.setItem('accessToken', accessToken)
      }
      this.getMyUser()
      this.token = accessToken
    }
  }

  async signUp(data: ISignUpForm): Promise<void> {
    const { accessToken } =  await signUp(data)
    if(accessToken){
      const loginData = { email: data?.email, password: data?.password }
      // this.login({ ...loginData, isRemember: true }, PLATFORM.WEBSITE)
    }
  }

  async fogotPassword(email: string){
    await forgotPassword(email)
  }

  async resetPassword(data: IResetPasswordRequest, token: string){
    await resetPassword(data, token)
  }


  logout(platform: PLATFORM): void {
    this.isLogin = false
    this.token = ''
    this.user = {} as IUser
    localStorage.removeItem(`${platform}Token`)
    localStorage.removeItem(`${platform}UserId`)
    sessionStorage.removeItem(`${platform}Token`)
    sessionStorage.removeItem(`${platform}UserId`)
  }
}
