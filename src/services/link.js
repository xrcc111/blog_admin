import {request, METHOD,} from '@/utils/request'
import {CHAIN, CHAINADD, CHAINUPDATE, CHAINDELETE} from '@/services/api'

export async function chainQuery() {
  return request(CHAIN,METHOD.GET)
}

export async function chainAdd(data) {
  return request(CHAINADD, METHOD.POST,data)
}

export async function chainUpdate(data) {
  return request(CHAINUPDATE, METHOD.POST,data)
}

export async function chainDelete(data) {
  return request(CHAINDELETE, METHOD.POST,data)
}