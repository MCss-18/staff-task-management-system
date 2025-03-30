import { useEffect, useState } from 'react';
import Input from '../../components/common/Input'
import '../../styles/st-login.css'
import { logo, imgLogin } from '../../utils/dataImages'
import { useAuthStore } from '../../store/useStore.js';
import { Loader } from "lucide-react";

function LoginPage() {

  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState('');

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className='login-page'>
      <div className='login-form-container'>
        <div className='logo-wrapper'>
          <img src={logo} alt="" />
        </div>
        <div className='login-container'>
          <div className='login'>
            <div className='login__h'>
              <h2>Iniciar sesión</h2>
              <h3>Sistema de gestion de personal</h3>
            </div>
            <form action="login-form" onSubmit={handleLogin}>
              <Input 
                type='text'
                placeholder='Usuario'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <Input 
                type='password'
                placeholder='*******'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button>{isLoading ? <Loader className='loader-spin' /> : "Iniciar sesión"}</button>
            </form>
          </div>
        </div>
        <div className='copyrights'>
          <p>2025 © Ademinsac | Todos los Derechos Reservados</p>
        </div>
      </div>
      <div className='image-wrapper'>
        <img src={imgLogin} alt="Imagen del panel solar" className='image' />
      </div>
    </div>
  )
}

export default LoginPage