import React, { memo } from 'react'
import { Container } from 'react-bootstrap'
import Header from './Header'

const Layout = memo(({ children }) => {
  return (
    <div className='min-vh-100 d-flex flex-column'>
      <Header />
      <main className='flex-grow-1'>
        <Container>{children}</Container>
      </main>
      <footer className='bg-dark text-white py-3 sticky-bottom'>
        <div className='container'>
          <div className='text-center'>
            <p className='mb-0'>© 2024 Query Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
})

export default Layout
