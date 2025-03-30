import { UsersRound } from 'lucide-react'
import Sidebar from '../common/Sidebar';

const NavbarTechnician = () => {
  const items = [
    {
      id: 1,
      title: "Grupos",
      url: "",
      icon: UsersRound,
    },
  ];

  return <Sidebar items={items} />;
};

export default NavbarTechnician