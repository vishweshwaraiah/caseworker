import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Signin from 'pages/Auth/Signin'
import Signup from 'pages/Auth/Signup'
import JvSpinner from 'components/JvSpinner'

const Auth = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const email = useSelector((state) => state.auth.email)
  const mobile = useSelector((state) => state.auth.mobile)

  const [signType, setSignType] = useState('loading')

  useEffect(() => {
    if (pathname === '/signin') {
      setSignType('signin')
    }
    if (pathname === '/signup') {
      setSignType('signup')
    }
  }, [pathname])

  useEffect(() => {
    if (email && mobile) {
      navigate('/')
    }
  }, [email, mobile])

  const toggleSignType = (value) => {
    setSignType(value)
    navigate('/' + value)
  }

  return (
    <section className="authenticate">
      {signType === 'signup' && <Signup toggleScreen={toggleSignType} />}
      {signType === 'signin' && <Signin toggleScreen={toggleSignType} />}
      {signType === 'loading' && <JvSpinner isFixed />}
    </section>
  )
}

export default Auth
