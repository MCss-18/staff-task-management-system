import { Outlet } from 'react-router-dom';
import NavbarTechnician from '../components/technician/NavbarTechnician';

function LayoutTechnician() {

  return (
    <main>
      <NavbarTechnician/>
      <div className='content'>
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutTechnician