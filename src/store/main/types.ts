import { Topic } from "@/service/topic/types"

export interface IMainState {
  isMobile: Boolean
  TopicContent: Topic
  businessList: Topic[]
  businessPrePageToken: string
  cryptoList: Topic[]
  cryptoPrePageToken: string
  newList: Topic[]
  newPrePageToken: string
  politicsList: Topic[]
  politicsPrePageToken: string
  sportsList: Topic[]
  sportsPrePageToken: string
  treedingList: Topic[]
  treedingPrePageToken: string
}
