import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MasterIcon from 'components/MasterIcon'
import MasterValidate from 'components/MasterValidate'

const Signup = (props) => {
  const { clickToSignup, triggerSignin } = props

  const [signupData, setSignupData] = useState({})
  const [fullnameError, setFullnameError] = useState(false)
  const [emailidError, setEmailidError] = useState(false)
  const [mobileError, setMobileError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmError, setConfirmError] = useState(false)

  const handleChanges = (e) => {
    const { name, value } = e.target
    setSignupData((preState) => ({ ...preState, [name]: value }))
  }

  useEffect(() => {
    if (signupData.fullname) {
      setFullnameError(false)
    } else {
      setFullnameError(true)
    }
  }, [signupData.fullname])

  useEffect(() => {
    if (signupData.emailid) {
      setEmailidError(false)
    } else {
      setEmailidError(true)
    }
  }, [signupData.emailid])

  useEffect(() => {
    if (signupData.mobile) {
      setMobileError(false)
    } else {
      setMobileError(true)
    }
  }, [signupData.mobile])

  useEffect(() => {
    if (signupData.password) {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }, [signupData.password])

  useEffect(() => {
    if (signupData.confirm) {
      setConfirmError(false)
    } else {
      setConfirmError(true)
    }
  }, [signupData.confirm])

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
          <div className="box-login-tab"></div>
          <div className="box-login-title">
            <MasterIcon svgName="login-solid" size="medium" />
            <span className="login-txt">SIGN UP</span>
          </div>
          <div className="box-login">
            <div className="fieldset-body" id="signup_form">
              <MasterIcon
                svgName="login-simple"
                size="medium"
                onClick={triggerSignin}
                className="b b-form b-signin"
                title="Back to Signin"
              />
              <div className="field">
                <label htmlFor="fullname">FULL NAME</label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  title="Full Name"
                  onChange={(e) => handleChanges(e)}
                />
                {fullnameError && (
                  <MasterValidate
                    className="input-icon"
                    icononly
                    svgName="close-border"
                  />
                )}
              </div>
              <div className="field">
                <label htmlFor="emailid">EMAIL ID</label>
                <input
                  type="text"
                  id="emailid"
                  name="emailid"
                  title="Email ID"
                  onChange={(e) => handleChanges(e)}
                />
                {emailidError && (
                  <MasterValidate
                    className="input-icon"
                    icononly
                    svgName="close-border"
                  />
                )}
              </div>
              <div className="field">
                <label htmlFor="mobile">MOBILE</label>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  title="Mobile"
                  onChange={(e) => handleChanges(e)}
                />
                {mobileError && (
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
                  onChange={(e) => handleChanges(e)}
                />
                {passwordError && (
                  <MasterValidate
                    className="input-icon"
                    icononly
                    svgName="close-border"
                  />
                )}
              </div>
              <div className="field">
                <label htmlFor="confirm">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  id="confirm"
                  name="confirm"
                  title="Confirm Password"
                  onChange={(e) => handleChanges(e)}
                />
                {confirmError && (
                  <MasterValidate
                    className="input-icon"
                    icononly
                    svgName="close-border"
                  />
                )}
              </div>

              <input
                type="submit"
                id="do_signup"
                value="SIGN UP"
                title="Get Signup"
                onClick={(e) => clickToSignup(e, signupData)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Signup.propTypes = {
  clickToSignup: PropTypes.func,
  triggerSignin: PropTypes.func,
}

Signup.defaultProps = {
  clickToSignup: () => {},
  triggerSignin: () => {},
}

export default Signup
