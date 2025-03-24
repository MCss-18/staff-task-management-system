import { GroupIcon, LayoutDashboard, Users } from 'lucide-react';
import React from 'react'
import Sidebar from '../common/Sidebar';

function NavbarAdmin() {
  const items = [
    {
      id: 1,
      title: "Dashboard",
      url: "dashboard",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      title: "Grupos",
      url: "grupos",
      icon: GroupIcon,
    },
    {
      id: 3,
      title: "usuarios",
      url: "usuarios",
      icon: Users,
    },
  ];

  return <Sidebar items={items} />;
}

export default NavbarAdmin