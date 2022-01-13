import React from 'react'
import { FlatList } from 'react-native'
import { range } from '~/src/libs/utils'
import { tw } from '~/src/libs/tailwind'
import RenameIcon from '~/assets/icons/rename.svg'
import DeleteIcon from '~/assets/icons/delete.svg'
import ContextMenu, { ContextMenuItem } from '~/src/components/ContextMenu'
import PageLayout from '~/src/layouts/PageLayout'
import Timer from '~/src/components/Timer'

const items = range({ from: 1, to: 10 }).map(i => ({ id: `${i}`, label: `Item ${i}` }))

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
      renderItem={({ item }) => <Timer key={item.id} style={tw('mb-6')} />}
      keyExtractor={item => item.id}
      style={tw('w-full px-5 pt-5')} />
    <ContextMenu visible>
      <ContextMenuItem icon={RenameIcon} label="Rename" onPress={doRenameTimer} />
      <ContextMenuItem icon={DeleteIcon} label="Delete" onPress={doDeleteTimer} />
    </ContextMenu>
  </PageLayout>
}

export default HomePage
