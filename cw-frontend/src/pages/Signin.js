import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthContext from 'context/AuthProvider'
import JvIcon from 'components/JvIcon'
import JvInput from 'components/JvInput'
import JvCheckbox from 'components/JvCheckbox'
import JvButton from 'components/JvButton'
import { USER_EMAIL, USER_PWD } from 'constants/Validation'
import JvModal from 'components/JvModal'
import { validRoute } from 'template/routes'

const Signin = (props) => {
  const { toggleScreen } = props

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const { setAuth } = useContext(AuthContext)

  const [openForm, setOpenForm] = useState(false)
  const [signinCreds, setSigninCreds] = useState({
    remember: true,
  })
  const [emailid, setEmailid] = useState('')
  const [password, setPassword] = useState('')
  const [emailidError, setEmailidError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [supportModal, setSupportModal] = useState(false)

  const signinUser = (e, data) => {
    const validUser = data?.emailid === 'k.vishu@outlook.com'
    const validPassword = data?.password === 'Kalyan@14158'
    if (validUser && validPassword) {
      setAuth(data)
      if (!validRoute(pathname)) {
        navigate('/')
      }
    }
  }

  const submitSignin = (e) => {
    closeSigninInfo()
    if (!emailid) {
      setEmailidError(true)
    }
    if (!password) {
      setPasswordError(true)
    }

    const v1 = USER_EMAIL.test(emailid)
    const v2 = USER_PWD.test(password)

    if (!v1) {
      setEmailidError(true)
      return
    }

    if (!v2) {
      setPasswordError(true)
      return
    }

    if (emailid && password) {
      setEmailidError(false)
      setPasswordError(false)
      signinUser(e, signinCreds)
    }

    closeSigninInfo()
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const valueObj = {
      [name]: type === 'checkbox' ? checked : value,
    }
    if (name === 'emailid') {
      setEmailid(value)
    }
    if (name === 'password') {
      setPassword(value)
    }
    setSigninCreds((pre) => ({ ...pre, ...valueObj }))
  }

  useEffect(() => {
    if (emailid) {
      setEmailidError(false)
    } else {
      setEmailidError(true)
    }
  }, [emailid])

  useEffect(() => {
    if (password) {
      setPasswordError(false)
    } else {
      setPasswordError(true)
    }
  }, [password])

  useEffect(() => {
    setEmailidError(false)
    setPasswordError(false)
  }, [])

  const openSigninInfo = () => {
    setEmailidError(false)
    setPasswordError(false)
    setOpenForm(true)
  }

  const closeSigninInfo = () => {
    setOpenForm(false)
  }

  const boxStyles = () => {
    const defCls = 'box'
    const formType = openForm ? 'open_form' : 'close_form'
    return `${defCls} ${formType}`
  }

  const contactSupport = (status) => {
    setSupportModal(status)
  }

  return (
    <div className="signin-container">
      <div className={boxStyles()}>
        <div className="box-form">
          <div className="box-signin-tab"></div>
          <div className="box-signin-title">
            <JvIcon svgName="signin-solid" size="medium" />
            <span className="signin-txt">SIGN IN</span>
          </div>
          <div className="box-signin">
            <div className="fieldset-body" id="signin_form">
              <JvIcon
                className="b b-form"
                svgName="more-horizontal"
                size="medium"
                title="More information"
                onClick={openSigninInfo}
              />
              <div className="field">
                <JvInput
                  label="EMAIL ID"
                  name="emailid"
                  title="Email ID"
                  onChange={(e) => handleChange(e)}
                  className={emailidError ? 'error' : undefined}
                  inputError={emailidError}
                  autoFocus={true}
                />
              </div>
              <div className="field">
                <JvInput
                  label="PASSWORD"
                  name="password"
                  type="password"
                  title="Password"
                  onChange={(e) => handleChange(e)}
                  className={passwordError ? 'error' : undefined}
                  inputError={passwordError}
                />
              </div>
              <div className="field">
                <JvCheckbox
                  label="Keep me signed in"
                  name="remember"
                  title="Keep me signed in"
                  onChange={(e) => handleChange(e)}
                  className="remember_me"
                  defaultChecked={signinCreds.remember}
                />
              </div>
              <JvButton
                className="btn-success"
                width="full"
                type="submit"
                title="Get Started"
                content="GET STARTED"
                onClick={submitSignin}
              />
            </div>
          </div>
        </div>
        <div className="box-info">
          <div className="need-help">
            <JvIcon
              svgName="close-border"
              size="medium"
              title="Back to sign In"
              onClick={closeSigninInfo}
            />
            <span className="help-txt">Need Help?</span>
          </div>
          <div className="line-wh"></div>
          <JvButton
            onClick={() => contactSupport(true)}
            className="b-support"
            title="Forgot Password?"
            content="Forgot Password?"
            size="small"
          />
          <JvButton
            onClick={() => contactSupport(true)}
            className="b-support"
            title="Contact Support"
            content="Contact Support"
            size="small"
          />
          <div className="line-wh"></div>
          <JvButton
            className="b-cta"
            title="Sign up now!"
            content="CREATE ACCOUNT"
            size="small"
            onClick={() => toggleScreen('signup')}
          />
        </div>
      </div>
      <JvModal size="small" isOpen={supportModal} onClose={contactSupport}>
        <header>Contact Support</header>
        <section>Contact us on +91-7353333573</section>
        <footer>* try again if not answered!</footer>
      </JvModal>
    </div>
  )
}

Signin.propTypes = {
  toggleScreen: PropTypes.func,
}

Signin.defaultProps = {
  toggleScreen: () => {},
}

export default Signin
