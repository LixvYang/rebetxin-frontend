import Request from '..'
import { Topic } from '../topic/types'
import { BetxinRes } from '../types'
import { Purchase } from './types'

export enum PurchaseAPI {
  PostPurchase = '/purchase',
  GetPurchase = '/purchase',
  ListPurchase = '/purchase'
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
  return Request.get<BetxinRes<Purchase>>({
    url: PurchaseAPI.GetPurchase + `/uid/${uid}/tid/${tid}`,
  })
}

export async function getPurchaseList() {
  return Request.get<BetxinRes<Topic[]>>({
    url: PurchaseAPI.ListPurchase,
  })
}
