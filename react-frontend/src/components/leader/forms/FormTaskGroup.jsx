import React, { useEffect, useState } from 'react'
import { Trash2, X } from 'lucide-react';
import Button from '../../common/Button';
import groupMemberService from '../../../services/api/groupMemberService';
import typeTaskService from '../../../services/api/typeTaskService';
import taskService from '../../../services/api/taskService';
import PropTypes from 'prop-types';
import DropdownSelect from '../../common/dropdownSelect';

function FormTaskGroup({ closeForm, groupId, onSave }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [members, setMembers] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await groupMemberService.membersByGroupId(groupId);
        setMembers(response.data.members || []);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
  
    fetchMembers();
  }, [groupId]); 
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await typeTaskService.typeTaskList();
        setTasks(response.data.typeTasks || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchTasks();
  }, []); 
  const handleAddItem = () => {
    if (!selectedMember || !selectedTask) {
      setErrorMessage('Debe seleccionar un técnico y una tarea.');
      return;
    }
  
    const member = members.find((m) => m.groupStaffId === selectedMember);
    const task = tasks.find((t) => t.typeTaskId === selectedTask);
  
    // Verificar que los datos existen antes de agregar
    if (!member || !task) {
      setErrorMessage('Error al asignar la tarea. Intente nuevamente.');
      return;
    }
  
    const isDuplicate = taskList.some(
      (item) => item.user.groupStaffId === member.groupStaffId &&
                item.task.typeTaskId === task.typeTaskId
    );
  
    if (isDuplicate) {
      setErrorMessage('El usuario ya tiene asignada esta tarea.');
      return;
    }
  
    setTaskList((prevList) => [...prevList, { user: member, task }]);
  
    // Limpiar seleccion
    setSelectedMember('');
    setSelectedTask('');
    setErrorMessage('');
  };
  

  const handleRemoveItem = (index) => {
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (taskList.length === 0) {
        throw new Error('Debe agregar al menos un usuario con una tarea.');
      }

      await taskService.createTask(taskList);

      closeForm();
      if (onSave) onSave();
    } catch (error) {
      setErrorMessage(error.message || 'Hubo un problema con la solicitud.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-form">
      <div className="header-form">
        <button type="button" onClick={closeForm}>
          <X />
        </button>
      </div>
      <div className="title-form">
        <h2>Agregar tarea</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="group-form">
          <div className="subgroup-form">
            <label htmlFor="memberSelect">Seleccionar inspector <span className='required'>*</span></label>
            <DropdownSelect
              label="Seleccione un inspector"
              name="selectedMember"
              value={members}
              fetchData={async () =>
                members.map((m) => ({
                  id: m.groupStaffId,
                  label: `${m.surnames}, ${m.names}`,
                }))
              }
              handleChange={(e) => setSelectedMember(e.target.value)}
            />
          </div>
          <div className="subgroup-form">
            <label htmlFor="taskSelect">Seleccionar tarea <span className='required'>*</span></label>
            <DropdownSelect
              label="Seleccione una tarea"
              name="selectedTask"
              value={tasks}
              fetchData={async () =>
                tasks.map((t) => ({
                  id: t.typeTaskId,
                  label: `${t.codOt} - ${t.typeTask}`,
                }))
              }
              handleChange={(e) => setSelectedTask(e.target.value)}
            />
          </div>
          <div className="subgroup-form">
            <button 
              type="button" 
              onClick={handleAddItem} 
              className="btn-add hover:bg-green-500"
            >
              Agregar
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="subgroup-form">
            <Button 
              isLoading={isLoading}
            >
              Finalizar
            </Button>
          </div>
          {taskList.length > 0 && (
            <div className="subgroup-form">
              <ul className="mt-4 flex flex-col gap-3 max-w-[420px] max-h-[200px] overflow-y-auto">
                {taskList.map((item, index) => {
                  if (!item.user || !item.task) return null;
                  return (
                    <li
                      key={index}
                      className="flex gap-2 justify-between items-center bg-gray-800 text-white p-3 rounded-lg shadow-md border-l-4 border-red-500"
                    >
                      <div className='flex flex-col'>
                        <span className="text-sm font-medium">
                          {item.user.surnames}, {item.user.names}
                        </span>
                        <span className='text-sm'>
                          {item.task.codOt} - {item.task.typeTask}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        <Trash2/>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

FormTaskGroup.propTypes = {
  groupId: PropTypes.number.isRequired,
  closeForm: PropTypes.func.isRequired,
  onSave: PropTypes.func
};

export default FormTaskGroup