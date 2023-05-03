import Request from '..'
import { BetxinRes } from '../types'

export interface UserInfo {
  user_name?: string
  uid?: string
  identity_number?: string
  avatar_url?: string
  session_id?: string
  ID?: number
  CreatedAt?: Date
  UpdatedAt?: Date
  DeletedAt?: null
}

export enum UserAPI {
  GetUserInfo = '/user',
  PostUser = '/user/signin'
}

export async function getUserInfo() {
  return Request.get<BetxinRes<UserInfo>>({
    url: UserAPI.GetUserInfo,
    showLoading: false,
  })
}
