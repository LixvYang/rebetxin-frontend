import Request from '..'
import { BetxinRes } from '../types'
import { Data, Topic } from './types'

export enum TopicAPI {
  GetTopicsByCid = '/topics/',
  SearchTopic = '/user/signin',
  GetTopicByTid = '/topic'
}

export async function getTopicsByCid(cid: string, token: string, uid?: string) {
  let url = TopicAPI.GetTopicsByCid + `${cid}?page_token=${token}`
  if (uid !== '') {
    url = TopicAPI.GetTopicsByCid + `${cid}?page_token=${token}&uid=${uid}`
  }
  return Request.get<BetxinRes<Data>>({
    url: url,
    showLoading: false,
  })
}

export async function getTopicByTid(tid: string, uid?: string) {
  return Request.get<BetxinRes<Topic>>({
    url:  `${TopicAPI.GetTopicByTid}/${tid}?uid=${uid}`,
    showLoading: false,
  })
}
