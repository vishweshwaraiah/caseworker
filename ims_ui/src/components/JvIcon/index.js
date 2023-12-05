import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { classNames } from 'helpers/globals'

const JvIcon = (props) => {
  const {
    labelBefore,
    labelAfter,
    size,
    svgName,
    fillColor,
    onClick,
    className,
    title,
  } = props

  const getSize = () => {
    if (size === 'x-large') {
      return '54'
    } else if (size === 'large') {
      return '40'
    } else if (size === 'medium') {
      return '32'
    } else if (size === 'small') {
      return '20'
    } else if (size === 'x-small') {
      return '16'
    } else {
      return size
    }
  }

  let [icon, setIcon] = useState('')

  useEffect(() => {
    const getIcon = async () => {
      let importedIcon = await import('assets/icons/' + svgName + '.svg')
      setIcon(importedIcon.default + '#' + svgName)
    }
    getIcon()
  }, [svgName])

  const getClasses = () => {
    const classList = ['svg-holder']

    if (className) classList.push(className)

    return classNames(classList)
  }

  return (
    <span onClick={() => onClick()} className={getClasses()} title={title}>
      {labelBefore && <label className="label-before">{labelBefore}</label>}
      <svg
        className="shadow-svg-dark"
        fill={fillColor}
        height={getSize()}
        width={getSize()}
      >
        <use href={icon} />
      </svg>
      {labelAfter && <label className="label-after">{labelAfter}</label>}
    </span>
  )
}

JvIcon.propTypes = {
  labelBefore: PropTypes.string,
  labelAfter: PropTypes.string,
  size: PropTypes.string,
  svgName: PropTypes.string,
  fillColor: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
}

JvIcon.defaultProps = {
  labelBefore: '',
  labelAfter: '',
  size: 'medium',
  svgName: 'placeholder',
  fillColor: 'var(--jv-body-color)',
  onClick: () => {},
  className: '',
  title: '',
}

export default JvIcon
