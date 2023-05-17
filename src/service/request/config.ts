export const SITE_URL = 'http://127.0.0.1:4000'
let BASE_URL = ''
const TIME_OUT = 10000
export const POLLING_INTERVAL = 1000; // 轮询间隔为 1 秒
export const PAYMENT_TIMEOUT = 60 * 60 * 1000; // 超时时间为 1 小时（以毫秒为单位）


export enum MixinConfig {
  Pin =  "250893",
  ClientId= "30aad5a5-e5f3-4824-9409-c2ff4152724e",
  SessionId= "bad27d45-dca3-40a5-b1cf-bc8252527ec9",
  PinToken= "be7KHTguCA48ri8V58o7VRwUDOR_YptKWg6t-loOKWU",
  PrivateKey= "6ITeXg_FAgBDDj7KmpvTG_9XnMYHz4vVQGyx06wCa_4sDHMIzVOGoowqHRUYA4WswaNP7HVre18rduJiZuYeiQ",
  AppSecret= "3393cf8cd5350921ddfacbcf7600b2538f99cbfa9dd32eccfd759bc6076f7e97",

  DefaultAssetId = "965e5c6e-434c-3fa9-b780-c50f43cd955c"
}


if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://127.0.0.1:8888/api/v1'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://43.143.154.162:3000/api/v1/'
} else {
  BASE_URL = 'http://localhost/api/v1/'
}

export { BASE_URL, TIME_OUT }
