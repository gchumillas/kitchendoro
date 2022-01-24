import React from 'react'
import { View } from 'react-native'
import { tw } from '~/src/libs/tailwind'
import Text from '~/src/components/display/Text'
import Footer from '~/src/components/app/Footer'
import PageLayout from '~/src/layouts/PageLayout'

const ChronoPage = _ => {
  return <PageLayout footer={<Footer />}>
    <View style={tw('flex-shrink flex-grow px-5 pt-5')}>
      <Text>chrono page</Text>
    </View>
  </PageLayout>
}

export default ChronoPage
