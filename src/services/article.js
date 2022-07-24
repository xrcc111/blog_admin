import {request, METHOD} from '@/utils/request'
import {ARTICLE,ARTICLEADD, ARTICLEUPDATE, ARTICLEDELETE, ARTICLEQUERY} from '@/services/api'

export async function articleQuery(data) {
  return request(ARTICLE, METHOD.GET, data)
}

export async function articleAdd(data) {
  return request(ARTICLEADD, METHOD.POST, data)
}

export async function articleUpdate(data) {
  return request(ARTICLEUPDATE, METHOD.POST, data)
}

export async function articleDelete(data) {
  return request(ARTICLEDELETE, METHOD.POST, data)
}

export async function articleQueryOne(data) {
  return request(ARTICLEQUERY, METHOD.GET, data)
}