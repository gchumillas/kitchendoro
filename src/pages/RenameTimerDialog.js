import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-native'
import Button from '~/src/components/inputs/Button'
import TextField from '~/src/components/inputs/TextField'
import { updateTimer, readTimer } from '~/src/providers/timers'
import DialogLayout from '~/src/layouts/DialogLayout'
import { context } from './context'

const RenameDialog = _ => {
  const { t } = useTranslation()
  const { reload } = React.useContext(context)
  const navigate = useNavigate()
  const { id } = useParams()
  const [name, setName] = React.useState('')
  const doClose = _ => navigate('/timer')

  const doSave = async _ => {
    await updateTimer(id, { name })
    reload()
    navigate('/timer')
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
      <Button title={t`close`} onPress={doClose} />
      <Button title={t`save`} primary disabled={!name} onPress={doSave} />
    </>}>
    <TextField autoFocus value={name} onChange={setName} />
  </DialogLayout>
}

export default RenameDialog
