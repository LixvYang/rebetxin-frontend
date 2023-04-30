import { Module } from 'vuex'
import { IRootState } from '../types'
import { IMainState } from './types'

const mainModule: Module<IMainState, IRootState> = {
  namespaced: true,
  state() {
    return {
      isMobile: true
    }
  },
  mutations: {
    changeIsMobile(state, isMobile: Boolean) {
      state.isMobile = isMobile
    }
  }
}

export default mainModule
