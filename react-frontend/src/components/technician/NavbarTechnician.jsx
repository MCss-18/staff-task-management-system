import { Paperclip } from 'lucide-react'
import Sidebar from '../common/Sidebar';

const NavbarTechnician = () => {
  const items = [
    {
      id: 1,
      title: "Tareas",
      url: "tareas",
      icon: Paperclip,
    },
  ];

  return <Sidebar items={items} />;
};

export default NavbarTechnician