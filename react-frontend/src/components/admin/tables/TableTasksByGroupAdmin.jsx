import React, { useEffect, useRef, useState } from 'react'
import TagTable from '../../common/TagTable';
import { Eye } from 'lucide-react';
import PropTypes from 'prop-types';

function TableTasksByGroupAdmin({ tasks }) {

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
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Tarea</th>
            <th>RESPONSABLE</th>
            <th>ESTADO</th>
            <th>CREACION</th>
            <th >
              ACCIONES
            </th>
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
              <td className='flex gap-2'>
                <button onClick={() => openModal(task)}>
                  <Eye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

TableTasksByGroupAdmin.propTypes = {
  tasks: PropTypes.array.isRequired
};

export default TableTasksByGroupAdmin