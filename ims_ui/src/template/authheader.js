import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import JvButton from 'components/JvButton'
import { classNames } from 'helpers/globals'
import JvIcon from 'components/JvIcon'

const AuthHeader = (props) => {
  const { className } = props

  const getClasses = () => {
    const classList = ['auth-header']
    if (className) {
      classList.push(className)
    }
    return classNames(classList)
  }

  const authDetails = useSelector((state) => state.auth)

  const { userEmail, userMobile, userName } = authDetails

  const [loggedIn, setLoggedIn] = useState(false)
  const [showUser, setShowUser] = useState(false)

  useEffect(() => {
    if (userEmail && userMobile) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [authDetails])

  const toggleShowUser = () => {
    setShowUser(!showUser)
  }

  return (
    <div className={getClasses()}>
      {!loggedIn ? (
        <JvButton
          variant="outlined"
          color="green"
          size="small"
          content="Signin"
          href="/signin"
          type="link"
        />
      ) : (
        <div className="auth_dropdown">
          {showUser && (
            <div className="back_drop" onClick={toggleShowUser}></div>
          )}
          <JvIcon
            svgName="user"
            size="small"
            fillColor="var(--jv-bg-color)"
            roundSpace="5px"
            hoverColor="#000000"
            onClick={toggleShowUser}
          />
          {showUser && (
            <div className="user_dropdown">
              <p>{userName}</p>
              <p>{userEmail}</p>
              <p>{userMobile}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

AuthHeader.propTypes = {
  className: PropTypes.string,
}

AuthHeader.defaultProps = {
  className: '',
}

export default AuthHeader
