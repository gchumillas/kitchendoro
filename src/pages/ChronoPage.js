import React from 'react'
import Text from '~/src/components/display/Text'
import Footer from '~/src/components/app/Footer'
import PageLayout from '~/src/layouts/PageLayout'

const ChronoPage = _ => {
  return <PageLayout footer={<Footer />}>
    <Text>chrono page</Text>
  </PageLayout>
}

export default ChronoPage
