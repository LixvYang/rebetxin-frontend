import { Module } from 'vuex'
import { IRootState } from '../types'
import { IMainState } from './types'
import { TopicList } from '@/service/topic/types'
import { getTopicsByCid } from '@/service/topic/topic'

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      isMobile: true,
      businessList: [],
      businessPrePageToken: '',
      cryptoList: [],
      cryptoPrePageToken: '',
      newList: [],
      newPrePageToken: '',
      politicsList: [],
      politicsPrePageToken: '',
      sportsList: [],
      sportsPrePageToken: '',
      treedingList: [],
      treedingPrePageToken: ''
    }
  },
  actions: {
    async handleTopicList({commit, state}, payload: any) {
      const { cid, category } = payload
      const AppendName = `append${category}List`
      const ChangeName = `change${category}Token`
      let token: string

      switch (category) {
      case 'Business':
        token = state.businessPrePageToken
        break
      case 'Crypto':
        token = state.cryptoPrePageToken
        break
      case 'Treeding':
        token = state.treedingPrePageToken
        break
      case 'New':
        token = state.newPrePageToken
        break
      case 'Sports':
        token = state.sportsPrePageToken
        break
      case 'Politics':
        token = state.politicsPrePageToken
        break
      default:
        token = ''
      }

      const res = await getTopicsByCid(cid, token)
      if (res.code === 0) {
        commit(AppendName, res.data.list)
        commit(ChangeName, res.data.pre_page_token)
      }
    }
  },
  mutations: {
    changeIsMobile(state, isMobile: Boolean) {
      state.isMobile = isMobile
    },
    changeBusinessList(state, list: TopicList[]) {
      state.businessList = list
    },
    appendBusinessList(state, list: TopicList[]) {
      for (let i = 0; i < list.length; i++) {
        state.businessList.push(list![i])
      }
    },
    changeBusinessToken(state, token: string) {
      state.businessPrePageToken = token
    },
    changeCryptoList(state, list: TopicList[]) {
      state.cryptoList = list
    },
    changeCryptoToken(state, token: string) {
      state.cryptoPrePageToken = token
    },
    appendCryptoList(state, list: TopicList[]) {
      for (let i = 0; i < list.length; i++) {
        state.cryptoList.push(list![i])
      }
    },
    changeNewList(state, list: TopicList[]) {
      state.newList = list
    },
    changeNewToken(state, token: string) {
      state.newPrePageToken = token
    },
    appendNewList(state, list: TopicList[]) {
      for (let i = 0; i < list.length; i++) {
        state.newList.push(list![i])
      }
    },
    changePoliticsList(state, list: TopicList[]) {
      state.politicsList = list
    },
    changePoliticsToken(state, token: string) {
      state.politicsPrePageToken = token
    },
    appendPoliticsList(state, list: TopicList[]) {
      for (let i = 0; i < list.length; i++) {
        state.politicsList.push(list![i])
      }
    },
    changeSportsList(state, list: TopicList[]) {
      state.sportsList = list
    },
    changeSportsToken(state, token: string) {
      state.sportsPrePageToken = token
    },
    appendSportsList(state, list: TopicList[]) {
      for (let i = 0; i < list.length; i++) {
        state.sportsList.push(list![i])
      }
    },
    changeTrendingList(state, list: TopicList[]) {
      state.treedingList = list
    },
    changeTrendingToken(state, token: string) {
      state.treedingPrePageToken = token
    },
    appendTrendingList(state, list: TopicList[]) {
      for (let i = 0; i < list.length; i++) {
        state.treedingList.push(list![i])
      }
    },
  }
}

export default mainModule
