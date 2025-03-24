import React, { useEffect, useState } from 'react'
import userService from '../../../services/api/userService';
import { X } from 'lucide-react';
import Input from '../../common/Input';
import SelectRol from '../others/SelectRol';
import Button from '../../common/Button';
import PropTypes from 'prop-types';

function FormUser({ closeForm, userId, initialData, isUpdate, onSave }) {

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    names: '',
    surnames: '',
    username: '',
    email: '',
    password: '',
    id_rol: '',
    state: ''
  });

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        names: initialData.names,
        surnames: initialData.surnames,
        username: initialData.username,
        email:  initialData.email || '',
        password: '',
        rolId: initialData.rolId,
        state: initialData.state
      });
    }
  }, [initialData, isUpdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    let response;
    try {
      if (formData.email?.trim()){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  
        if (!emailRegex.test(formData.email)) { 
            throw new Error('Ingrese un correo válido');
        }
      }

      if (isUpdate) {
        response = await userService.modifyUser(userId, formData)
      } else {
        response = await userService.createUser(formData)
      }
      closeForm();
      if (onSave) onSave();

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(response?.error || 'Hubo un problema con la solicitud. Inténtelo de nuevo más tarde.');
      }
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="container-form">
      <div className='header-form'>
        <button type="button" onClick={closeForm}><X /></button>
      </div>
      <div className='title-form'>
        <h2>{isUpdate ? 'Actualizar' : 'Crear'} Usuario</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='group-form'>
          <div className='subgroup-form'>
           <label htmlFor="names">Nombres <span className='required'>*</span></label>
            <Input 
              type="text"
              id="names"
              name="names"
              placeholder='Nombres'
              value={formData.names}
              onChange={handleChange} 
              maxLength={100} 
              required
            />
          </div>
          <div className='subgroup-form'>
            <label htmlFor="surnames">Apellidos <span className='required'>*</span></label>
            <Input 
              type="text"
              id="surnames"
              name="surnames"
              placeholder='Apellidos'
              value={formData.surnames}
              onChange={handleChange} 
              maxLength={100} 
              required
            />
          </div>
          <div className='subgroup-form'>
            <label htmlFor="username">Usuario <span className='required'>*</span></label>
            <Input 
              type="text"
              id="username"
              name="username"
              placeholder='Usuario'
              value={formData.username}
              onChange={handleChange} 
              maxLength={100} 
              required
            />
          </div>
          <div className='subgroup-form'>
            <label htmlFor="email">Correo </label>
            <Input 
              type="email"
              id="email"
              name="email"
              placeholder='Correo'
              value={formData.email}
              onChange={handleChange} 
              maxLength={200} 
              autoComplete="email"
            />
          </div>
          <div className='subgroup-form'>
            <label htmlFor="password">Constraseña <span className='required'>*</span></label>
            <Input 
              type="password"
              id="password"
              name="password"
              placeholder='Contraseña'
              value={formData.password}
              onChange={handleChange} 
              maxLength={200}
            />
          </div>
     
          <div className='subgroup-form'>
            <label htmlFor="rol-select">Rol <span className='required'>*</span></label>
            <SelectRol
              handleChange={handleChange}
              formData={formData}
            />
          </div>
          <div className='subgroup-form'>
            <label htmlFor="state-select">Estado <span className='required'>*</span></label>
            <select className='state' value={formData.state} onChange={handleChange} id='state-select' required name="state">
              <option value="">Seleccionar un estado</option>
              <option value="1">Activo</option>
              <option value="0">Inactivo</option>
            </select>
          </div>
          <div className='subgroup-form'>
            <div style={{ whiteSpace: 'pre-line', color: 'red' }}>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
            <Button
              isLoading={isLoading}
            >
              { isUpdate ? 'Actualizar usuario' : 'Crear usuario' }
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

FormUser.propTypes = {
  closeForm: PropTypes.func.isRequired,
  userId: PropTypes.string,
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool,
  onSave: PropTypes.func
};

export default FormUser