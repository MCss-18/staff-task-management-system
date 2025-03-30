import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TableTasksByUser from '../../components/technician/tables/TableTasksByUser'
import Pagination from '../../components/common/Pagination'
import taskService from '../../services/api/taskService';
import { useAuthStore } from '../../store/useStore';
import InputIcon from '../../components/common/InputIcon';
import { useLocation } from 'react-router-dom';

function TasksPage() {
  const { user } = useAuthStore();
  const RECORDS_TABLE = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(0);

  const location = useLocation();
  const groupId = location.state?.groupId;

  const fetchData = async(page = 1, search = searchTerm) => {
    setIsLoading(true)
    try {
      const response = await taskService.taskListPagByGroupAndUserTech(groupId, user.userId, page, search);
      setTasks(response.data.tasks);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Errro fetching tasks: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    fetchData(1, event.target.value);
  };

  const handleSave = () => {
    fetchData();
  }

  const totalPages = Math.ceil(totalRecords / RECORDS_TABLE);

  const handlePageChange = (page) => {
    fetchData(page);
  };

  useEffect(() => {
    if (groupId) {
      fetchData();
    }
  }, [groupId]);

  if (!groupId) {
    return <section>Error: No se encontró el grupo.</section>;
  }
  
  return (
    <section>
      <div className='header-section'>
        <h2 className='title-section'>Lista de Tareas</h2>
      </div>
      <div className='control'>
        <InputIcon
          icon={Search}
          type='text'
          placeholder='Buscar'
          value={searchTerm}
          onChange={handleSearch}
        />
      
      </div>
      <div className='body-section'>
        <div className="container-table">
          <TableTasksByUser 
            tasks={tasks} 
            onUpdate={handleSave} 
            isLoading={isLoading}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  )
}

export default TasksPage