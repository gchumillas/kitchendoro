import React from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native'
import { Outlet, useNavigate } from 'react-router-native'
import uuid from 'react-native-uuid'
import { useKeepAwake } from 'expo-keep-awake'
import { getColor, tw } from '~/src/libs/tailwind'
import { time2Seconds } from '~/src/libs/utils'
import { pushNotification, cancelNotification } from '~/src/libs/notifications'
import PageLayout from '~/src/layouts/PageLayout'
import Timer from '~/src/components/display/Timer'
import ContextMenu, { ContextMenuItem } from '~/src/components/app/ContextMenu'
import TimerInput from '~/src/components/app/TimerInput'
import Footer from '~/src/components/app/Footer'
import { getTimers, createTimer, deleteTimer, updateTimer, readTimer } from '~/src/providers/timers'
import RenameIcon from '~/assets/icons/rename.svg'
import DeleteIcon from '~/assets/icons/delete.svg'
import { context } from './context'

const HomePage = _ => {
  useKeepAwake()
  const { t } = useTranslation('home')
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
    const { seconds, name } = await readTimer(timerId)
    const notificationId = await pushNotification({ seconds, title: t('ready', { name }) })
    await updateTimer(timerId, { running: true, startFrom: Date.now(), notificationId })
    reload()
  }

  const doStopTimer = async timerId => {
    const { notificationId } = await readTimer(timerId)
    await cancelNotification(notificationId)
    await updateTimer(timerId, { running: false })
    reload()
  }

  const doCreateTimer = async _ => {
    const seconds = time2Seconds(time)

    setTime({ hh: '', mm: '', ss: '' })
    await createTimer({ name: t`new timer`, seconds })
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
          ? <TimerInput
              key={item.id}
              label={t`new timer`}
              value={time}
              onChange={setTime}
              onSubmit={doCreateTimer}
              style={tw('mb-5')} />
          : <Timer
              key={item.id}
              running={item.running}
              startFrom={item.startFrom}
              seconds={item.seconds}
              name={item.name}
              onStart={_ => doStartTimer(item.id)}
              onStop={_ => doStopTimer(item.id)}
              onSelect={_ => setSelectedTimerId(item.id)}
              style={tw('mb-5')} />}
        keyExtractor={item => item.id}
        style={tw('w-full px-5 pt-5')} />
      <Footer />
    </PageLayout>
    <ContextMenu visible={!!selectedTimerId} onRequestClose={doCloseDialog}>
      <ContextMenuItem icon={RenameIcon} label={t`rename`} onPress={doRenameTimer} />
      <ContextMenuItem icon={DeleteIcon} label={t`delete`} onPress={doDeleteTimer} color={getColor('red-800')} />
    </ContextMenu>
    <Outlet />
  </context.Provider>
}

export default HomePage
