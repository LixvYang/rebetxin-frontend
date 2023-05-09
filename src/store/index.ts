import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import main from './main/main'
import user from './user/user'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: 'lixin'
    }
  },
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    main,
    user,
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export function setupStore() {
  store.dispatch('user/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}

export default store
