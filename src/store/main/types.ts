import { TopicList } from "@/service/topic/types"

export interface IMainState {
  isMobile: Boolean
  businessList: TopicList[]
  businessPrePageToken: string
  cryptoList: TopicList[]
  cryptoPrePageToken: string
  newList: TopicList[]
  newPrePageToken: string
  politicsList: TopicList[]
  politicsPrePageToken: string
  sportsList: TopicList[]
  sportsPrePageToken: string
  treedingList: TopicList[]
  treedingPrePageToken: string
}
