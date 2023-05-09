import { IMainState } from './main/types'
import { IUserState } from './user/types'
export interface IRootState {
  [x: string]: any
}

export interface IRootWithModule {
  main: IMainState
  user: IUserState
}

export type IStoreType = IRootState & IRootWithModule
