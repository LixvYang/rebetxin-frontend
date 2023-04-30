import { IMainState } from './main/types'
export interface IRootState {
  [x: string]: any
}

export interface IRootWithModule {
  main: IMainState
}

export type IStoreType = IRootState & IRootWithModule
