import React from 'react'
import { FlatList } from 'react-native'
import { Outlet, useNavigate } from 'react-router-native'
import uuid from 'react-native-uuid'
import { tw } from '~/src/libs/tailwind'
import { time2Seconds } from '~/src/libs/utils'
import PageLayout from '~/src/layouts/PageLayout'
import ContextMenu, { ContextMenuItem } from '~/src/components/ContextMenu'
import { TimerInput } from '~/src/components/inputs'
import { getTimers, createTimer, deleteTimer } from '~/src/providers/timers'
import Timer from './Timer'
import { context } from './context'
import RenameIcon from '~/assets/icons/rename.svg'
import DeleteIcon from '~/assets/icons/delete.svg'

const HomePage = _ => {
  const navigate = useNavigate()
  const [time, setTime] = React.useState({ hh: '', mm: '', ss: '' })
  const [timers, setTimers] = React.useState([])
  const items = React.useMemo(_ => [...timers, { id: uuid.v1(), type: 'input' }], [JSON.stringify(timers)])
  const [selectedTimerId, setSelectedTimerId] = React.useState('')
  const reload = async _ => setTimers(await getTimers())
  const doCloseDialog = _ => setSelectedTimerId('')

  const doRenameTimer = _ => {
    navigate(`/rename-timer/${selectedTimerId}`)
    doCloseDialog()
  }

  const doDeleteTimer = async _ => {
    setSelectedTimerId(null)
    await deleteTimer(selectedTimerId)
    reload()
  }

  const doCreateTimer = async _ => {
    const seconds = time2Seconds(time)

    setTime({ hh: '', mm: '', ss: '' })
    await createTimer({ name: 'New Timer', seconds })
    reload()
  }

  React.useEffect(_ => {
    reload()
  }, [])

  return <context.Provider value={React.useMemo(_ => ({ reload }), [])}>
    <PageLayout>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={items}
        renderItem={({ item }) => item.type == 'input'
          ? <TimerInput key={item.id} value={time} onChange={setTime} onSubmit={doCreateTimer} />
          : <Timer key={item.id} seconds={item.seconds} name={item.name} onSelect={_ => setSelectedTimerId(item.id)} style={tw('mb-6')} />}
        keyExtractor={item => item.id}
        style={tw('w-full px-5 pt-5')} />
      <ContextMenu visible={!!selectedTimerId} onRequestClose={doCloseDialog}>
        <ContextMenuItem icon={RenameIcon} label="Rename" onPress={doRenameTimer} />
        <ContextMenuItem icon={DeleteIcon} label="Delete" onPress={doDeleteTimer} />
      </ContextMenu>
    </PageLayout>
    <Outlet />
  </context.Provider>
}

export default HomePage
