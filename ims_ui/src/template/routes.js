import Home from 'pages/Home'
import Cases from 'pages/Cases'
import Contact from 'pages/Contact'
import Users from 'pages/Users'
import IconLib from 'pages/IconLib'
import Auth from 'pages/Auth'

const allRoutes = [
  {
    routeId: 'home',
    routeName: 'Home',
    routePath: '/',
    routeComp: Home,
    isMenu: true,
    isPrivate: false,
  },
  {
    routeId: 'cases',
    routeName: 'Cases',
    routePath: '/cases',
    routeComp: Cases,
    isMenu: true,
    isPrivate: true,
  },
  {
    routeId: 'contact',
    routeName: 'Contact',
    routePath: '/contact',
    routeComp: Contact,
    isMenu: true,
    isPrivate: false,
  },
  {
    routeId: 'users',
    routeName: 'Users',
    routePath: '/users',
    routeComp: Users,
    isMenu: true,
    isPrivate: true,
  },
  {
    routeId: 'iconslib',
    routeName: 'Icons',
    routePath: '/iconslib',
    routeComp: IconLib,
    isMenu: true,
    isPrivate: false,
  },
  {
    routeId: 'signin',
    routeName: 'Signin',
    routePath: '/signin',
    routeComp: Auth,
    isMenu: false,
    isPrivate: false,
  },
  {
    routeId: 'signup',
    routeName: 'Signup',
    routePath: '/signup',
    routeComp: Auth,
    isMenu: false,
    isPrivate: false,
  },
]

export const getRoutePaths = allRoutes.map((route) => {
  return route.routePath
})

export const validRoute = (route) => {
  const getIndex = getRoutePaths.findIndex((i) => i === route)
  return getIndex !== -1
}

export const menuOnlyRoutes = allRoutes.filter((r) => r.isMenu)

export default allRoutes
