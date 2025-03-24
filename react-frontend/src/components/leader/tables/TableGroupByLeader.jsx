import React, { useEffect, useRef, useState } from 'react'
import FormGroup from '../forms/FormGroup';
import TagTable from '../../common/TagTable';
import { Eye, PencilLine } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TableGroupByLeader({ groups, onUpdate }) {

  const [showForm, setShowForm] = useState(false);
  const [ selectedGroup, setSelectedGroup] = useState(null);
  const overlayRef = useRef(null);

  const openForm = (group) => {
    setSelectedGroup(group);
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

  if (!groups) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>GUPO</th>
            <th>MIEMBROS</th>
            <th>ESTADO</th>
            <th>CREACION</th>
            <th >
              ACCIONES
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.groupId}>
              <td>{group.groupId}</td>
              <td>{group.nameGroup}</td>
              <td>{group.memberCount}</td>
              <td>
                <TagTable state={group.state} type={1} />
              </td>
              <td>{group.creationDate}</td>
              <td className='flex gap-2'>
                <button onClick={() => openForm(group)}>
                  <PencilLine />
                </button>
                <Link className='p-2 bg-slate-600' to={`detalles/${group.groupId}`}>
                  <Eye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && selectedGroup && (
        <div className="overlay" ref={overlayRef}>
          <FormGroup
            closeForm={closeForm}
            groupId={selectedGroup.groupId}
            initialData={selectedGroup}
            isUpdate={true}
            onSave={ onUpdate }
          />
        </div>
      )}
    
    </div>
  );
}

TableGroupByLeader.propTypes = {
  groups: PropTypes.array.isRequired,
  onUpdate: PropTypes.func
};


export default TableGroupByLeader