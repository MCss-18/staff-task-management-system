import React, { useEffect, useState } from 'react'
import groupService from '../../../services/api/groupService';
import { X } from 'lucide-react';
import Button from '../../common/Button';
import { PropTypes } from 'prop-types';
import Input from '../../common/Input';
import { useAuthStore } from '../../../store/useStore';

function FormGroup({ closeForm, groupId, initialData, isUpdate, onSave }) {

  const { user } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    leadUserId: user.userId,
    nameGroup: '',
    state: ''
  });

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        leadUserId: initialData.leadUserId,
        nameGroup: initialData.nameGroup,
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
      if (isUpdate) {
        response = await groupService.updateGroup(groupId, formData)
      } else {
        response = await groupService.createGroup(formData)
      }
      closeForm();
      if (onSave) onSave();

    } catch (error) {

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
        <h2>{isUpdate ? 'Actualizar' : 'Crear'} grupo</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='group-form'>
          <div className='subgroup-form'>
           <label htmlFor="nameGroup">Nombre <span className='required'>*</span></label>
            <Input 
              type="text"
              id="nameGroup"
              name="nameGroup"
              placeholder='Grupo'
              value={formData.nameGroup}
              onChange={handleChange} 
              maxLength={100} 
              required
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
              { isUpdate ? 'Actualizar grupo' : 'Crear grupo' }
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

FormGroup.propTypes = {
  closeForm: PropTypes.func.isRequired,
  groupId: PropTypes.number,
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool,
  onSave: PropTypes.func
}

export default FormGroup