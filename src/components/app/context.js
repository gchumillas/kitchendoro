import React from 'react'

export const context = React.createContext({
  reload: _ => Promise.resolve()
})
