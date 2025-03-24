import React, { useEffect } from 'react'
import typeTaskService from '../../../../services/api/typeTaskService';
import { PropTypes } from 'prop-types';
import DropdownSelect from '../../../common/dropdownSelect';

function SelectTask({selectedTask, handleChange}) {
  
  const fetchTypeTask = async () => {
    try {
      const response = await typeTaskService.typeTaskList();
      const typeTasksList = response.data.typeTasks || [];
      return typeTasksList.map(task => ({
        id: task.typeTaskId,
        label: `${task.codOt} - ${task.typeTask}`,
        ...task 
      }));
    } catch (error) {
      console.error("Error fetching type task:", error);
      return [];
    }
  };
  

  useEffect(()=> {
    fetchTypeTask()
  }, [])

  return (
    <DropdownSelect
      label="Seleccionar tarea"
      name="typeTaskId"
      value={selectedTask?.typeTask || ''}
      fetchData={fetchTypeTask}
      handleChange={(selected) => handleChange(selected)}
    />
  )
}

SelectTask.propTypes = {
  selectedTask: PropTypes.object,
  handleChange: PropTypes.func
};


export default SelectTask