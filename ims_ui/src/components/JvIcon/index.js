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
    hoverColor,
    roundSpace,
  } = props

  const getSize = () => {
    if (size === 'x-large') {
      return '48'
    } else if (size === 'large') {
      return '40'
    } else if (size === 'medium') {
      return '32'
    } else if (size === 'small') {
      return '24'
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

    if (hoverColor) classList.push('hover-inverse')

    if (size) classList.push(size)

    if (className) classList.push(className)

    return classNames(classList)
  }

  const svgBoxClasses = () => {
    const classList = ['svg_box']

    if (roundSpace) classList.push('is_rounded')

    return classNames(classList)
  }

  return (
    <span onClick={() => onClick()} className={getClasses()} title={title}>
      {labelBefore && <label className="label-before">{labelBefore}</label>}
      <div className={svgBoxClasses()}>
        <svg
          className="shadow-svg-dark"
          fill={fillColor}
          height={getSize()}
          width={getSize()}
        >
          <use href={icon} />
        </svg>
      </div>
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
  hoverColor: PropTypes.string,
  roundSpace: PropTypes.string,
}

JvIcon.defaultProps = {
  labelBefore: '',
  labelAfter: '',
  size: 'medium',
  svgName: 'placeholder',
  fillColor: 'var(--jv-text-color)',
  onClick: () => {},
  className: '',
  title: '',
  hoverColor: '',
  roundSpace: '',
}

export default JvIcon
