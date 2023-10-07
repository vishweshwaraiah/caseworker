import { useContext, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from 'context/AuthProvider'
import NavBar from 'template/navbar'
import JvSwitch from 'components/JvSwitch'
import Signin from 'pages/Signin'
import Signup from 'pages/Signup'
import { IsValidObject } from 'helpers/globals'

const Layout = () => {
  const { auth } = useContext(AuthContext)

  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [theme, setTheme] = useState('Light')
  const [loggedin, setLoggedin] = useState(false)
  const rootElement = document.documentElement
  const [signup, setSignup] = useState(false)

  useEffect(() => {
    if (pathname === '/signin') {
      setSignup(false)
    }
    if (pathname === '/signup') {
      setSignup(true)
    }
  }, [pathname])

  const toggleSignup = (value) => {
    if (value === 'signin') {
      setSignup(false)
      navigate('/signin')
    }

    if (value === 'signup') {
      setSignup(true)
      navigate('/signup')
    }
  }

  useEffect(() => {
    if (IsValidObject(auth)) {
      setLoggedin(true)
    }
  }, [auth])

  const changeTheme = (status) => {
    if (status) {
      setTheme('Dark')
      rootElement?.setAttribute('data-theme', 'dark')
    } else {
      setTheme('Light')
      rootElement?.setAttribute('data-theme', 'light')
    }
  }

  return (
    <main>
      {loggedin && auth ? (
        <section>
          <div className="navbar">
            <NavBar user={auth} />
            <div className="theme-toggle">
              <span className="theme_name">{theme}</span>
              <JvSwitch round changeStatus={changeTheme} />
            </div>
          </div>
          <div className="container">
            <Outlet />
          </div>
        </section>
      ) : (
        <section className="authenticate">
          {signup ? (
            <Signup toggleScreen={toggleSignup} />
          ) : (
            <Signin toggleScreen={toggleSignup} />
          )}
        </section>
      )}
    </main>
  )
}

export default Layout
