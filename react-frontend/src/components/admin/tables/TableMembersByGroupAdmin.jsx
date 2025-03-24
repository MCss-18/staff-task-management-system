import { Eye } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';

function TableMembersByGroupAdmin({members}) {

  const [ selectedMember, setSelectedMember] = useState(null);
  const [showModalMember, setShowModalMember] = useState(false);
  const overlayRef = useRef(null);

  const openModal = (group) => {
    setSelectedMember(group);
    setShowModalMember(true);
  };

  const closeForm = () => {
    setShowForm(false)
    setShowModalMember(false)
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

  if (!members) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>MIEMBRO</th>
            <th>CREACION</th>
            <th >
              ACCIONES
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.groupStaffId}>
              <td>{index + 1}</td>
              <td>{member.surnames}, {member.names}</td>
              <td>{member.creationDate}</td>
              <td className='flex gap-2'>
                <button onClick={() => openModal(member)}>
                  <Eye />
                </button>
                {/* <button onClick={() => openModal(member)}>
                  <Trash2 />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

TableMembersByGroupAdmin.propTypes = {
  members: PropTypes.array.isRequired
};

export default TableMembersByGroupAdmin