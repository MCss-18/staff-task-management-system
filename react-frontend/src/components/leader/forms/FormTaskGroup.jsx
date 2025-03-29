import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react';
import Button from '../../common/Button';
import groupMemberService from '../../../services/api/groupMemberService';
import typeTaskService from '../../../services/api/typeTaskService';
import taskService from '../../../services/api/taskService';

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
  
    // Verificar que los datos existen antes de agregarlos
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
  
    // Limpiar selección
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

      // Aquí enviarías taskList al backend
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
            <label htmlFor="memberSelect">Seleccionar técnico *</label>
            <select id="memberSelect" value={selectedMember} onChange={(e) => setSelectedMember(Number(e.target.value))}>
              <option value="">Seleccione un técnico</option>
              {members.map((member) => (
                <option key={member.groupStaffId} value={member.groupStaffId}>
                  {member.surnames}, {member.names}
                </option>
              ))}
            </select>
          </div>
          <div className="subgroup-form">
            <label htmlFor="taskSelect">Seleccionar tarea *</label>
            <select id="taskSelect" value={selectedTask} onChange={(e) => setSelectedTask(Number(e.target.value))}>
              <option value="">Seleccione una tarea</option>
              {tasks.map((task) => (
                <option key={task.typeTaskId} value={task.typeTaskId}>
                  {task.codOt} - {task.typeTask}
                </option>
              ))}
            </select>
          </div>
          <div className="subgroup-form">
            <button type="button" onClick={handleAddItem} className="btn-add">
              Agregar
            </button>
          </div>
        </div>

        {taskList.length > 0 && (
  <ul>
    {taskList.map((item, index) => {
      if (!item.user || !item.task) return null;

      return (
        <li key={index}>
          {item.user.surnames}, {item.user.names} - {item.task.codOt} - {item.task.typeTask}
          <button type="button" onClick={() => handleRemoveItem(index)} className="btn-remove">
            Eliminar
          </button>
        </li>
      );
    })}
  </ul>
)}


        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="subgroup-form">
          <Button isLoading={isLoading}>Finalizar</Button>
        </div>
      </form>
    </div>
  );
}

export default FormTaskGroup