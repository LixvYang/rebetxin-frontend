import Request from '..'
import { BetxinRes } from '../types'

export enum RefundAPI {
  CreateRefund = '/refund'
}

export async function createRefund(tid: string, amount: string, select: number) {
  const data =  {
    tid: tid,
    amount: amount,
    select: select
  }

  return Request.post<BetxinRes>({
    url: RefundAPI.CreateRefund,
    // data: JSON.stringify(data),
    data: data,
  })
}
