import Home from 'pages/Home'
import Cases from 'pages/Cases'
import Contact from 'pages/Contact'
import Users from 'pages/Users'
import IconLib from 'pages/IconLib'

const routes = [
  {
    _id: 'home',
    _name: 'Home',
    _path: '/',
    _component: Home,
  },
  {
    _id: 'cases',
    _name: 'Cases',
    _path: '/cases',
    _component: Cases,
  },
  {
    _id: 'contact',
    _name: 'Contact',
    _path: '/contact',
    _component: Contact,
  },
  {
    _id: 'users',
    _name: 'Users',
    _path: '/users',
    _component: Users,
  },
  {
    _id: 'iconslib',
    _name: 'Icons',
    _path: '/iconslib',
    _component: IconLib,
  },
]

export const getRoutes = routes.map((route) => {
  return route._path
})

export const validRoute = (route) => {
  const getIndex = getRoutes.findIndex((i) => i === route)
  return getIndex !== -1
}

export default routes
