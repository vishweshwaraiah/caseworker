import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BtnVariants, BtnColors } from './constants'
import './index.scss'
import { classNames } from 'helpers/globals'

const JvButton = (props) => {
  const {
    className,
    onClick,
    type,
    href,
    content,
    role,
    width,
    title,
    size,
    variant,
    color,
  } = props

  const [CustomTag, setCustomTag] = useState('button')

  const getClasses = () => {
    const classList = ['jv-btn']

    let btnVariant = `btn-${BtnVariants.FILLED}`
    let btnColor = `btn-${BtnColors.PRIMARY}`

    if (Object.values(BtnVariants).indexOf(variant) > -1) {
      btnVariant = `btn-${variant}`
    }

    if (Object.values(BtnColors).indexOf(color) > -1) {
      btnColor = `btn-${color}`
    }

    classList.push(btnVariant)
    classList.push(btnColor)
    classList.push(size)

    if (className) classList.push(className)

    if (width) classList.push(width)

    return classNames(classList)
  }

  const handleOnClick = (event) => {
    onClick && onClick(event)
  }

  const getAttrProps = () => {
    const defProps = {
      className: getClasses(),
      onClick: handleOnClick,
      role: role,
      type: type,
      title: title,
    }

    if (href !== '') defProps.href = href

    return defProps
  }

  useEffect(() => {
    if (type === 'link' && href !== '') {
      setCustomTag('a')
    }
  }, [type])

  return <CustomTag {...getAttrProps()}>{content}</CustomTag>
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
  color: PropTypes.string,
  variant: PropTypes.string,
}

JvButton.defaultProps = {
  type: 'button',
  role: 'button',
  content: 'Button',
  className: '',
  href: '',
  width: '',
  title: 'Title: Jv Button!',
  size: 'medium',
  onClick: () => {},
  color: BtnColors.PRIMARY,
  variant: BtnVariants.FILLED,
}

export default JvButton
