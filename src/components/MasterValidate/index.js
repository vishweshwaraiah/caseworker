import React from 'react'
import PropTypes from 'prop-types'
import MasterIcon from 'components/MasterIcon'

const MasterValidate = (props) => {
  const { inline, icononly, svgName, className } = props

  const wrapperStyle = () => {
    let cls = inline ? 'd-inline' : 'd-block'
    return `${className} ${cls}`.trim()
  }
  return (
    <div className={wrapperStyle()}>
      <MasterIcon
        svgName={svgName}
        size="small"
        fillColor="var(--master-red)"
      />
      {!icononly && <span>Error message!</span>}
    </div>
  )
}

MasterValidate.propTypes = {
  inline: PropTypes.bool,
  icononly: PropTypes.bool,
  svgName: PropTypes.string,
  className: PropTypes.string,
}

MasterValidate.defaultProps = {
  inline: true,
  icononly: false,
  svgName: 'checked-round',
  className: '',
}

export default MasterValidate
