import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import NavBar from 'template/navbar'
import JvSwitch from 'components/JvSwitch'
import Signin from 'pages/Signin'
import Signup from 'pages/Signup'
import useAuth from 'helpers/useAuth'
import JvSpinner from 'components/JvSpinner'
import axios from 'helpers/axios'

const Layout = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const { jwtToken } = useAuth()

  const [theme, setTheme] = useState('light')
  const [loggedin, setLoggedin] = useState(false)
  const rootElement = document.documentElement
  const [signType, setSignType] = useState('loading')

  useEffect(() => {
    if (pathname === '/signin') {
      setSignType('signin')
    }
    if (pathname === '/signup') {
      setSignType('signup')
    }
  }, [pathname])

  const toggleSignup = (value) => {
    setSignType(value)
    navigate('/' + value)
  }

  useEffect(() => {
    const checkValidity = async () => {
      const URL = '/auth/user'
      try {
        const resp = await axios.get(URL)
        if (resp.data) {
          console.log(resp.data)
          return true
        }
      } catch (error) {
        return false
      }
    }

    if (jwtToken && checkValidity()) {
      setLoggedin(true)
    } else {
      setLoggedin(false)
      setSignType('signin')
    }
  }, [])

  const changeTheme = (status) => {
    if (status) {
      setTheme('dark')
      rootElement?.setAttribute('data-theme', 'dark')
    } else {
      setTheme('light')
      rootElement?.setAttribute('data-theme', 'light')
    }
  }

  return (
    <main>
      {loggedin && jwtToken ? (
        <section>
          <div className="navbar">
            <NavBar user={jwtToken} />
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
          {signType === 'signup' && <Signup toggleScreen={toggleSignup} />}
          {signType === 'signin' && <Signin toggleScreen={toggleSignup} />}
          {signType === 'loading' && <JvSpinner isFixed />}
        </section>
      )}
    </main>
  )
}

export default Layout
