import Request from '..'
import { BetxinRes } from '../types'
import { TopicCollect } from './types'

enum CollectAPI {
  CreateCollect = '/collect',
  DeleteCollect = '/collect',
  ListCollect = '/collect'
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
  const data = {
    tid: tid,
  }
  return Request.delete<BetxinRes>({
    url: CollectAPI.CreateCollect,
    data: data,
  })
}

export async function getCollectList() {
  return Request.get<BetxinRes<TopicCollect[]>>({
    url: CollectAPI.ListCollect,
  })
}
