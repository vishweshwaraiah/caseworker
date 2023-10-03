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

const Signup = (props) => {
  const { toggleScreen } = props
  const dispatch = useDispatch()

  const [signupData, setSignupData] = useState({})
  const [fullname, setFullname] = useState('')
  const [emailid, setEmailid] = useState('')
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [fullnameError, setFullnameError] = useState(false)
  const [emailidError, setEmailidError] = useState(false)
  const [mobileError, setMobileError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmError, setConfirmError] = useState(false)

  const token = useSelector((state) => state.auth?.token)
  const pending = useSelector((state) => state.auth?.pending)
  const error = useSelector((state) => state.auth?.error)

  console.log(token, pending, error)

  const submitSignup = (e) => {
    const fields = ['fullname', 'emailid', 'mobile', 'password', 'confirm']
    const isValid = fields.every((el, idx) => {
      return signupData[el]
    })

    if (isValid && password === confirm) {
      setFullnameError(false)
      setEmailidError(false)
      setMobileError(false)
      setPasswordError(false)
      setConfirmError(false)
      dispatch(signupRequest(signupData))
    }

    if (!fullname) {
      setFullnameError(true)
    }

    if (!emailid) {
      setEmailidError(true)
    }

    if (!mobile) {
      setMobileError(true)
    }

    if (!password) {
      setPasswordError(true)
    }

    if (!confirm) {
      setConfirmError(true)
    }

    const v1 = USER_NAME.test(fullname)
    const v2 = USER_PWD.test(password)
    const v3 = USER_EMAIL.test(emailid)
    const v4 = USER_MOBILE.test(mobile)

    if (!v1) {
      setFullnameError(true)
      return
    }

    if (!v2) {
      setPasswordError(true)
      return
    }

    if (!v3) {
      setEmailidError(true)
      return
    }

    if (!v4) {
      setMobileError(true)
      return
    }

    if (password !== confirm) {
      setPasswordError(true)
      setConfirmError(true)
    }
  }

  const handleChanges = (e) => {
    const { name, value, type, checked } = e.target

    const valueObj = {
      [name]: type === 'checkbox' ? checked : value,
    }

    if (name === 'fullname') {
      setFullname(value)
    }

    if (name === 'emailid') {
      setEmailid(value)
    }

    if (name === 'mobile') {
      setMobile(value)
    }

    if (name === 'password') {
      setPassword(value)
    }

    if (name === 'confirm') {
      setConfirm(value)
    }

    setSignupData((preState) => ({ ...preState, ...valueObj }))
  }

  useEffect(() => {
    if (fullname) {
      setFullnameError(false)
    } else {
      setFullnameError(true)
    }
  }, [fullname])

  useEffect(() => {
    if (emailid) {
      setEmailidError(false)
    } else {
      setEmailidError(true)
    }
  }, [emailid])

  useEffect(() => {
    if (mobile) {
      setMobileError(false)
    } else {
      setMobileError(true)
    }
  }, [mobile])

  useEffect(() => {
    if (password) {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }, [password])

  useEffect(() => {
    if (confirm) {
      setConfirmError(false)
    } else {
      setConfirmError(true)
    }
  }, [confirm])

  useEffect(() => {
    setFullnameError(false)
    setEmailidError(false)
    setMobileError(false)
    setPasswordError(false)
    setConfirmError(false)
  }, [])

  const boxStyles = () => {
    return 'box'
  }

  return (
    <div className="signup-container">
      <div className={boxStyles()}>
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
                  name="fullname"
                  type="text"
                  title="Full Name"
                  onChange={(e) => handleChanges(e)}
                  className={fullnameError ? 'error' : undefined}
                  inputError={fullnameError}
                  autoFocus={true}
                />
              </div>
              <div className="field">
                <JvInput
                  label="EMAIL ID"
                  name="emailid"
                  type="email"
                  title="Email ID"
                  onChange={(e) => handleChanges(e)}
                  className={emailidError ? 'error' : undefined}
                  inputError={emailidError}
                />
              </div>
              <div className="field">
                <JvInput
                  label="MOBILE"
                  name="mobile"
                  type="tel"
                  title="Mobile"
                  onChange={(e) => handleChanges(e)}
                  className={mobileError ? 'error' : undefined}
                  inputError={mobileError}
                />
              </div>
              <div className="field">
                <JvInput
                  label="PASSWORD"
                  name="password"
                  type="password"
                  title="Password"
                  onChange={(e) => handleChanges(e)}
                  className={passwordError ? 'error' : undefined}
                  inputError={passwordError}
                />
              </div>
              <div className="field">
                <JvInput
                  label="CONFIRM"
                  name="confirm"
                  type="password"
                  title="Confirm Password"
                  onChange={(e) => handleChanges(e)}
                  className={confirmError ? 'error' : undefined}
                  inputError={confirmError}
                />
              </div>
              <JvButton
                className="btn-success"
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
