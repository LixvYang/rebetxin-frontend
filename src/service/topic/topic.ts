import Request from '..'
import { BetxinRes } from '../types'
import { Data } from './types'

export enum TopicAPI {
  GetTopicsByCid = '/topics/',
  SearchTopic = '/user/signin'
}

export async function getTopicsByCid(cid: string, token: string) {
  return Request.get<BetxinRes<Data>>({
    url: TopicAPI.GetTopicsByCid + `${cid}?page_token=${token}`,
    showLoading: false,
  })
}
