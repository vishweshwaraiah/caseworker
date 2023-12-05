import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import JvIcon from 'components/JvIcon'
import JvInput from 'components/JvInput'
import {
  USER_NAME,
  USER_PWD,
  USER_MOBILE,
  USER_EMAIL,
} from 'constants/Validation'
import { signupRequest } from 'redux/_actions/auth'
import JvButton from 'components/JvButton'
import { classNames } from 'helpers/globals'

const Signup = (props) => {
  const { toggleScreen } = props
  const dispatch = useDispatch()

  const [signupData, setSignupData] = useState({})
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userMobile, setUserMobile] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [confirmPwd, setConfirm] = useState('')
  const [userNameError, setUserNameError] = useState(false)
  const [userEmailError, setUserEmailError] = useState(false)
  const [userMobileError, setUserMobileError] = useState(false)
  const [userPasswordError, setUserPasswordError] = useState(false)
  const [confirmPwdError, setConfirmPwdError] = useState(false)

  const authDetails = useSelector((state) => state.auth)

  console.log('authDetails', authDetails)

  const submitSignup = (e) => {
    const fields = [
      'userName',
      'userEmail',
      'userMobile',
      'userPassword',
      'confirmPwd',
    ]
    const isValid = fields.every((el, idx) => {
      return signupData[el]
    })

    if (isValid && userPassword === confirmPwd) {
      setUserNameError(false)
      setUserEmailError(false)
      setUserMobileError(false)
      setUserPasswordError(false)
      setConfirmPwdError(false)
      dispatch(signupRequest(signupData))
    }

    if (!userName) {
      setUserNameError(true)
    }

    if (!userEmail) {
      setUserEmailError(true)
    }

    if (!userMobile) {
      setUserMobileError(true)
    }

    if (!userPassword) {
      setUserPasswordError(true)
    }

    if (!confirmPwd) {
      setConfirmPwdError(true)
    }

    const v1 = USER_NAME.test(userName)
    const v2 = USER_PWD.test(userPassword)
    const v3 = USER_EMAIL.test(userEmail)
    const v4 = USER_MOBILE.test(userMobile)

    if (!v1) {
      setUserNameError(true)
      return
    }

    if (!v2) {
      setUserPasswordError(true)
      return
    }

    if (!v3) {
      setUserEmailError(true)
      return
    }

    if (!v4) {
      setUserMobileError(true)
      return
    }

    if (userPassword !== confirmPwd) {
      setUserPasswordError(true)
      setConfirmPwdError(true)
    }
  }

  const handleChanges = (e) => {
    const { name, value, type, checked } = e.target

    const valueObj = {
      [name]: type === 'checkbox' ? checked : value,
    }

    if (name === 'userName') {
      setUserName(value)
    }

    if (name === 'userEmail') {
      setUserEmail(value)
    }

    if (name === 'userMobile') {
      setUserMobile(value)
    }

    if (name === 'userPassword') {
      setUserPassword(value)
    }

    if (name === 'confirmPwd') {
      setConfirm(value)
    }

    setSignupData((preState) => ({ ...preState, ...valueObj }))
  }

  useEffect(() => {
    if (userName) {
      setUserNameError(false)
    } else {
      setUserNameError(true)
    }
  }, [userName])

  useEffect(() => {
    if (userEmail) {
      setUserEmailError(false)
    } else {
      setUserEmailError(true)
    }
  }, [userEmail])

  useEffect(() => {
    if (userMobile) {
      setUserMobileError(false)
    } else {
      setUserMobileError(true)
    }
  }, [userMobile])

  useEffect(() => {
    if (userPassword) {
      setUserPasswordError(false)
    } else {
      setUserPasswordError(true)
    }
  }, [userPassword])

  useEffect(() => {
    if (confirmPwd) {
      setConfirmPwdError(false)
    } else {
      setConfirmPwdError(true)
    }
  }, [confirmPwd])

  useEffect(() => {
    setUserNameError(false)
    setUserEmailError(false)
    setUserMobileError(false)
    setUserPasswordError(false)
    setConfirmPwdError(false)
  }, [])

  const getClasses = () => {
    const classList = ['box']

    return classNames(classList)
  }

  return (
    <div className="signup-container">
      <div className={getClasses()}>
        <div className="box-form">
          <div className="box-signup-tab"></div>
          <div className="box-signup-title">
            <JvIcon svgName="signin-solid" size="medium" />
            <span className="signup-txt">SIGN UP</span>
          </div>
          <div className="box-signup">
            <div className="fieldset-body" id="signup_form">
              <JvIcon
                svgName="signin-simple"
                size="medium"
                className="b b-form b-signin"
                title="Back to Signin"
                onClick={() => toggleScreen('signin')}
              />

              <div className="field">
                <JvInput
                  label="FULLNAME"
                  name="userName"
                  type="text"
                  title="Full Name"
                  onChange={(e) => handleChanges(e)}
                  className={userNameError ? 'error' : undefined}
                  inputError={userNameError}
                  autoFocus={true}
                />
              </div>
              <div className="field">
                <JvInput
                  label="EMAIL ID"
                  name="userEmail"
                  type="email"
                  title="Email ID"
                  onChange={(e) => handleChanges(e)}
                  className={userEmailError ? 'error' : undefined}
                  inputError={userEmailError}
                />
              </div>
              <div className="field">
                <JvInput
                  label="MOBILE"
                  name="userMobile"
                  type="tel"
                  title="Mobile"
                  onChange={(e) => handleChanges(e)}
                  className={userMobileError ? 'error' : undefined}
                  inputError={userMobileError}
                />
              </div>
              <div className="field">
                <JvInput
                  label="PASSWORD"
                  name="userPassword"
                  type="password"
                  title="Password"
                  onChange={(e) => handleChanges(e)}
                  className={userPasswordError ? 'error' : undefined}
                  inputError={userPasswordError}
                />
              </div>
              <div className="field">
                <JvInput
                  label="CONFIRM"
                  name="confirmPwd"
                  type="password"
                  title="Confirm Password"
                  onChange={(e) => handleChanges(e)}
                  className={confirmPwdError ? 'error' : undefined}
                  inputError={confirmPwdError}
                />
              </div>
              <JvButton
                className="btn-success b-signup"
                type="submit"
                title="Get Signup"
                content="SIGN UP"
                onClick={submitSignup}
                width="full"
                size="medium"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Signup.propTypes = {
  toggleScreen: PropTypes.func,
}

Signup.defaultProps = {
  toggleScreen: () => {},
}

export default Signup
