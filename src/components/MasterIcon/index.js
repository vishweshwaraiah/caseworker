import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const MasterIcon = (props) => {
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

  const getStyles = () => {
    return 'svg-holder' + className
  }

  return (
    <span onClick={() => onClick()} className={getStyles()} title={title}>
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

MasterIcon.propTypes = {
  labelBefore: PropTypes.string,
  labelAfter: PropTypes.string,
  size: PropTypes.string,
  svgName: PropTypes.string,
  fillColor: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
}

MasterIcon.defaultProps = {
  labelBefore: '',
  labelAfter: '',
  size: 'medium',
  svgName: 'placeholder',
  fillColor: 'var(--master-body-color)',
  onClick: () => {},
  className: '',
  title: '',
}

export default MasterIcon
