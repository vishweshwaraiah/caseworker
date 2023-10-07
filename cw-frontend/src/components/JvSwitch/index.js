import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const JvSwitch = (props) => {
  const { value, round, changeStatus } = props

  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (value) {
      setChecked(value)
    }
  }, [value])

  const handleClick = (e) => {
    const checkStatus = e.target.checked
    setChecked(checkStatus)
    changeStatus(checkStatus)
  }

  const slideClass = () => {
    return round ? 'slider round' : 'slider'
  }

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        title="Toggle switch"
        onChange={(e) => handleClick(e)}
      />
      <span className={slideClass()}></span>
    </label>
  )
}

JvSwitch.propTypes = {
  value: PropTypes.string,
  round: PropTypes.bool,
  changeStatus: PropTypes.func,
}

JvSwitch.defaultProps = {
  value: '',
  round: false,
  changeStatus: PropTypes.func,
}

export default JvSwitch
