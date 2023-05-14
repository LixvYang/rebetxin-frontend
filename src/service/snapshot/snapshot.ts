import Request from '..'
import { BetxinRes } from '../types'

export enum SnapshotAPI {
  CreateSnapshot = '/snapshot',
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
