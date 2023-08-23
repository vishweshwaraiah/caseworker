import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/MasterIcon'
import MasterValidate from 'components/MasterValidate'

const Signin = (props) => {
  const { clickToLogin, triggerSignup } = props

  const [openForm, setOpenForm] = useState(false)
  const [loginCreds, setLoginCreds] = useState({})
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)

  const submitLogin = (e) => {
    closeLoginInfo()
    clickToLogin(e, loginCreds)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const valueObj = {
      [name]: type === 'checkbox' ? checked : value,
    }
    setLoginCreds((pre) => ({ ...pre, ...valueObj }))
  }

  useEffect(() => {
    if (loginCreds.username) {
      setUsernameError(false)
    } else {
      setUsernameError(true)
    }
  }, [loginCreds.username])

  useEffect(() => {
    if (loginCreds.password) {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }, [loginCreds.password])

  useEffect(() => {
    setUsernameError(false)
    setPasswordError(false)
  }, [])

  const openLoginInfo = () => {
    setOpenForm(true)
  }

  const closeLoginInfo = () => {
    setOpenForm(false)
  }

  const boxStyles = () => {
    const defCls = 'box'
    const formType = openForm ? 'open_form' : 'close_form'
    return `${defCls} ${formType}`
  }

  const contactSupport = () => true

  const forgotPassword = () => true

  return (
    <div className="login-container">
      <div className={boxStyles()}>
        <div className="box-form">
          <div className="box-login-tab"></div>
          <div className="box-login-title">
            <Icon svgName="login-solid" size="medium" />
            <span className="login-txt">SIGN IN</span>
          </div>
          <div className="box-login">
            <div className="fieldset-body" id="login_form">
              <Icon
                className="b b-form"
                svgName="more-horizontal"
                size="medium"
                title="More information"
                onClick={openLoginInfo}
              />
              <div className="field">
                <label htmlFor="username">USERNAME</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  title="Username"
                  onChange={(e) => handleChange(e)}
                  className={usernameError ? 'error' : undefined}
                />
                {usernameError && (
                  <MasterValidate
                    className="input-icon"
                    icononly
                    svgName="close-border"
                  />
                )}
              </div>
              <div className="field">
                <label htmlFor="password">PASSWORD</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  title="Password"
                  onChange={(e) => handleChange(e)}
                  className={passwordError ? 'error' : undefined}
                />
                {passwordError && (
                  <MasterValidate
                    className="input-icon"
                    icononly
                    svgName="close-border"
                  />
                )}
              </div>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="remember"
                  title="Keep me signed in"
                  onChange={(e) => handleChange(e)}
                />
                <span>Keep me signed in</span>
              </label>

              <input
                type="submit"
                id="do_login"
                value="GET STARTED"
                title="Get Started"
                onClick={submitLogin}
              />
            </div>
          </div>
        </div>
        <div className="box-info">
          <div className="need-help">
            <Icon
              svgName="close-border"
              size="medium"
              title="Back to sign In"
              onClick={closeLoginInfo}
            />
            <span className="help-txt">Need Help?</span>
          </div>
          <div className="line-wh"></div>
          <button
            onClick={forgotPassword}
            className="b-support"
            title="Forgot Password?"
          >
            Forgot Password?
          </button>
          <button
            onClick={contactSupport}
            className="b-support"
            title="Contact Support"
          >
            Contact Support
          </button>
          <div className="line-wh"></div>
          <button
            onClick={triggerSignup}
            className="b-cta"
            title="Sign up now!"
          >
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  )
}

Signin.propTypes = {
  clickToLogin: PropTypes.func,
  triggerSignup: PropTypes.func,
}

Signin.defaultProps = {
  clickToLogin: () => {},
  triggerSignup: () => {},
}

export default Signin
