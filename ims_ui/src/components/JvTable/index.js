import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const JvTable = (props) => {
  const { dataRows, headerRows } = props

  return (
    <div className="jv-table">
      <table>
        <thead>
          <tr>
            {headerRows.map((hdr) => (
              <th key={hdr.headerId}>{hdr.headerName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((tr) => (
            <tr key={tr.id}>
              {headerRows.map((hdr) => (
                <td key={`${tr.id}-${hdr.accessName}`}>{tr[hdr.accessName]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

JvTable.propTypes = {
  dataRows: PropTypes.array,
  headerRows: PropTypes.array,
}

JvTable.defaultProps = {
  headerRows: [],
  dataRows: [],
}

export default JvTable
