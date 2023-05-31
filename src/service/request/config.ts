export const SITE_URL = 'http://127.0.0.1:4000'
let BASE_URL = ''
const TIME_OUT = 10000
export const POLLING_INTERVAL = 3000; // 轮询间隔为 3 秒
export const PAYMENT_TIMEOUT = 60 * 60 * 1000; // 超时时间为 1 小时（以毫秒为单位）


export enum MixinConfig {
  Pin =  "598823",
  ClientId= "30aad5a5-e5f3-4824-9409-c2ff4152724e",
  SessionId= "2a01423c-3f1a-4e8a-9bf9-075373ed52ed",
  PinToken= "--466fC5f9_qH4R63XeavkJrs7pPmwJMH2qp4hBfFDg",
  PrivateKey= "RRH17kF1Y4RBhmZarmkN7ApPV4CitirhglN5hoL8d3_2p474Upqz_1Zpu7pfb3MV2vcehoE6o5pPpb3zDtRZPQ",
  AppSecret= "3393cf8cd5350921ddfacbcf7600b2538f99cbfa9dd32eccfd759bc6076f7e97",

  DefaultAssetId = "965e5c6e-434c-3fa9-b780-c50f43cd955c"
}


if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://0.0.0.0:8888/api/v1'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://demo.betxin.one/api/v1/'
} else {
  BASE_URL = 'http://localhost/api/v1/'
}

export { BASE_URL, TIME_OUT }
