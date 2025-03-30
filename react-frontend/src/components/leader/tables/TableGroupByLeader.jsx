import React, { useEffect, useRef, useState } from 'react'
import FormGroup from '../forms/FormGroup';
import TagTable from '../../common/TagTable';
import { Eye, PencilLine } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Table from '../../common/Table';

const columns = [
  { 
    key: "nameGroup", 
    label: "GRUPO"
  },
  { 
    key: "memberCount", 
    label: "N° MIEMBROS" 
  },
  { 
    key: "userSurnames", 
    label: "RESPONSABLE",
    render: (_,row) => `${row?.userSurnames ?? 'N/A'}, ${row?.userNames ?? 'N/A'}` 
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

function TableGroupByLeader({ groups, onUpdate, isLoading }) {

  const [showForm, setShowForm] = useState(false);
  const [ selectedGroup, setSelectedGroup] = useState(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

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

  
  return (
    <>
      <Table
        columns={columns}
        data={groups}
        isLoading={isLoading}
        actionButton={(group) => (
          <div className='flex gap-2 relative'>
            <button 
              onClick={() => openForm(group)}
              className="p-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-500 hover:text-yellow-700 rounded-md btn-tooltip"
            >
              <PencilLine />
            </button>
            <button 
              onClick={() => navigate("detalles", { state: { groupId: group.groupId } })}
              className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-700 rounded-md btn-tooltip"
            >
              <Eye />
            </button>
          </div>
        )}
      />
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
    </>
  );
}

TableGroupByLeader.propTypes = {
  groups: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func
};


export default TableGroupByLeader