import React from 'react'
import { FlatList } from 'react-native'
import { range } from '~/src/libs/utils'
import { tw } from '~/src/libs/tailwind'
import RenameIcon from '~/assets/icons/rename.svg'
import DeleteIcon from '~/assets/icons/delete.svg'
import ContextMenu, { ContextMenuItem } from '~/src/components/ContextMenu'
import PageLayout from '~/src/layouts/PageLayout'
import { TimerInput } from '~/src/components/inputs'
import Timer from '~/src/components/Timer'

const items = range({ from: 1, to: 3 }).map(i => ({ id: `${i}`, label: `Item ${i}`, type: i < 3 ? 'timer' : 'input' }))

const doRenameTimer = _ => {
  console.log('unimplemented')
}

const doDeleteTimer = _ => {
  console.log('unimplemented')
}

const HomePage = _ => {
  return <PageLayout>
    <FlatList
      data={items}
      renderItem={({ item }) => item.type == 'timer' ? <Timer key={item.id} style={tw('mb-6')} /> : <TimerInput />}
      keyExtractor={item => item.id}
      style={tw('w-full px-5 pt-5')} />
    <ContextMenu visible={false}>
      <ContextMenuItem icon={RenameIcon} label="Rename" onPress={doRenameTimer} />
      <ContextMenuItem icon={DeleteIcon} label="Delete" onPress={doDeleteTimer} />
    </ContextMenu>
  </PageLayout>
}

export default HomePage
