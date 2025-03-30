import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderAdmin from '../components/admin/HeaderAdmin'

function LayoutAdmin() {
  return (
    <main>
      <HeaderAdmin/>
      <div className='content'>
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutAdmin