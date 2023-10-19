import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const JvSpinner = (props) => {
  const { spinnerText, isFixed } = props

  const defClasses = () => {
    let classNames = 'loader-container'
    if (isFixed) {
      classNames = `${classNames} fixed-true`
    }

    return classNames
  }

  return (
    <div className={defClasses()}>
      <span className="loader shadow-dark"></span>
      <label className="mt-2">{spinnerText}</label>
    </div>
  )
}

JvSpinner.propTypes = {
  spinnerText: PropTypes.string,
  isFixed: PropTypes.bool,
}

JvSpinner.defaultProps = {
  spinnerText: 'Loading..., Please wait!',
  isFixed: true,
}

export default JvSpinner
