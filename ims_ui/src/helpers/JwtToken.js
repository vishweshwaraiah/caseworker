export const getToken = () => {
  const tokenString = localStorage.getItem('token')
  const jwtToken = JSON.parse(tokenString)
  return jwtToken
}

export const setToken = (jwtToken) => {
  localStorage.setItem('token', JSON.stringify(jwtToken))
}
