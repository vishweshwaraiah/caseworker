import React, { useState } from 'react'
import PropTypes from 'prop-types'
import JvIcon from 'components/JvIcon'
import './index.scss'

const JvScrollto = (props) => {
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
    <div className="jv-scroller">
      {display && (
        <JvIcon
          className="to_top btn"
          onClick={goTo}
          svgName={svgName}
          size="medium"
          fillColor="var(--jv-body-color)"
        />
      )}
    </div>
  )
}

JvScrollto.propTypes = {
  scrollTo: PropTypes.string,
  svgName: PropTypes.string,
}

JvScrollto.defaultProps = {
  scrollTo: '',
  svgName: 'arrow-up',
}

export default JvScrollto
