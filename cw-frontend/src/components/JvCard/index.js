import React from 'react'
import PropTypes from 'prop-types'

const JvCard = (props) => {
  const { hasHr, cardTitle, cardSubTitle, cardContent } = props

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{cardSubTitle}</h6>
        <div className="card-content">{cardContent}</div>
      </div>
      {hasHr && <hr />}
    </div>
  )
}

JvCard.propTypes = {
  hasHr: PropTypes.bool,
  cardTitle: PropTypes.string,
  cardSubTitle: PropTypes.string,
  cardContent: PropTypes.string,
}

JvCard.defaultProps = {
  hasHr: false,
  cardTitle: 'Title',
  cardSubTitle: 'Sub Title',
  cardContent: 'Card Content',
}

export default JvCard
