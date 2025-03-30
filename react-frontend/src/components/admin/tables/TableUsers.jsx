import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import TagTable from '../../common/TagTable';
import { PencilLine } from 'lucide-react';
import FormUser from '../forms/FormUser';
import Table from '../../common/Table';

const columns = [
  { 
    key: "names", 
    label: "NOMBRES"
  },
  { 
    key: "surnames", 
    label: "APELLIDOS" 
  },
  { 
    key: "email", 
    label: "CORREO" 
  },
  { 
    key: "username", 
    label: "USUARIO" 
  },
  { 
    key: "rolId", 
    label: "ROL",
    render: (value) => <TagTable state={value} type={3} />
  },
  { 
    key: "state", 
    label: "ESTADO",
    render: (value) => <TagTable state={value} type={1} />
  },
  { 
    key: "creationDate", 
    label: "CREACION" 
  }
];

function TableUsers({ users, isLoading, onUpdate }) {
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
    <>
      <Table
        columns={columns}
        data={users}
        isLoading={isLoading}
        actionButton={(user) => (
          <div className='flex gap-2 relative'>
            <button 
              onClick={() => openForm(user)}
              className="p-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-500 hover:text-yellow-700 rounded-md"
            >
              <PencilLine />
            </button>
          </div>
        )}
      />
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
    </>
  );
}

TableUsers.propTypes = {
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.func.isRequired,
  onUpdate: PropTypes.func
};

export default TableUsers