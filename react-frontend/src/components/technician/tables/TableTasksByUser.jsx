import React, { useEffect, useRef, useState } from 'react'
import TagTable from '../../common/TagTable';
import PropTypes from 'prop-types';
import { PencilLine } from 'lucide-react';
import FormTask from '../forms/FormTask';
import Table from '../../common/Table';

const columns = [
  { 
    key: "codOt", 
    label: "CODIGO OT"
  },
  { 
    key: "typeTask", 
    label: "DESCRIPCION" 
  },
  { 
    key: "stateTask", 
    label: "ESTADO",
    render: (value) => <TagTable state={value} type={2} />
  },
  { 
    key: "startTask", 
    label: "HORA INICIO" 
  },
  { 
    key: "endTask", 
    label: "HORA FIN" 
  },
  { 
    key: "creationDate", 
    label: "CREACION" 
  }
];

function TableTasksByUser({ tasks, onUpdate, isLoading }) {

  const [showForm, setShowForm] = useState(false);
  const [ selectedTask, setSelectedTask ] = useState(null);
  const overlayRef = useRef(null);

  const openForm = (client) => {
    setSelectedTask(client);
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
              onClick={() => openForm(task)}
              className="p-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-500 hover:text-yellow-700 rounded-md btn-tooltip"
            >
              <PencilLine />
            </button>
          </div>
        )}
      />
      {showForm && selectedTask && (
        <div className="overlay" ref={overlayRef}>
          <FormTask
            closeForm={closeForm}
            taskId={selectedTask.taskId}
            initialData={selectedTask}
            onSave={ onUpdate }
          />
        </div>
      )}
    </>
  );
}

TableTasksByUser.propTypes = {
  tasks: PropTypes.array.isRequired,
  isLoading: PropTypes.func.isRequired,
  onUpdate: PropTypes.func
};

export default TableTasksByUser