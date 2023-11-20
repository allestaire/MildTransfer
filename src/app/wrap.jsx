'use client'
import GlobalContext from '@/machines/provider'

const Wrap = ({
  children
}) => {

  return (
    <GlobalContext.Provider>
      {children}
    </GlobalContext.Provider>
  )
}

export default Wrap
