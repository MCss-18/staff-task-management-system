import React, { useEffect, useRef, useState } from 'react'
import TagTable from '../../common/TagTable';
import { Eye, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import Table from '../../common/Table';
import taskService from '../../../services/api/taskService';
import DialogAdvertaising from '../others/DialogAdvertaising';
import DetailsTaskDelay from '../../admin/modal/DetailsTaskDelay';

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

function TableTasksByGroup({ tasks, isLoading, onSave }) {

  const [ selectedTask, setSelectedTask] = useState(null);
  const [showModalTask, setShowModalTask] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
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

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setShowDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask) return;

    try {
      await taskService.deleteTask(selectedTask.taskId);
      if (onSave) onSave();
    } catch (error) {
      console.error("Error eliminando el ítem:", error);
    }

    setShowDialog(false);
  };

  return (
    <>
      <Table
        columns={columns}
        data={tasks}
        isLoading={isLoading}
        actionButton={(task) => (
          <div className='flex gap-2 relative'>
            <button 
              onClick={() => openModal(task)}
              className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-700 rounded-md btn-tooltip"
            >
              <Eye />
              <span className="tooltip-text">Ver demoras</span>
            </button>
            <button 
              onClick={() => handleDeleteClick(task)}
              className="p-1 bg-red-100 hover:bg-red-200 text-red-500 hover:text-red-700 rounded-md"
            >
              <Trash2 />
            </button>
          </div>
        )}
      />
      {showDialog && selectedTask && (
        <div className="overlay" >
          <DialogAdvertaising
            onClose={() => setShowDialog(false)}
            onConfirm={handleConfirmDelete}
            task={selectedTask}
          />
        </div>
      )}
      {showModalTask && selectedTask && (
        <div className="overlay" >
          <DetailsTaskDelay 
            taskId={selectedTask.taskId}
            close={closeForm}
          />
        </div>
      )}
    </>
  );
}

TableTasksByGroup.propTypes = {
  tasks: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSave: PropTypes.func,
};

export default TableTasksByGroup