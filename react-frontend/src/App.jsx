import { useEffect } from 'react'
import './App.css'
import { useAuthStore } from './store/useStore';
import LoginPage from './pages/auth/LoginPage';
import PropTypes from 'prop-types';
import LayoutTechnician from './layouts/LayoutTechnician';
import { Routes, Route, Navigate } from 'react-router-dom'
import LoadingSpinner from './components/common/LoadingSpinner';
import TasksPage from './pages/technician/TasksPage';
import LayoutLeader from './layouts/LayoutLeader';
import GroupPageLeader from './pages/leader/GroupPageLeader';
import DetailsByGroup from './components/leader/modal/DetailsByGroup';
import LayoutAdmin from './layouts/LayoutAdmin';
import DashboardPageAdmin from './pages/admin/DashboardPageAdmin';
import GroupPageAdmin from './pages/admin/GroupPageAdmin';
import UserPageAdmin from './pages/admin/UserPageAdmin';
import DetailsByGroupAdmin from './components/admin/modal/DetailsByGroupAdmin';
import GroupPage from './pages/technician/GroupPage';
import NotFoundPage from './pages/errors/NotFoundPage';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user} = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  if (!allowedRoles.includes(user.rolId)) {
    if (user.rolId === 1) return <Navigate to="/gerencia/dashboard" replace />;
    if (user.rolId === 2) return <Navigate to="/supervisor/grupos" replace />;
    if (user.rolId === 3) return <Navigate to="/inspector" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (isAuthenticated) {
    if (user.rolId === 1) {
      return <Navigate to="/gerencia/dashboard" replace />;
    }

    if (user.rolId === 2) {
      return <Navigate to="/supervisor/grupos" replace />;
    }

    if (user.rolId === 3) {
      return <Navigate to="/inspector" replace />;
    }
  }

  return children;
};


function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <RedirectAuthenticatedUser>
            <LoginPage/>
          </RedirectAuthenticatedUser>
        }
      />
      <Route 
        path="/gerencia" 
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <LayoutAdmin/>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPageAdmin />}/>
        <Route path="grupos" element={<GroupPageAdmin />}>
          <Route path="detalles" element={ <DetailsByGroupAdmin />} />
        </Route>
        <Route path="usuarios" element={<UserPageAdmin />}/>
      </Route>
      <Route
        path="/supervisor" 
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <LayoutLeader/>
          </ProtectedRoute>
        }
      >
        <Route path="grupos" element={<GroupPageLeader />}>
          <Route path="detalles" element={ <DetailsByGroup />} />
        </Route>
      </Route>
      <Route
        path="/inspector" 
        element={
          <ProtectedRoute allowedRoles={[3]}>
            <LayoutTechnician />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<GroupPage />}/>
        <Route path="tareas" element={<TasksPage />}/>
      </Route>

      <Route path="*" element={ <NotFoundPage/> } />
    </Routes>
  )
}

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node,
};

RedirectAuthenticatedUser.propTypes = {
  children: PropTypes.node,
};


export default App
