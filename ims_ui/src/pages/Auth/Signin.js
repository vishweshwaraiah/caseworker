import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { signinRequest } from 'redux/_actions/auth'
import JvIcon from 'components/JvIcon'
import JvInput from 'components/JvInput'
import JvCheckbox from 'components/JvCheckbox'
import JvButton from 'components/JvButton'
import { USER_EMAIL, USER_PWD } from 'constants/Validation'
import JvModal from 'components/JvModal'
import { validRoute } from 'template/routes'
import useAuth from 'helpers/useAuth'
import { classNames } from 'helpers/globals'

const Signin = (props) => {
  const { toggleScreen } = props

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const { setJwtToken } = useAuth()

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
    dispatch(
      signinRequest({
        userEmail: data.emailid,
        userPassword: data.password,
      })
    )
    e.preventDefault()
  }

  const authDetails = useSelector((state) => state.auth)

  useEffect(() => {
    const setAuthDetails = (jwtToken) => {
      setJwtToken(jwtToken)
      if (!validRoute(pathname)) {
        navigate('/')
      } else {
        navigate('/')
      }
    }

    const userEmail = authDetails?.email
    const jwtToken = authDetails?.token

    if (userEmail && jwtToken) {
      setAuthDetails(jwtToken)
    }
  }, [authDetails])

  const submitSignin = (e) => {
    closeSigninInfo()

    if (!emailid) {
      setEmailidError(true)
    }

    if (!password) {
      setPasswordError(true)
    }

    const validEmail = USER_EMAIL.test(emailid)
    const validPassword = USER_PWD.test(password)

    if (!validEmail) {
      setEmailidError(true)
      return
    }

    if (!validPassword) {
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
    navigate('/signin')
  }, [])

  const openSigninInfo = () => {
    setEmailidError(false)
    setPasswordError(false)
    setOpenForm(true)
  }

  const closeSigninInfo = () => {
    setOpenForm(false)
  }

  const getClasses = () => {
    const classList = ['box']

    if (openForm) {
      classList.push('open_form')
    } else {
      classList.push('close_form')
    }

    return classNames(classList)
  }

  const contactSupport = (status) => {
    setSupportModal(status)
  }

  return (
    <div className="signin-container">
      <div className={getClasses()}>
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
                className="btn-success b-start"
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
            variant="outlined"
            color="pink"
          />
          <JvButton
            onClick={() => contactSupport(true)}
            className="b-support"
            title="Contact Support"
            content="Contact Support"
            size="small"
            variant="outlined"
            color="pink"
          />
          <div className="line-wh"></div>
          <JvButton
            className="b-cta"
            title="Sign up now!"
            content="CREATE ACCOUNT"
            size="small"
            onClick={() => toggleScreen('signup')}
            variant="outlined"
            color="red"
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
