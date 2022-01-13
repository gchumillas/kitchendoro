import React from 'react'
import { ModalDialog } from '~/src/components/utils'

const Component = ({ visible, onRequestClose, children }) => {
  return <ModalDialog visible={visible} onRequestClose={onRequestClose}>
    {children}
  </ModalDialog>
}

export default Component
