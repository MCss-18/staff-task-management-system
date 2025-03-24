import { UsersRound } from 'lucide-react';
import Sidebar from '../common/Sidebar';

const NavbarLeader = () => {
  const items = [
    {
      id: 1,
      title: "Grupos",
      url: "grupos",
      icon: UsersRound,
    },
  ];

  return <Sidebar items={items} />;
};

export default NavbarLeader