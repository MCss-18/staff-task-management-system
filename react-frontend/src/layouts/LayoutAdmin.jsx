import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../components/admin/NavbarAdmin'

function LayoutAdmin() {
  return (
    <main>
      <NavbarAdmin/>
      <div className='content'>
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutAdmin