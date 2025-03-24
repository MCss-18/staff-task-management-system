import React, { useState } from 'react'
import SelectAvailableMembers from './ui/SelectAvailableMembers'
import groupMemberService from '../../../services/api/groupMemberService';
import Button from '../../common/Button';
import { X } from 'lucide-react';
import { PropTypes } from 'prop-types';

function FormGroupMember({ closeForm, groupId, onSave }) {

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    groupId: groupId,
    members: []
  });

  const handleAddItem = (staff) => {
    if (!staff || !staff.staffId) {
      setErrorMessage('Usuario inválido seleccionado.');
      return;
    }

    if (formData.members.some((tech) => tech.staffId === staff.staffId)) {
      setErrorMessage('Este técnico ya ha sido seleccionado.');
      return;
    }

    setFormData({
      ...formData,
      members: [...formData.members, staff]
    });
    setErrorMessage('');
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...formData.members];
    updatedList.splice(index, 1);
    setFormData({ ...formData, members: updatedList });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      if (!formData.groupId) {
        throw new Error("El ID del grupo es obligatorio");
      }

      const { members } = formData;
      const memberIds = members.map(tech => tech.staffId).filter(id => id);
      if (memberIds.length === 0) {
        throw new Error('Debe agregar al menos un usuario');
      }

      await groupMemberService.createGroupMembers(formData);
      // success("Usuarios agregados exitosamente")
      closeForm();
      if (onSave) onSave();
    } catch (err) {
      setErrorMessage("Error: ", err.message )
      // error("Error, sucedio algo inesperado")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-form">
      <div className='header-form'>
        <button type="button" onClick={closeForm}><X /></button>
      </div>
      <div className='title-form'>
        <h2>Miembros</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='group-form'>
          <div className='subgroup-form'>
            <label htmlFor="state-select">Estado <span className='required'>*</span></label>
            <SelectAvailableMembers 
              groupId = {groupId}
              handleAddItem= {handleAddItem}
              formData = {formData}
            />
          </div>
          <div className='subgroup-form'>
            {formData.members.map((tech, index) => (
              <div key={tech.staffId} className="member-item">
                <p >{tech.surnames} {tech.names}</p>
                <button 
                  type="button" 
                  className='btn-delete-item' 
                  onClick={() => handleRemoveItem(index)}
                >
                  <X/>
                </button>
              </div>
            ))}
          </div>
          <div className='subgroup-form'>
            {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
            <Button isLoading={loading}>
              Agregar usuarios
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

FormGroupMember.propTypes = {
  closeForm: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  groupId: PropTypes.number.isRequired
}

export default FormGroupMember