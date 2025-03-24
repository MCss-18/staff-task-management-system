import React, { useState } from 'react'
import { useAuthStore } from '../../store/useStore';
import { iconUser } from '../../utils/dataImages';
import PropTypes from 'prop-types';
import LogoutButton from './LogoutButton';
import { NavLink } from 'react-router-dom';
import '../../styles/st-navbar.css'

function Sidebar({ items }) {
  const [collapsed, setCollapsed] = useState(true);
  const { user } = useAuthStore();

  return (
    <nav className={`transition-all duration-200 ease-in-out ${!collapsed ? "menu-collapsed" : ""}`}>
      <div className="navbar">
        <div className="navbar-header">
          {/* Profile */}
          <div className="navbar-header__profile relative">
            <div className="navbar-header__profile__logo">
              <img src={iconUser} alt="icon-user" />
            </div>
            <div className="navbar-header__profile__info flex flex-col gap-2 transition-all duration-200 ease-in-out">
              {collapsed && <span className="text-center font-bold text-sm">{user.names} {user.surnames}</span>}
            </div>
            <div className="flex items-center justify-between absolute right-[-25px]">
              <button onClick={() => setCollapsed(!collapsed)} className="btn-navbar">
                {collapsed ? ">" : "<"}
              </button>
            </div>
          </div>
          <hr />
          
          {/* Menu */}
          <div className="navbar-header__options">
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <NavLink className={`item transition-all duration-300 ease-in-out ${!collapsed ? "collapsed" : ""}`} to={item.url}>
                    <item.icon className="w-5 h-5" />
                    {collapsed && <span className="transition-all duration-200 ease-in-out">{item.title}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* footer */}
        <div className="navbar-footer">
          <hr />
          <div className="navbar-footer__logout">
            <ul>
              <li>
                <LogoutButton collapsed={collapsed} />
              </li>
            </ul>
            <span className="mt-3 transition-all duration-300 ease-in-out vs text-xs text-center">v.1.0.0</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

Sidebar.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Sidebar