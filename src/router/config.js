import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'home',
          name: '我的',
          meta: {
            icon: 'file-ppt'
          },
          component: () => import('@/pages/home')
        },
        {
          path: 'parent1',
          name: '我的博文',
          meta: {
            icon: 'dashboard',
          },
          component: BlankView,
          children: [
            {
              path: 'article',
              name: '文章管理',
              component: () => import('@/pages/article'),
            },
            {
              path: 'label',
              name: '标签管理',
              component: () => import('@/pages/label'),
            },
            {
              path: 'link',
              name: '友链管理',
              component: () => import('@/pages/link'),
            },
            {
              path: 'message',
              name: '留言管理',
              component: () => import('@/pages/message'),
            }
          ]
        },
        {
          path: 'resources',
          name: '网站资源',
          meta: {
            icon: 'form'
          },
          component: BlankView,
          children: [
            {
              path: 'sitelog',
              name: '网站日志',
              component: () => import('@/pages/site'),
            }
          ]
        },
        {
          path: 'exception',
          name: '异常页',
          meta: {
            icon: 'warning',
          },
          component: BlankView,
          children: [
            {
              path: '404',
              name: 'Exp404',
              component: () => import('@/pages/exception/404')
            },
            {
              path: '403',
              name: 'Exp403',
              component: () => import('@/pages/exception/403')
            },
            {
              path: '500',
              name: 'Exp500',
              component: () => import('@/pages/exception/500')
            }
          ]
        },
        {
          name: '验权页面',
          path: 'auth/demo',
          meta: {
            icon: 'file-ppt',
            authority: {
              permission: 'form',
              role: 'manager'
            },
            component: () => import('@/pages/demo')
          }
        }
      ]
    }
  ]
}

export default options
