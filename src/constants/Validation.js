export const USER_NAME = /^[A-Za-z][A-Za-z0-9_]{7,29}$/

export const USER_PWD =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export const USER_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

export const USER_MOBILE = /\(?[0-9]{3}\)?[-.]?[0-9]{3}[-.]?[0-9]{4}$/
