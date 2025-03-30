import { useEffect, useState } from 'react'
import delayTaskService from '../../../services/api/delayTaskService';
import { PropTypes } from 'prop-types';
import Table from '../../common/Table';
import { X } from 'lucide-react';

const columns = [
  { 
    key: "startTime", 
    label: "INICIO"
  },
  { 
    key: "endTime", 
    label: "FIN" 
  },
  { 
    key: "descripcionDelay", 
    label: "TIPO",
  },
  { 
    key: "observation", 
    label: "OBS" 
  },
  { 
    key: "creationDate", 
    label: "FECHA CREACION" 
  }
];

function DetailsTaskDelay({taskId, close}) {

  const [ taskDelay, setTaskDelay ] = useState([])
    const [isLoading, setIsLoading] = useState(false);

  const fetchDelays = async () => {
    setIsLoading(true)
    try {
      const response = await delayTaskService.delayTaskList(taskId);
      setTaskDelay(response.data.tasksDelay);
    } catch (error) {
      console.error("Error al cargar demoras", error);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(()=> {
    fetchDelays()
  },[])

  return (
    <div className='modal relative'>
      <button className="absolute top-5 right-5 bg-white hover:bg-red-500 text-gray-500 hover:text-white transition " type="button" onClick={close}><X /></button>
      <h3>Demoras</h3>
      <Table
        columns={columns}
        data={taskDelay}
        isLoading={isLoading}
      />
    </div>
  )
}

DetailsTaskDelay.propTypes = {
  taskId: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired
}

export default DetailsTaskDelay