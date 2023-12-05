import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import JvValidate from 'components/JvValidate'
import { inputTypes } from 'constants/Globals'
import './index.scss'
import { classNames } from 'helpers/globals'

const JvInput = (props) => {
  const {
    name,
    title,
    className,
    type,
    label,
    placeholder,
    readOnly,
    textarea,
    autoFocus,
    defaultValue,
    inputError,
    helperText,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    onClick,
  } = props

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(defaultValue)
  }, [defaultValue])

  const handleOnBlur = (event) => {
    onBlur && onBlur(event)
  }

  const handleOnChange = (event) => {
    const { value } = event.target
    setInputValue(value)
    onChange && onChange(event)
  }

  const handleFocus = (event) => {
    onFocus && onFocus(event)
  }

  const handleKeyDown = (event) => {
    onKeyDown && onKeyDown(event)
  }

  const handleOnClick = (event) => {
    onClick && onClick(event)
  }

  const getClasses = () => {
    const classList = ['jv-input']

    if (className) classList.push(className)

    return classNames(classList)
  }

  const _props = {
    name,
    title,
    autoFocus,
    placeholder,
    readOnly,
    onChange: handleOnChange,
    onFocus: handleFocus,
    onBlur: handleOnBlur,
    onKeyDown: handleKeyDown,
    onClick: handleOnClick,
  }

  return (
    <div className={getClasses()}>
      {label && <label>{label}</label>}
      {textarea ? (
        <textarea {..._props} value={inputValue}></textarea>
      ) : (
        <input {..._props} type={type} value={inputValue} />
      )}
      {inputError && (
        <JvValidate className="input-icon" icononly svgName="close-border" />
      )}
      {helperText && helperText.length && <span>{helperText}</span>}
    </div>
  )
}

JvInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.oneOf(inputTypes).isRequired,
  label: PropTypes.string,
  labelPlacement: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  textarea: PropTypes.bool,
  defaultValue: PropTypes.string,
  inputError: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
}

JvInput.defaultProps = {
  name: '',
  title: 'HTML Input',
  type: 'text',
  label: '',
  labelPlacement: 'left',
  placeholder: '',
  readOnly: false,
  autoFocus: false,
  required: true,
  className: '',
  textarea: false,
  defaultValue: '',
  inputError: false,
  helperText: '',
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  onKeyDown: () => {},
  onClick: () => {},
}

export default JvInput
