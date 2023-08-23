import React, { useState } from 'react'
import Icon from 'components/MasterIcon'
import './index.scss'

const MasterCopy = (props) => {
  const [copyIcon, setCopyIcon] = useState('copy')
  const [isVisible, setIsVisible] = useState(false)

  const copyText = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(props.copyStr)
    setCopyIcon('done-all')
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 2000)
    setTimeout(() => {
      setCopyIcon('copy')
    }, 3000)
  }

  return (
    <div className="copy-icon">
      <Icon
        svgName={copyIcon}
        onClick={() => copyText()}
        size="small"
        fillColor="gray"
      />
      {isVisible && <span className="copied_note">Copied!</span>}
    </div>
  )
}

export default MasterCopy
