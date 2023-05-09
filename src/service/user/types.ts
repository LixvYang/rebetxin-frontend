
export interface SignIn {
  login_method?: string
  mixin_token?: string
  sign?: string
  sign_msg?: string
}

export interface SigninRespData {
  token?: string
}

export interface UserInfo {
  full_name?: string
  uid?: string
  identity_number?: string
  avatar_url?: string
  biography?: string
  CreatedAt?: Date
  UpdatedAt?: Date
  DeletedAt?: null
}
