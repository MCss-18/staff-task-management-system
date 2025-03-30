import React, { useState } from 'react'
import { useAuthStore } from '../../store/useStore';
import { iconUser } from '../../utils/dataImages';
import PropTypes from 'prop-types';
import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';

function Sidebar({ items }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuthStore();

  return (
    <nav
      className={`h-screen flex flex-col justify-between items-center border-r transition-all duration-300 ease-in-out ${
        collapsed ? "w-[var(--width-collapsed)] p-4" : "w-[var(--width)] p-6"
      }`}
      style={{
        backgroundColor: "var(--bg-nav)",
        color: "var(--text-secondary)",
        borderColor: "var(--border)",
      }}
    >
      {/* Navbar Container */}
      <div className="w-full flex flex-col gap-4">
        {/* Profile */}
        <div className="flex flex-col items-center gap-2 relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img src={iconUser} alt="User" className="w-full h-full object-cover" />
          </div>
          {!collapsed && (
            <span className="text-white font-bold text-sm">
              {user.names} {user.surnames}
            </span>
          )}

          {/* Toggle sidebar button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute right-[-35px] w-7 h-7 bg-gray-100 text-gray-700 flex items-center justify-center rounded-full shadow-sm hover:bg-gray-200 transition z-10"
          >
            {collapsed ? ">" : "<"}
          </button>
        </div>

        <hr className="border-gray-500 w-full" />

        {/* Menu */}
        <ul className="flex flex-col items-center gap-3 text-sm">
          {items.map((item) => (
            <li key={item.id} className="w-full">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-300 ease-in-out text-white ${
                    collapsed ? "justify-center" : "justify-start"
                  } ${
                    isActive ? "bg-red-500" : "hover:bg-red-400"
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* footer */}
      <div className="w-full flex flex-col items-center gap-3">
        <hr className="border-gray-500 w-full" />
        <LogoutButton collapsed={!collapsed} />
        <span className="text-xs text-white">v.1.0.0</span>
      </div>
    </nav>
  );
}


Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Sidebar