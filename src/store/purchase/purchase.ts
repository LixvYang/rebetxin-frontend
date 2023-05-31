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
      if (!uid || !tid) {
        return
      }
      const res = await getPurchase(tid, uid)
      if (res.code !== 0) {
        commit('changePurchaseInfo', {
          id: 1,
          uid: uid,
          tid: tid,
          yes_price: '0',
          no_price: '0',
          created_at: '',
          updated_at: '',
          deleted_at: null
        })
      } else {
        commit('changePurchaseInfo',res.data)
        return
      }
    },
  },
  mutations: {
    changePurchaseInfo(state, purchase: Purchase) {
      state.purchaseInfo = purchase
    }
  }
}

export default purchaseModule
