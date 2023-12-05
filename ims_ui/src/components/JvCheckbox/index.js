import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { classNames } from 'helpers/globals'

const JvCheckbox = (props) => {
  const { name, value, onChange, label, title, className, defaultChecked } =
    props

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (value) {
      setChecked(value)
    }
  }, [value])

  useEffect(() => {
    setChecked(defaultChecked)
  }, [defaultChecked])

  const handleClick = (e) => {
    const value = e.target.checked
    setChecked(value)
    onChange(e)
  }

  const getClasses = () => {
    const classList = ['jv_checkbox']

    if (className) classList.push(className)

    return classNames(classList)
  }

  return (
    <label className={getClasses()}>
      <input
        name={name}
        id={name}
        type="checkbox"
        checked={checked}
        title={title}
        onChange={(e) => handleClick(e)}
      />
      <span htmlFor={name} className="checkbox_label">
        {label}
      </span>
    </label>
  )
}

JvCheckbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
}

JvCheckbox.defaultProps = {
  name: '',
  label: '',
  value: '',
  onChange: PropTypes.func,
  title: 'Toggle Checkbox',
  className: '',
  defaultChecked: false,
}

export default JvCheckbox
