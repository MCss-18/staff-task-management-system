import { Plus, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import userService from '../../services/api/userService';
import InputIcon from '../../components/common/InputIcon';
import Pagination from '../../components/common/Pagination';
import TableUsers from '../../components/admin/tables/TableUsers';
import FormUser from '../../components/admin/forms/FormUser';

function UserPageAdmin() {
  const RECORDS_TABLE = 12;
  const [showFormUser, setShowFormUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async(page = 1, search = searchTerm) => {
    setIsLoading(true);
    try {
      const response = await userService.userListPaginated(page, search);
      setUsers(response.data.users);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Errro fetching Users: ", error)
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    fetchData(1, event.target.value);
  };

  const openForm = () => {
    setShowFormUser(true);
  };

  const closeForm = () => {
    setShowFormUser(false);
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

  const overlayRef = useRef(null);

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
        <h2 className='title-section'>Usuarios</h2>
      </div>
      <div className='control'>
        <InputIcon
          icon={Search}
          type='text'
          placeholder='Buscar'
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className='control-user'>
          <button onClick={openForm}>
            <Plus />
            <span>Crear usuario</span>
          </button>
  
        </div>
      </div>
      <div className='body-section'>
        <div className="container-table">
          <TableUsers 
            users={users} 
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
      {showFormUser && (
        <div className="overlay" ref={overlayRef}>
          <FormUser closeForm={ closeForm } onSave={handleSave}/>
        </div>
      )}
    </section>
  )
}


export default UserPageAdmin