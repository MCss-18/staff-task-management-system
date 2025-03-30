import React from 'react'
// import NavbarLeader from '../components/leader/NavbarLeader'
import { Outlet } from 'react-router-dom'
import HeaderLead from '../components/leader/HeaderLead'

function LayoutLeader() {
  return (
    <main>
      <HeaderLead/>
      <div className='content'>
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutLeader