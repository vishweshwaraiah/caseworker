import { useState } from 'react'
import { getToken, setToken } from './JwtToken'

const useAuth = () => {
  const [jwtToken, setJwtToken] = useState(getToken())

  const JwtToken = (jwtToken) => {
    setJwtToken(jwtToken)
    setToken(jwtToken)
  }

  return {
    jwtToken,
    setJwtToken: JwtToken,
  }
}

export default useAuth
