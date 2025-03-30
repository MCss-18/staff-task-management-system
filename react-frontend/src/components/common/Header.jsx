import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../store/useStore';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { iconUser } from '../../utils/dataImages';
import LogoutButton from './LogoutButton';
import { Menu, X } from 'lucide-react';

function UserProfile({ user }) {
  return (
    <div className="absolute top-full right-0 bg-white shadow-lg rounded-lg p-4 w-[250px] flex flex-col gap-3 z-10">
      <span className="text-black text-lg font-semibold">{user.names} {user.surnames}</span>
      <div className="border-t border-gray-300 pt-3 flex flex-col gap-2">
        <LogoutButton collapsed={true} />
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.object.isRequired
};


function Header({ navItems }) {
  const { user } = useAuthStore();
  const profileRef = useRef(null);
  const [showProfileUser, setShowProfileUser] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleProfileMenu = () => setShowProfileUser(!showProfileUser);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileUser(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cerrar meunu si el tamao de la pantalla es mayor a 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className="w-full text-white p-3 flex justify-between items-center"
      style={{
        backgroundColor: "var(--bg-nav)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white text-xl md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú en pantallas grandes */}
      <nav className="hidden md:flex items-center gap-4">
        <ul className="flex items-center gap-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <NavLink
                className={({ isActive }) =>
                  `text-white text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                    isActive ? "bg-red-500 text-white" : "hover:bg-red-400"
                  }`
                }
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {menuOpen && navItems.length > 0 && (
        <div className="absolute top-14 left-0 w-full bg-gray-800 p-4 md:hidden z-50">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  className={({ isActive }) =>
                    `block text-white text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
                      isActive ? "bg-red-500 text-white" : "hover:bg-red-400"
                    }`
                  }
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="relative">
        <button
          onClick={toggleProfileMenu}
          className="text-sm flex items-center gap-3 px-2 py-1 rounded-full transition-all hover:bg-red-500"
        >
          <span>{user.names}</span>
          <img
            src={iconUser}
            alt="User icon"
            className="w-8 h-8 rounded-full"
          />
        </button>

        {showProfileUser && (
          <div ref={profileRef} className="profile-dropdown absolute right-0 mt-2">
            <UserProfile user={user} />
          </div>
        )}
      </div>
    </header>
  );
}


export default Header