import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from 'template/navbar'
import JvSwitch from 'components/JvSwitch'
import useAuth from 'helpers/useAuth'
import AuthHeader from './authheader'

const Layout = () => {
  const { jwtToken } = useAuth()

  const [theme, setTheme] = useState('light')
  const rootElement = document.documentElement

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
      <section>
        <div className="navbar">
          <NavBar user={jwtToken} />
          <AuthHeader className="auth-box" />
          <div className="theme-toggle">
            <span className="theme_name">{theme}</span>
            <JvSwitch round changeStatus={changeTheme} />
          </div>
        </div>
        <div className="container">
          <Outlet />
        </div>
      </section>
    </main>
  )
}

export default Layout
