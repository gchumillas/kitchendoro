import React from 'react'
import { FlatList } from 'react-native'
import uuid from 'react-native-uuid'
import { tw } from '~/src/libs/tailwind'
import RenameIcon from '~/assets/icons/rename.svg'
import DeleteIcon from '~/assets/icons/delete.svg'
import ContextMenu, { ContextMenuItem } from '~/src/components/ContextMenu'
import PageLayout from '~/src/layouts/PageLayout'
import { TimerInput } from '~/src/components/inputs'
import Timer from '~/src/components/Timer'
import { getTimers, createTimer } from '~/src/providers/timers'

const text2Number = text => {
  const val = parseInt(text, 10)
  return isNaN(val) ? 0 : val
}

const HomePage = _ => {
  const [time, setTime] = React.useState({ hh: '', mm: '', ss: '' })
  const [timers, setTimers] = React.useState([])
  const items = React.useMemo(_ => [...timers, { id: uuid.v1(), type: 'input' }], [JSON.stringify(timers)])
  const reload = async _ => setTimers(await getTimers())

  const doRenameTimer = _ => {
    console.log('unimplemented')
  }

  const doDeleteTimer = _ => {
    console.log('unimplemented')
  }

  const doCreateTimer = async _ => {
    const { hh, mm, ss } = time
    const seconds = text2Number(hh) * 3600 + text2Number(mm) * 60 + text2Number(ss)

    await createTimer({ name: 'New Timer', seconds })
    reload()
  }

  React.useEffect(_ => {
    reload()
  }, [])

  return <PageLayout>
    <FlatList
      keyboardShouldPersistTaps="handled"
      data={items}
      renderItem={({ item }) => item.type == 'input'
        ? <TimerInput key={item.id} value={time} onChange={setTime} onSubmit={doCreateTimer} />
        : <Timer key={item.id} style={tw('mb-6')} />}
      keyExtractor={item => item.id}
      style={tw('w-full px-5 pt-5')} />
    <ContextMenu visible={false}>
      <ContextMenuItem icon={RenameIcon} label="Rename" onPress={doRenameTimer} />
      <ContextMenuItem icon={DeleteIcon} label="Delete" onPress={doDeleteTimer} />
    </ContextMenu>
  </PageLayout>
}

export default HomePage
