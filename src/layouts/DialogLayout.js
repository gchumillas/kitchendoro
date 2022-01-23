import React from 'react'
import { StyleSheet, View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import ModalDialog from '~/src/components/utils/ModalDialog'

const Component = ({ actions, children, ...modalDialogProps }) => {
  return <ModalDialog {...modalDialogProps} visible>
    <View style={styles.body}>
      {children}
    </View>
    <View style={styles.footer}>
      {actions}
    </View>
  </ModalDialog>
}

const styles = StyleSheet.create({
  body: { ...tw('pt-4 pb-6') },
  footer: tw('flex flex-row items-center justify-around')
})

export default Component
