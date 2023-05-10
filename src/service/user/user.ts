import Request from '..'
import { BetxinRes } from '../types'
import { SigninRespData, UserInfo } from './types'

export enum UserAPI {
  GetUserInfo = '/user',
  PostUser = '/user/signin'
}

export async function getUserInfo() {
  return Request.get<BetxinRes<UserInfo>>({
    url: UserAPI.GetUserInfo,
    showLoading: false,
    maxRedirects: 5,
    maxBodyLength: 10 * 1024 * 1024, // 最大响应体大小（10 MB）
  })
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

