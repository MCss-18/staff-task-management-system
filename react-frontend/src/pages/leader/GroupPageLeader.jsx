import React, { useEffect, useRef, useState } from 'react'
import InputIcon from '../../components/common/InputIcon'
import { Plus, Search } from 'lucide-react'
import Pagination from '../../components/common/Pagination'
import TableGroupByLeader from '../../components/leader/tables/TableGroupByLeader'
import { useAuthStore } from '../../store/useStore'
import IconButton from '../../components/common/IconButton'
import FormGroup from '../../components/leader/forms/FormGroup'
import groupService from '../../services/api/groupService'
import { Outlet } from 'react-router-dom'

function GroupPageLeader() {

  const { user } = useAuthStore();
  const RECORDS_TABLE = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const overlayRef = useRef(null);

  const fetchData = async(page = 1, search = searchTerm) => {
    try {
      const response = await groupService.groupListPagByLeader(user.userId, page, search);
      setGroups(response.data.groups);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Errro fetching groups: ", error)
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

  return (
    <section>
      <div className='header-section'>
        <h2 className='title-section'>Grupos</h2>
      </div>
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
            <span>Crear grupo</span>
          </IconButton>
        </div>
      </div>

      <div className='body-section'>
        <div className="container-table">
          <TableGroupByLeader 
            groups={groups} 
            onUpdate={handleSave} 
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
      {showForm && (
        <div className="overlay" ref={overlayRef}>
          <FormGroup
            closeForm={closeForm}
            onSave={handleSave} 
          />
        </div>
      )}
      <Outlet />
    </section>
  )
}

export default GroupPageLeader