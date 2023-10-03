import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import JvIcon from 'components/JvIcon'

const JvModal = (props) => {
  const {
    modalId,
    className,
    size,
    isOpen,
    onClose,
    hasCloseBtn,
    clickToClose,
    children,
  } = props

  const modalRef = useRef(null)

  const [openModal, setOpenModal] = useState(false)

  const closeModal = () => {
    onClose(false)
    setOpenModal(false)
  }

  useEffect(() => {
    const modalElement = modalRef.current
    if (modalElement) {
      if (isOpen) setOpenModal(true)
    }
  }, [isOpen])

  const classNames = () => {
    let modalClass = 'jv-modal'

    if (className) {
      modalClass = `${modalClass} ${className}`.trim()
    }

    if (size) {
      modalClass = `${modalClass} ${size}`.trim()
    }

    return modalClass
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  }

  return (
    <dialog
      className={classNames()}
      id={modalId}
      onKeyDown={handleKeyDown}
      open={openModal}
      ref={modalRef}
    >
      <div className="modal-content">
        {hasCloseBtn && (
          <JvIcon
            svgName="close-filled"
            size="small"
            className="close"
            onClick={closeModal}
          />
        )}
        {children}
      </div>
      {clickToClose && (
        <span className="outside-click" onClick={closeModal}></span>
      )}
    </dialog>
  )
}

JvModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalId: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
  onClose: PropTypes.func,
  hasCloseBtn: PropTypes.bool,
  clickToClose: PropTypes.bool,
  children: PropTypes.array,
}

JvModal.defaultProps = {
  isOpen: false,
  modalId: 'jvModal',
  className: '',
  size: 'medium',
  onClose: () => {},
  hasCloseBtn: true,
  clickToClose: false,
  children: null,
}

export default JvModal
