import React from 'react'
import { Modal, Pressable, StyleSheet, View, StatusBar } from 'react-native'
import { tw } from '~/src/libs/tailwind'

const ModalDialog = ({ visible = false, onRequestClose = undefined, children }) => {
  return <Modal animationType="fade" transparent visible={visible} onRequestClose={onRequestClose} statusBarTranslucent>
    <Pressable onPress={onRequestClose}>
      <View style={styles.wrapper}>
        <View onStartShouldSetResponder={_ => true} style={styles.box}>
          {children}
        </View>
      </View>
    </Pressable>
  </Modal>
}

const styles = StyleSheet.create({
  wrapper: tw('flex h-full justify-center items-center bg-black bg-opacity-60'),
  box: {
    ...tw('bg-white p-5 rounded-md w-11/12'),
    marginTop: StatusBar.currentHeight
  }
})

export default ModalDialog
