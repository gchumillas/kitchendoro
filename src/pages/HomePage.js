import React from 'react'
import { FlatList, Button } from 'react-native'
import { Outlet, useNavigate } from 'react-router-native'
import uuid from 'react-native-uuid'
import { getColor, tw } from '~/src/libs/tailwind'
import { time2Seconds } from '~/src/libs/utils'
import { pushNotification } from '~/src/libs/notifications'
import PageLayout from '~/src/layouts/PageLayout'
import ContextMenu, { ContextMenuItem } from '~/src/components/ContextMenu'
import Timer from '~/src/components/Timer'
import { TimerInput } from '~/src/components/inputs'
import { getTimers, createTimer, deleteTimer, updateTimer } from '~/src/providers/timers'
import RenameIcon from '~/assets/icons/rename.svg'
import DeleteIcon from '~/assets/icons/delete.svg'
import { context } from './context'

const HomePage = _ => {
  const navigate = useNavigate()
  const [time, setTime] = React.useState({ hh: '', mm: '', ss: '' })
  const [timers, setTimers] = React.useState([])
  const [selectedTimerId, setSelectedTimerId] = React.useState('')
  const reload = async _ => setTimers(await getTimers())
  const doCloseDialog = _ => setSelectedTimerId('')

  // the items includes the timers and also the 'timer input' to create new timers
  const items = React.useMemo(_ => {
    return [{ id: uuid.v1(), type: 'input' }, ...timers]
  }, [JSON.stringify(timers)])

  const doRenameTimer = _ => {
    navigate(`/rename-timer/${selectedTimerId}`)
    doCloseDialog()
  }

  const doDeleteTimer = async _ => {
    setSelectedTimerId(null)
    await deleteTimer(selectedTimerId)
    reload()
  }

  const doStartTimer = async timerId => {
    await updateTimer(timerId, { running: true, startFrom: Date.now() })
    reload()
  }

  const doStopTimer = async timerId => {
    await updateTimer(timerId, { running: false, startFrom: false })
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
      <Button
        title="Press to schedule a notification"
        onPress={_ => pushNotification()}
        style={tw('text-white')}
      />
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={items}
        renderItem={({ item }) => item.type == 'input'
          ? <TimerInput
              key={item.id}
              value={time}
              onChange={setTime}
              onSubmit={doCreateTimer}
              style={tw('mb-6')} />
          : <Timer
              key={item.id}
              running={item.running}
              startFrom={item.startFrom}
              seconds={item.seconds}
              name={item.name}
              onStart={_ => doStartTimer(item.id)}
              onStop={_ => doStopTimer(item.id)}
              onSelect={_ => setSelectedTimerId(item.id)}
              style={tw('mb-6')} />}
        keyExtractor={item => item.id}
        style={tw('w-full px-5 pt-5')} />
      <ContextMenu visible={!!selectedTimerId} onRequestClose={doCloseDialog}>
        <ContextMenuItem icon={RenameIcon} label="Rename" onPress={doRenameTimer} />
        <ContextMenuItem icon={DeleteIcon} label="Delete" onPress={doDeleteTimer} color={getColor('red-800')} />
      </ContextMenu>
    </PageLayout>
    <Outlet />
  </context.Provider>
}

export default HomePage
