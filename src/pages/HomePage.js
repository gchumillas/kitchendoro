import React from 'react'
import { FlatList } from 'react-native'
import { useTailwind } from 'tailwind-rn'
import { range } from '~/src/libs/utils'
import PageLayout from '~/src/layouts/PageLayout'
import Timer from '~/src/components/Timer'

const items = range({ from: 1, to: 10 }).map(i => ({ id: `${i}`, label: `Item ${i}` }))

const HomePage = _ => {
  const tw = useTailwind()

  return <PageLayout>
    <FlatList
      data={items}
      renderItem={({ item }) => <Timer key={item.id} />}
      keyExtractor={item => item.id}
      style={tw('w-full')} />
  </PageLayout>
}

export default HomePage
