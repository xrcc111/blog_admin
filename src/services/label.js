import {request, METHOD,} from '@/utils/request'
import {LABEL,LABELADD, LABELUPDATE, LABELDELETE} from '@/services/api'

export async function labelQuery() {
  return request(LABEL,METHOD.GET)
}

export async function labelAdd(data) {
  return request(LABELADD,METHOD.POST,data)
}

export async function labelUpdate(data) {
  return request(LABELUPDATE,METHOD.POST,data)
}

export async function labelDelete(data) {
  return request(LABELDELETE,METHOD.POST,data)
}