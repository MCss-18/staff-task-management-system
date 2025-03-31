import { Outlet } from 'react-router-dom';
import HeaderTechnician from '../components/technician/HeaderTechnician';

function LayoutTechnician() {

  return (
    <main>
      <HeaderTechnician/>
      <div className='content'>
        <Outlet />
      </div>
    </main>
  )
}

export default LayoutTechnician