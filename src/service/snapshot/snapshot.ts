import Request from '..'
import { BetxinRes } from '../types'
import { GetSnapshotResp } from './types'

export enum SnapshotAPI {
  CreateSnapshot = '/snapshot',
  GetSnapshot = '/snapshot'
}

export async function createSnapshot(tid: string, trace_id: string, uid: string) {
  const data = {
    tid: tid,
    trace_id: trace_id,
    uid: uid
  }
  return Request.post<BetxinRes<any>>({
    url: SnapshotAPI.CreateSnapshot,
    data: data,
    showLoading: false,
  })
}

export async function getSnapshot(trace_id: string) {
  return Request.get<BetxinRes<GetSnapshotResp>>({
    url: SnapshotAPI.GetSnapshot + `?trace_id=${trace_id}`,
    showLoading: false,
  })
}
