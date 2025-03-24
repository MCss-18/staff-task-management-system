import React, { useEffect, useRef, useState } from 'react'
import TagTable from '../../common/TagTable';
import { Eye, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';

function TableTasksByGroup({ tasks }) {

  const [showForm, setShowForm] = useState(false);
  const [ selectedTask, setSelectedTask] = useState(null);
  const [showModalTask, setShowModalTask] = useState(false);
  const overlayRef = useRef(null);

  const openForm = (group) => {
    setSelectedTask(group);
    setShowForm(true);
  };

  const openModal = (group) => {
    setSelectedTask(group);
    setShowModalTask(true);
  };

  const closeForm = () => {
    setShowForm(false)
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
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>TAREA</th>
            <th>RESPONSABLE</th>
            <th>ESTADO</th>
            <th>CREACION</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.taskId}>
              <td>{index + 1}</td>
              <td>{task.typeStack}</td>
              <td>{task.surnames}, {task.names}</td>
              <td>
                <TagTable state={task.state} type={2} />
              </td>
              <td>{task.creationDate}</td>
              <td>
                <button onClick={() => openModal(task)}>
                  <Eye />
                </button>
              </td>
              <td>
                <button onClick={() => openModal(task)}>
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

TableTasksByGroup.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default TableTasksByGroup