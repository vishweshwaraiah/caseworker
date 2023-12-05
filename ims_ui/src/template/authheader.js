import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import JvButton from 'components/JvButton'
import { classNames } from 'helpers/globals'

const AuthHeader = (props) => {
  const { className } = props

  const getClasses = () => {
    const classList = ['auth-header']
    if (className) {
      classList.push(className)
    }
    return classNames(classList)
  }

  const email = useSelector((state) => state.auth.email)
  const mobile = useSelector((state) => state.auth.mobile)
  const userName = useSelector((state) => state.auth.name)

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (email && mobile) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [email, mobile])

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
        <div>
          <p>{userName}</p>
          <p>{email}</p>
          <p>{mobile}</p>
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
