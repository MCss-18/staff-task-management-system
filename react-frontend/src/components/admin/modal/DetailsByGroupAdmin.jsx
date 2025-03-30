import { Download, Search } from "lucide-react";
import { useEffect, useState } from "react";
import InputIcon from "../../common/InputIcon";
import Pagination from "../../common/Pagination";
import groupMemberService from "../../../services/api/groupMemberService";
import TableMembersByGroup from "../../leader/tables/TableMembersByGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { PropTypes } from 'prop-types';
import taskService from "../../../services/api/taskService";
import TableTasksByGroupAdmin from "../tables/TableTasksByGroupAdmin";
import { getFormattedDateTime } from "../../../utils/dateHourNow";
import { exportToExcel } from "../../../utils/exportToExcel";
import delayTaskService from "../../../services/api/delayTaskService";
import IconButton from "../../common/IconButton";


const PanelTask = ({groupId}) => {
  const [ tasks, setTasks ] = useState([]);
  const RECORDS_TABLE = 12;
  // const [ selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
 
  const fetchData = async(page = 1, search = searchTerm) => {
    setIsLoading(true)
    try {
      const response = await taskService.taskListPagByGroup(groupId, page, search);
      setTasks(response.data.tasks);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Error fetching tasks: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    fetchData(1, event.target.value);
  };

  const totalPages = Math.ceil(totalRecords / RECORDS_TABLE);

  const handlePageChange = (page) => {
    fetchData(page);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="control-user">
        <IconButton 
          icon={Download}
          onClick= {() => handleDownload(groupId)}
        >
          <span>Excel demoras</span>
        </IconButton>
      </div>
    </div>
    <div className='body-section'>
      <div className="container-table">
        <TableTasksByGroupAdmin 
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
  </div>
  )
};

const PanelMembers = ({groupId}) => {
  
  const [ members, setMembers ] = useState([]);
  const RECORDS_TABLE = 12;
  // const [ selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    fetchData(1, event.target.value);
  };

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
    </div>
  )
};

function DetailsByGroupAdmin() {
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

export default DetailsByGroupAdmin