import React from 'react'
import './index.styl'

const Layout = ({ children = '' }) => {
  return (
    <div className='wrapper'>
      {children}
    </div>
  )
}

export default Layout
