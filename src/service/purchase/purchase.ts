import Request from '..'
import { BetxinRes } from '../types'

export enum PurchaseAPI {
  PostPurchase = '/purchase',
  GetPurchase = '/purchase'
}

export async function createPurchase(tid: string, uid: string, trace_id: string) {
  const data =  {
    tid: tid,
    uid: uid,
    trace_id: trace_id
  }

  return Request.post<BetxinRes>({
    url: PurchaseAPI.PostPurchase,
    data: JSON.stringify(data),
  })
}

export async function getPurchase(tid: string, uid: string) {
  const data =  {
    tid: tid,
    uid: uid,
  }

  return Request.get<BetxinRes>({
    url: PurchaseAPI.GetPurchase + `/uid/${uid}/tid/${tid}`,
  })
}
