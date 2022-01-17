import React from 'react'
import { useNavigate, useParams } from 'react-router-native'
import { Button, TextField } from '~/src/components/inputs'
import { updateTimer, readTimer } from '~/src/providers/timers'
import DialogLayout from '~/src/layouts/DialogLayout'
import { context } from './context'

const RenameDialog = _ => {
  const { reload } = React.useContext(context)
  const navigate = useNavigate()
  const { id } = useParams()
  const [name, setName] = React.useState('')
  const doClose = _ => navigate('/')

  const doSave = async _ => {
    await updateTimer({ id, name })
    reload()
    navigate('/')
  }

  React.useEffect(_ => {
    const init = async _ => {
      const article = await readTimer(id)
      setName(article.name)
    }

    init()
  }, [id])

  return <DialogLayout
    onRequestClose={doClose}
    actions={<>
      <Button title="Close" onPress={doClose} />
      <Button title="Save" primary disabled={!name} onPress={doSave} />
    </>}>
    <TextField autoFocus value={name} onChange={setName} />
  </DialogLayout>
}

export default RenameDialog
