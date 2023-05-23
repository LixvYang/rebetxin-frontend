import { Module } from 'vuex'
import { IRootState } from '../types'
import { IUserState } from './types'
import { UserInfo } from '@/service/user/types'
import { signin, getUserInfo } from '@/service/user/user'
import cache from '@/plugins/cache'
import { ref } from 'vue'
import { usePassport } from "@foxone/mixin-passport/lib/helper";

const mainModule: Module<IUserState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {}
    }
  },
  actions:{
    async handleUserLogin({commit}, payload: any) {
      const MaxRetry = 3
      const tokenInfo = ref()
      for (let i = 0; i < MaxRetry; i++) {
        tokenInfo.value = await signin(payload.login_method, payload.token ?? '', payload.sign ?? '', payload.sign_msg ?? '')
        if (tokenInfo.value.data.token != '') {
          break
        }
      }
      const token = tokenInfo.value.data.token
      cache.setCache('_betxin_token', token)
      const userInfo = await getUserInfo()
      commit('changeUserInfo', userInfo.data)
    },
    async getUserInfo({commit}, token: any) {
      const userInfo = await getUserInfo()
      commit('changeUserInfo', userInfo.data)
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = cache.getCache('_betxin_token')
      if (token) {
        dispatch('getUserInfo', token)
      }
    }
  },
  mutations: {
    changeUserInfo(state, userInfo: UserInfo) {
      state.userInfo = userInfo
    }
  }
}

export default mainModule
