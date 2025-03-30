import React, { useEffect, useRef, useState } from 'react'
import TagTable from '../../common/TagTable';
import { Eye } from 'lucide-react';
import PropTypes from 'prop-types';
import Table from '../../common/Table';

const columns = [
  { 
    key: "codOt", 
    label: "CODIGO OT"
  },
  { 
    key: "typeStack", 
    label: "TAREA" 
  },
  { 
    key: "surnames", 
    label: "RESPONSABLE",
    render: (_,row) => `${row?.surnames ?? 'N/A'}, ${row?.names ?? 'N/A'}` 
  },
  { 
    key: "state", 
    label: "ESTADO",
    render: (value) => <TagTable state={value} type={2} />
  },
  { 
    key: "creationDate", 
    label: "CREACION" 
  }
];


function TableTasksByGroupAdmin({ tasks, isLoading }) {

  const [ selectedTask, setSelectedTask] = useState(null);
  const [showModalTask, setShowModalTask] = useState(false);
  const overlayRef = useRef(null);

  const openModal = (group) => {
    setSelectedTask(group);
    setShowModalTask(true);
  };

  const closeForm = () => {
    setShowModalTask(false)
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

  if (!tasks) {
    return <div>Cargando...</div>;
  }

  return (
    <>
    <Table
      columns={columns}
      data={tasks}
      isLoading={isLoading}
      actionButton={(task) => (
        <div className='flex gap-2 relative'>
          <button 
            className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-700 rounded-md btn-tooltip"
          >
            <Eye />
            <span className="tooltip-text">Ver demoras</span>
          </button>
        </div>
      )}
    />
    {showModalTask && selectedTask && (
      <div className="overlay" >
  
      </div>
    )}
  </>
  );
}

TableTasksByGroupAdmin.propTypes = {
  tasks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default TableTasksByGroupAdmin