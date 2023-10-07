import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const JvButton = (props) => {
  const { className, onClick, type, href, content, role, width, title, size } =
    props

  const [CustomTag, setCustomTag] = useState('button')

  const classNames = () => {
    let btnClass = 'jv-btn btn'

    if (className) {
      btnClass = `${btnClass} ${className}`.trim()
    }

    if (width) {
      btnClass = `${btnClass} ${width}`.trim()
    }

    if (size) {
      btnClass = `${btnClass} ${size}`.trim()
    }

    return btnClass
  }

  const handleOnClick = (event) => {
    onClick && onClick(event)
  }

  const _props = {
    className: classNames(),
    onClick: handleOnClick,
    role: role,
    type: type,
    title: title,
  }

  useEffect(() => {
    if (type === 'link') {
      setCustomTag('a')
    }
  }, [type])

  useEffect(() => {
    if (href !== '') {
      _props.href = href
    }
  })

  return <CustomTag {..._props}>{content}</CustomTag>
}

JvButton.propTypes = {
  type: PropTypes.string,
  role: PropTypes.string,
  content: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
}

JvButton.defaultProps = {
  type: 'button',
  role: 'button',
  content: 'Button',
  className: '',
  href: '',
  width: '',
  title: '',
  size: 'medium',
  onClick: () => {},
}

export default JvButton
