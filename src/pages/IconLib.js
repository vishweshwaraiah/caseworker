import React from 'react'
import Icon from 'components/MasterIcon'
import Copy from 'components/MasterCopy'
import ScrollTo from 'components/MasterScrollto'

const IconLib = () => {
  const reqSvgs = require.context('assets/icons', true, /\.svg$/)
  const paths = reqSvgs.keys()

  const svgs = paths.map((path) => {
    return {
      id: path.split('/').slice(-1).join().split('.').shift(),
      file: reqSvgs(path),
    }
  })

  return (
    <div className="grid-container grids_5 icons-grid">
      {svgs.map((i, idx) => (
        <div key={i.id + '_' + idx} className="grid-item icon-holder">
          <Copy copyStr={i.id} />
          <Icon svgName={i.id} size="x-large" />
          <span className="icon-name">{i.id}</span>
        </div>
      ))}
      <ScrollTo />
    </div>
  )
}

export default IconLib
