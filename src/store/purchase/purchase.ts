import { Module } from 'vuex'
import { IRootState } from '../types'
import { IPurchaseState } from './types'
import { Purchase } from '@/service/purchase/types'
import { getPurchase } from '@/service/purchase/purchase'

const purchaseModule: Module<IPurchaseState, IRootState> = {
  namespaced: true,
  state() {
    return {
      purchaseInfo: {}
    }
  },
  actions: {
    async handleGetPurchase({commit}, payload: any) {
      const {uid, tid} = payload
      const res = await getPurchase(tid, uid)
      if (res.code !== 0) {
        commit('changePurchaseInfo', {})
        return
      }
      commit('changePurchaseInfo', res.data)
    },
  },
  mutations: {
    changePurchaseInfo(state, purchase: Purchase) {
      state.purchaseInfo = purchase
    }
  }
}

export default purchaseModule
