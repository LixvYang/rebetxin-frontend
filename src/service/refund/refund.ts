import Request from '..'
import { BetxinRes } from '../types'

export enum RefundAPI {
  CreateRefund = '/refund'
}

export async function createRefund(tid: string, uid: string, select: number) {
  const data =  {
    tid: tid,
    uid: uid,
    select: select
  }

  return Request.post<BetxinRes>({
    url: RefundAPI.CreateRefund,
    data: data,
  })
}
