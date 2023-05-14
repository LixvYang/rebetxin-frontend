import { IMainState } from './main/types'
import { IPurchaseState } from './purchase/types'
import { IUserState } from './user/types'
export interface IRootState {
  [x: string]: any
}

export interface IRootWithModule {
  main: IMainState
  user: IUserState
  purchase: IPurchaseState
}

export type IStoreType = IRootState & IRootWithModule
