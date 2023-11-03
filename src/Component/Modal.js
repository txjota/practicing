import React from 'react'


export default function Modal({ isOpen, setModalOpen, children }) {
  if (isOpen) {
    return (
      <div className='background-modal'  onClick={setModalOpen}>
        <div className='modal-style'>
          <div>{children}</div>
        </div>
      </div>
    )
  }

  return null
}



  
