import {request, METHOD,} from '@/utils/request'
import { MESSAGE, MESSAGEDELETE } from '@/services/api'

// 查询留言
export async function messageQuery(data) {
  return request(MESSAGE,METHOD.GET,data)
}

// 删除留言
export async function messageDelete(data) {
  return request(MESSAGEDELETE, METHOD.POST, data)
}