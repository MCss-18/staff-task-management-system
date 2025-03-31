import React from 'react'
import Header from '../common/Header';

function HeaderTechnician() {
  const items = [
    {
      id: 1,
      label: "Grupos",
      path: "grupos"
    }
  ];

  return <Header navItems={items} />;
}

export default HeaderTechnician