import { Download, Plus, Search } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import InputIcon from '../../common/InputIcon'
import IconButton from '../../common/IconButton'
import TableTasksByGroup from '../tables/TableTasksByGroup'
import TableMembersByGroup from '../tables/TableMembersByGroup'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import taskService from '../../../services/api/taskService'
import Pagination from '../../common/Pagination'
import FormTaskGroup from '../forms/FormTaskGroup'
import { PropTypes } from 'prop-types';
import FormGroupMember from '../forms/FormGroupMember'
import groupMemberService from '../../../services/api/groupMemberService'
import delayTaskService from '../../../services/api/delayTaskService'
import { getFormattedDateTime } from '../../../utils/dateHourNow'
import { exportToExcel } from '../../../utils/exportToExcel'

const PanelTask = ({groupId}) => {
  const [ tasks, setTasks ] = useState([]);
  const RECORDS_TABLE = 12;
  const [showForm, setShowForm] = useState(false);
  // const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const overlayRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const fetchData = async(page = 1, search = searchTerm) => {
    setIsLoading(true)
    try {
      const response = await taskService.taskListPagByGroup(groupId, page, search);
      setTasks(response.data.tasks);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Error fetching task: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false)
  };

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
    fetchData();
  }, []);

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

  const exportTaskDelayGroupExcel = async (groupId) => {
    try {
      const response = await delayTaskService.taskDelayByGroup(groupId )
 
      return response.data.tasksDelay
    } catch (error){
      console.error('Error importing tasks:', error)
      return [];
    } 
  }

  const handleDownload = async (groupId) => {
    try {
      const data = await exportTaskDelayGroupExcel(groupId);
      const formattedDateTime = getFormattedDateTime()
      exportToExcel(data, `tareas-demoras-grupo - ${formattedDateTime}.xlsx`);
    } catch (error) {
      console.error('Error exporting tasks:', error);
    }
  };

  return (
    <div>
      <div className='control '>
        <div className="flex gap-2">
          <InputIcon 
            icon={Search} 
            type='text' 
            placeholder='Buscar tarea' 
            value={searchTerm} 
            onChange={handleSearch}
          />
        </div>
        <div className='control-user'>
          <IconButton 
            icon={Download}
            onClick= {() => handleDownload(groupId)}
          >
            <span>Excel demoras</span>
          </IconButton>
          <IconButton 
            icon={Plus}
            onClick= {openForm}
          >
            <span>Agregar tarea</span>
          </IconButton>
        </div>
      </div>
      <div className='body-section'>
        <div className="container-table">
          <TableTasksByGroup 
            tasks={tasks}
            isLoading={isLoading}
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>
      {
        showForm && (
          <div className="overlay" ref={overlayRef}>
            <FormTaskGroup 
              groupId={groupId}
              closeForm={closeForm}
              onSave={handleSave}
            />
          </div>
        )
      }
    </div>
  )
};

const PanelMembers = ({groupId}) => {
  
  const [ members, setMembers ] = useState([]);
  const RECORDS_TABLE = 12;
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const overlayRef = useRef(null);
 
  const fetchData = async(page = 1, search = searchTerm) => {
    setIsLoading(true)
    try {
      const response = await groupMemberService.membersListPagByGroup(groupId, page, search);
      setMembers(response.data.members);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Error fetching members: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false)
  };

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
    fetchData();
  }, []);

  return (
    <div>
      <div className='control'>
        <div className="flex gap-2">
          <InputIcon 
            icon={Search} 
            type='text' 
            placeholder='Buscar' 
            value={searchTerm} 
            onChange={handleSearch}
          />
        </div>
        <div className='control-user'>
          <IconButton 
            icon={Plus}
            onClick= {openForm}
          >
            <span>Agregar miembros</span>
          </IconButton>
        </div>
      </div>
      <div className='body-section'>
        <div className="container-table">
          <TableMembersByGroup 
            members={members} 
            isLoading={isLoading}
          />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
      {
      showForm && (
        <div className="overlay" ref={overlayRef}>
          <FormGroupMember 
            closeForm={closeForm}
            groupId={groupId}
            onSave={handleSave}
          />
        </div>
        )
      }
    </div>
  )
};


function DetailsByGroup() {
  const [activeTab, setActiveTab] = useState("tasks");

  const navigate = useNavigate();
  const location = useLocation();
  const groupId = location.state?.groupId;
  const panels = {
    tasks: <PanelTask groupId={groupId}/>,
    members: <PanelMembers groupId={groupId}/>,
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!groupId) {
    return <section>Error: No se encontró el grupo.</section>;
  }

  return (
    <section className='absolute w-full top-0 left-0 h-full p-5 flex flex-col bg-white rounded-2xl'>
      <button className="absolute top-5 right-5 "
        type="button" onClick={goBack}>
         Regresar
      </button>
      <div className="title-form">
        <h2>Detalles</h2>
      </div>
      <div className='modal-body'>
        <div className='flex gap-2'>
          {Object.keys(panels).map((key) => (
            <button
              key={key}
              className={`btn-tab ${activeTab === key ? "active" : ''}`}
              onClick={() => setActiveTab(key)}
            >
              {key === "tasks" ? "Tareas" : "Miembros"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {panels[activeTab]}
        </div>
      </div>
    </section>
  );
}

PanelMembers.propTypes = {
  groupId: PropTypes.number.isRequired
}

PanelTask.propTypes = {
  groupId: PropTypes.number.isRequired
}

export default DetailsByGroup