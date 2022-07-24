//跨域代理前缀
const API_PROXY_PREFIX='/api'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
module.exports = {
  LOGIN: `${BASE_URL}/users/login`, // 用户登录
  ROUTES: `${BASE_URL}/routes`,
  LABEL:`${BASE_URL}/label`, // 标签
  LABELADD:`${BASE_URL}/label/add`, // 添加标签
  LABELUPDATE:`${BASE_URL}/label/update`, // 更新标签
  LABELDELETE:`${BASE_URL}/label/delete`, //删除标签
  CHAIN:`${BASE_URL}/links`, // 友链
  CHAINADD:`${BASE_URL}/links/add`, // 添加友链
  CHAINUPDATE:`${BASE_URL}/links/update`, // 更新友链
  CHAINDELETE:`${BASE_URL}/links/delete`, // 删除友链
  MESSAGE:`${BASE_URL}/users/manager`, // 留言
  MESSAGEDELETE:`${BASE_URL}/users/delete`, // 删除留言
  ARTICLE:`${BASE_URL}/article`, // 文章
  ARTICLEADD:`${BASE_URL}/article/add`, // 新增文章  
  ARTICLEUPDATE:`${BASE_URL}/article/update`, // 修改文章  
  ARTICLEDELETE:`${BASE_URL}/article/delete`, // 删除文章
  ARTICLEQUERY:`${BASE_URL}/article/query`, //单条文章查询
}
