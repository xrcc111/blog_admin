//跨域代理前缀
const API_PROXY_PREFIX='/api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
module.exports = {
  LOGIN: `${BASE_URL}/users/login`,
  ROUTES: `${BASE_URL}/routes`,
  LABEL:`${BASE_URL}/label`,
  LABELADD:`${BASE_URL}/label/add`,
  LABELUPDATE:`${BASE_URL}/label/update`,
  LABELDELETE:`${BASE_URL}/label/delete`,
  CHAIN:`${BASE_URL}/links`,
  CHAINADD:`${BASE_URL}/links/add`,
  CHAINUPDATE:`${BASE_URL}/links/update`,
  CHAINDELETE:`${BASE_URL}/links/delete`
}
