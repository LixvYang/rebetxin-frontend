import Request from '..'
import { BetxinRes } from '../types'
import { UserAPI } from './getuserinfo'

export interface SignIn {
  login_method?: string
  mixin_token?: string
  sign?: string
  sign_msg?: string
}

export interface SigninRespData {
  token?: string
}

export async function signin(login_method?: string, mixin_token?: string, sign?: string, sign_msg?: string) {

  const data = {
    login_method: login_method,
    mixin_token: mixin_token,
    sign: sign,
    sign_msg: sign_msg
  }
  return Request.post<BetxinRes<SigninRespData>>({
    url: UserAPI.PostUser,
    showLoading: false,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
