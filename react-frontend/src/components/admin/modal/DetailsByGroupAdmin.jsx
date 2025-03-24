import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import InputIcon from "../../common/InputIcon";
import Pagination from "../../common/Pagination";
import groupMemberService from "../../../services/api/groupMemberService";
import TableMembersByGroup from "../../leader/tables/TableMembersByGroup";
import { useNavigate, useParams } from "react-router-dom";
import { PropTypes } from 'prop-types';
import taskService from "../../../services/api/taskService";
import TableTasksByGroupAdmin from "../tables/TableTasksByGroupAdmin";


const PanelTask = ({groupId}) => {
  const [ tasks, setTasks ] = useState([]);
  const RECORDS_TABLE = 12;
  const [showForm, setShowForm] = useState(false);
  const [ selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const overlayRef = useRef(null);
 
  const fetchData = async(page = 1, search = searchTerm) => {
    try {
      const response = await taskService.taskListPagByGroup(groupId, page, search);
      setTasks(response.data.tasks);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Errro fetching groups: ", error)
    }
  }

  const closeForm = () => {
    setShowForm(false)
  };

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
      {/* <div className='control-user'>
        <IconButton 
          icon={Plus}
          onClick= {openForm}
        >
          <span>Agregar tarea</span>
        </IconButton>
      </div> */}
    </div>
    <div className='body-section'>
      <div className="container-table">
        <TableTasksByGroupAdmin tasks={tasks}/>
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
  const [showForm, setShowForm] = useState(false);
  const [ selectedMember, setSelectedMember] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const overlayRef = useRef(null);
 
  const fetchData = async(page = 1, search = searchTerm) => {
    try {
      const response = await groupMemberService.membersListPagByGroup(groupId, page, search);
      setMembers(response.data.members);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Error fetching members: ", error)
    }
  }

  const closeForm = () => {
    setShowForm(false)
  };

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
        {/* <div className='control-user'>
          <IconButton 
            icon={Plus}
            onClick= {openForm}
          >
            <span>Agregar miembros</span>
          </IconButton>
        </div> */}
      </div>
      <div className='body-section'>
        <div className="container-table">
          <TableMembersByGroup members={members} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  )
};


function DetailsByGroupAdmin() {
  const [activeTab, setActiveTab] = useState("tasks");

  const navigate = useNavigate();
  let { groupId } = useParams();
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