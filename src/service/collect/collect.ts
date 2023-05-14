import Request from '..'
import { BetxinRes } from '../types'

enum CollectAPI {
  CreateCollect = '/collect',
  DeleteCollect = '/collect'
}

export async function createCollect(tid: string) {
  const data =  {
    tid: tid,
  }

  return Request.post<BetxinRes>({
    url: CollectAPI.CreateCollect,
    data: data,
  })
}

export async function deleteCollect(tid: string) {
  console.log('====================================');
  console.log(tid);
  console.log('====================================');
  const data = {
    tid: tid,
  }
  return Request.delete<BetxinRes>({
    url: CollectAPI.CreateCollect,
    data: data,
  })
}

