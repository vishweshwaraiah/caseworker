import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { classNames } from 'helpers/globals'

const JvSpinner = (props) => {
  const { spinnerText, isFixed } = props

  const getClasses = () => {
    let classList = ['loader-container']

    if (isFixed) {
      classList.push('fixed-true')
    }

    return classNames(classList)
  }

  return (
    <div className={getClasses()}>
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
