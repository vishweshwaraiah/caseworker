import { Outlet } from 'react-router-dom'
import NavBar from 'template/navbar'
import MasterSwitch from 'components/MasterSwitch'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import { useState } from 'react'

const Layout = () => {
  const [theme, setTheme] = useState('Light')
  const rootElement = document.documentElement
  const [currentUser, setCurrentUser] = useState({
    username: 'Vishu',
    firstName: 'Vishweshwarayya',
    lastName: 'Kj',
    age: 33,
    gender: 'Male',
    loggedin: false,
  })
  const [signup, setSignup] = useState(false)

  const clickSignup = (value) => {
    setSignup(value)
  }

  const clickSignin = (value) => {
    setSignup(false)
  }

  const loginUser = (e, data) => {
    if (data?.username && data?.password) {
      setCurrentUser((prevState) => {
        return {
          ...currentUser,
          loggedin: true,
        }
      })
    }
  }

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
      {currentUser.loggedin ? (
        <section>
          <div className="navbar">
            <NavBar user={currentUser} />
            <div className="theme-toggle">
              <span className="theme_name">{theme}</span>
              <MasterSwitch round changeStatus={changeTheme} />
            </div>
          </div>
          <div className="container">
            <Outlet />
          </div>
        </section>
      ) : (
        <section className="authenticate">
          {signup ? (
            <Signup triggerSignin={clickSignin} />
          ) : (
            <Login triggerSignup={clickSignup} clickToLogin={loginUser} />
          )}
        </section>
      )}
    </main>
  )
}

export default Layout
