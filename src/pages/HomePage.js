import React from 'react'
import { FlatList } from 'react-native'
import { range } from '~/src/libs/utils'
import { tw } from '~/src/libs/tailwind'
import PageLayout from '~/src/layouts/PageLayout'
import Timer from '~/src/components/Timer'

const items = range({ from: 1, to: 10 }).map(i => ({ id: `${i}`, label: `Item ${i}` }))

const HomePage = _ => {
  return <PageLayout>
    <FlatList
      data={items}
      renderItem={({ item }) => <Timer key={item.id} style={tw('mb-6')} />}
      keyExtractor={item => item.id}
      style={tw('w-full px-5')} />
  </PageLayout>
}

export default HomePage
