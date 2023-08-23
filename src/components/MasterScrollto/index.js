import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Icon from 'components/MasterIcon'
import './index.scss'

const MasterScrollto = (props) => {
  const { scrollTo, svgName } = props
  const vHeight = window.innerHeight
  const [display, setDisplay] = useState()
  const goTo = () => {
    const opts = {
      top: 0,
      behavior: 'smooth',
    }
    if (scrollTo === 'bottom') {
      opts.top = document.body.scrollHeight
    }
    window.scrollTo(opts)
  }

  // toggle 'scroll to top' based on scroll position
  window.addEventListener('scroll', (e) => {
    setDisplay(window.scrollY > vHeight ? true : false)
  })

  return (
    <div className="master-scroller">
      {display && (
        <button className="to_top btn" onClick={goTo}>
          <Icon
            svgName={svgName}
            size="medium"
            fillColor="var(--master-body-color)"
          />
        </button>
      )}
    </div>
  )
}

MasterScrollto.propTypes = {
  scrollTo: PropTypes.string,
  svgName: PropTypes.string,
}

MasterScrollto.defaultProps = {
  scrollTo: '',
  svgName: 'arrow-up',
}

export default MasterScrollto
