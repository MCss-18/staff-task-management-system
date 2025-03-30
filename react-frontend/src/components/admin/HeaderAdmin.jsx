import React from 'react'
import Header from '../common/Header';

function HeaderAdmin() {
  const items = [
    {
      id: 1,
      label: "Dashboard",
      path: "dashboard"
    },
    {
      id: 2,
      label: "Grupos",
      path: "grupos"
    },
    {
      id: 3,
      label: "Usuarios",
      path: "usuarios"
    },
  ];

  return <Header navItems={items} />;
}

export default HeaderAdmin