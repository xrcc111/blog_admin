import {request, METHOD,} from '@/utils/request'
import {LABEL} from '@/services/api'

export async function labelQuery() {
  return request(LABEL,METHOD.GET)
}