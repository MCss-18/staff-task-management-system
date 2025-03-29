import React, { useEffect, useRef, useState } from 'react'
import TagTable from '../../common/TagTable';
import PropTypes from 'prop-types';
import { PencilLine } from 'lucide-react';
import '../../../styles/st-table.css';
import FormTask from '../forms/FormTask';

function TableTasksByUser({ tasks, onUpdate }) {

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
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>CODIGO</th>
            <th>DESCRIPCION</th>
            <th>ESTADO</th>
            <th>HORA INICIO</th>
            <th>HORA FIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.taskId}>
              <td>{index+1}</td>
              <td>{task.codOt}</td>
              <td>{task.typeTask}</td>
              <td>
                <TagTable state={task.stateTask} type={2} />
              </td>
              <td>{task.startTask}</td>
              <td>{task.endTask}</td>
              <td>
                <button onClick={() => openForm(task)}>
                  <PencilLine />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
}

TableTasksByUser.propTypes = {
  tasks: PropTypes.array.isRequired,
  onUpdate: PropTypes.func
};

export default TableTasksByUser