import { Module } from 'vuex'
import { IRootState } from '../types'
import { IMainState } from './types'
import { Topic } from '@/service/topic/types'
import { getTopicByTid, getTopicsByCid } from '@/service/topic/topic'

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      isMobile: true,
      TopicContent: {},
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
    },
    async handleCollectAction({commit}, payload: any) {
      const { category, tid, is_collect } = payload
      console.log('====================================');
      console.log(payload);
      console.log('====================================');
      const ChangeName = `change${category}ListCollect`
      commit(ChangeName, {tid: tid, is_collect: is_collect})
    },
    async handleTopicContent({commit}, payload: any) {
      const { tid, uid } = payload
      const res = await getTopicByTid(tid, uid)
      if (res.code === 0) {
        commit('changeTopicContent', res.data)
      }
    }
  },
  mutations: {
    changeTopicContent(state, topic: Topic) {
      state.TopicContent = topic
    },
    changeIsMobile(state, isMobile: Boolean) {
      state.isMobile = isMobile
    },
    changeBusinessList(state, list: Topic[]) {
      state.businessList = list
    },
    appendBusinessList(state, list: Topic[]) {
      for (let i = 0; i < list.length; i++) {
        state.businessList.push(list![i])
      }
    },
    changeBusinessListCollect(state, payload: any) {
      const { tid, is_collect } = payload
      for (let i = 0; i < state.businessList.length; i++) {
        if (state.businessList[i].tid == tid) {
          state.businessList[i].is_collect = is_collect
        }
      }
    },
    changeBusinessToken(state, token: string) {
      state.businessPrePageToken = token
    },
    changeCryptoList(state, list: Topic[]) {
      state.cryptoList = list
    },
    changeCryptoToken(state, token: string) {
      state.cryptoPrePageToken = token
    },
    appendCryptoList(state, list: Topic[]) {
      for (let i = 0; i < list.length; i++) {
        state.cryptoList.push(list![i])
      }
    },
    changeCryptoListCollect(state, payload: any) {
      const { tid, is_collect } = payload
      for (let i = 0; i < state.cryptoList.length; i++) {
        if (state.cryptoList[i].tid == tid) {
          state.cryptoList[i].is_collect = is_collect
        }
      }
    },
    changeNewList(state, list: Topic[]) {
      state.newList = list
    },
    changeNewToken(state, token: string) {
      state.newPrePageToken = token
    },
    appendNewList(state, list: Topic[]) {
      for (let i = 0; i < list.length; i++) {
        state.newList.push(list![i])
      }
    },
    changeNewListCollect(state, payload: any) {
      const { tid, is_collect } = payload
      for (let i = 0; i < state.newList.length; i++) {
        if (state.newList[i].tid == tid) {
          state.newList[i].is_collect = is_collect
        }
      }
    },
    changePoliticsList(state, list: Topic[]) {
      state.politicsList = list
    },
    changePoliticsToken(state, token: string) {
      state.politicsPrePageToken = token
    },
    appendPoliticsList(state, list: Topic[]) {
      for (let i = 0; i < list.length; i++) {
        state.politicsList.push(list![i])
      }
    },
    changePoliticsListCollect(state, payload: any) {
      const { tid, is_collect } = payload
      for (let i = 0; i < state.politicsList.length; i++) {
        if (state.politicsList[i].tid == tid) {
          state.politicsList[i].is_collect = is_collect
        }
      }
    },
    changeSportsList(state, list: Topic[]) {
      state.sportsList = list
    },
    changeSportsToken(state, token: string) {
      state.sportsPrePageToken = token
    },
    appendSportsList(state, list: Topic[]) {
      for (let i = 0; i < list.length; i++) {
        state.sportsList.push(list![i])
      }
    },
    changeSportsListCollect(state, payload: any) {
      const { tid, is_collect } = payload
      for (let i = 0; i < state.sportsList.length; i++) {
        if (state.sportsList[i].tid == tid) {
          state.sportsList[i].is_collect = is_collect
        }
      }
    },
    changeTrendingList(state, list: Topic[]) {
      state.treedingList = list
    },
    changeTrendingToken(state, token: string) {
      state.treedingPrePageToken = token
    },
    appendTrendingList(state, list: Topic[]) {
      for (let i = 0; i < list.length; i++) {
        state.treedingList.push(list![i])
      }
    },
    changeTreedingListCollect(state, payload: any) {
      const { tid, is_collect } = payload
      for (let i = 0; i < state.treedingList.length; i++) {
        if (state.treedingList[i].tid == tid) {
          state.treedingList[i].is_collect = is_collect
        }
      }
    },
  }
}

export default mainModule
