import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'
import main from './main/main'

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
    main
  }
})

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
