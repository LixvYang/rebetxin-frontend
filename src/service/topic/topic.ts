import Request from '..'
import { BetxinRes } from '../types'
import { Data } from './types'

export enum TopicAPI {
  GetTopicsByCid = '/topics/',
  SearchTopic = '/user/signin'
}

export async function getTopicsByCid(cid: string, token: string, uid?: string) {
  let url = TopicAPI.GetTopicsByCid + `${cid}?page_token=${token}`
  if (uid !== '') {
    url = TopicAPI.GetTopicsByCid + `${cid}?page_token=${token}&uid=${uid}`
  }
  console.log('====================================');
  console.log(url);
  console.log('====================================');
  return Request.get<BetxinRes<Data>>({
    url: url,
    showLoading: false,
  })
}
