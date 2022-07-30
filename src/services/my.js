import {request, METHOD,} from '@/utils/request'
import { MY } from '@/services/api'

export async function userQuery() {
  return request(MY,METHOD.GET)
}