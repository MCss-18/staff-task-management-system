import { LogOut } from "lucide-react";
import { useAuthStore } from "../../store/useStore";
import IconButton from "./IconButton";

const LogoutButton= ({ collapsed }) => {
  const { isLoading, logout } = useAuthStore();

  return (
    <IconButton 
      icon={LogOut} 
      className={`item ${!collapsed ? "collapsed" : ""}`}
      onClick={() => logout()}  
    >
      {collapsed && (isLoading ? "Cerrando sesión..." : "Cerrar sesión")}
    </IconButton>
  );
};

export default LogoutButton;