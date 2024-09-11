import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { InputField } from './InputField'

export const CommonModal = ({ show = false, modalTitle, handleClose, FormLabel, value, onChangeHandler, name, placeholder,addHandler }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle ? modalTitle : "Modal heading"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputField type={'text'} required name={name} value={value} onChange={(e) => onChangeHandler(e.target.value)} label={FormLabel} placeholder={placeholder} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addHandler}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
