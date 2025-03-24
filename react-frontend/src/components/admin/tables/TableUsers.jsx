import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import TagTable from '../../common/TagTable';
import { PencilLine } from 'lucide-react';
import FormUser from '../forms/FormUser';

function TableUsers({ users, onUpdate }) {
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const overlayRef = useRef(null);

  const openForm = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && overlayRef.current === event.target) {
        closeForm();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeForm]);

  if (!users) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRES</th>
            <th>APELLIDOS</th>
            <th>CORREO</th>
            <th>ROL</th>
            <th>ESTADO</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.names}</td>
              <td>{user.surnames}</td>
              <td>{user.email}</td>
              <td>
                <TagTable state={user.rolId} type={3}/>
              </td>
              <td>
                <TagTable state={user.state} type={1}/>
              </td>
              <td>
                <button onClick={() => openForm(user)}>
                  <PencilLine />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && selectedUser && (
        <div className="overlay" ref={overlayRef}>
          <FormUser
            closeForm={closeForm}
            userId={selectedUser.userId}
            initialData={selectedUser}
            isUpdate={true}
            onSave={ onUpdate }
          />
        </div>
      )}
    </div>
  );
}

TableUsers.propTypes = {
  users: PropTypes.array.isRequired,
  onUpdate: PropTypes.func
};

export default TableUsers