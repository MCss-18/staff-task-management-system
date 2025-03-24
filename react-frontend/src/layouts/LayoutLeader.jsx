import React from 'react'
import NavbarLeader from '../components/leader/NavbarLeader'
import { Outlet } from 'react-router-dom'

function LayoutLeader() {
  return (
    <main>
      <NavbarLeader/>
      <div className='content'>
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutLeader