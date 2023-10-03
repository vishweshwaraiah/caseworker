import React from 'react'
import PropTypes from 'prop-types'
import JvIcon from 'components/JvIcon'

const JvValidate = (props) => {
  const { inline, icononly, svgName, className } = props

  const wrapperStyle = () => {
    let cls = inline ? 'd-inline' : 'd-block'
    return `${className} ${cls}`.trim()
  }
  return (
    <div className={wrapperStyle()}>
      <JvIcon svgName={svgName} size="small" fillColor="var(--jv-red)" />
      {!icononly && <span>Error message!</span>}
    </div>
  )
}

JvValidate.propTypes = {
  inline: PropTypes.bool,
  icononly: PropTypes.bool,
  svgName: PropTypes.string,
  className: PropTypes.string,
}

JvValidate.defaultProps = {
  inline: true,
  icononly: false,
  svgName: 'checked-round',
  className: '',
}

export default JvValidate
