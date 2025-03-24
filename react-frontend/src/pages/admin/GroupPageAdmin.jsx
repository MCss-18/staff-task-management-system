import React, { useEffect, useState } from 'react'
import InputIcon from '../../components/common/InputIcon'
import { Search } from 'lucide-react'
import Pagination from '../../components/common/Pagination'
import groupService from '../../services/api/groupService'
import { Outlet } from 'react-router-dom'
import TableGroup from '../../components/admin/tables/TableGroup'

function GroupPageAdmin() {
  const RECORDS_TABLE = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchData = async(page = 1, search = searchTerm) => {
    try {
      const response = await groupService.groupListPag(page, search);
      setGroups(response.data.groups);
      setTotalRecords(response.data.total);
      setCurrentPage(response.data.page);
    } catch (error){
      console.error("Errro fetching groups: ", error)
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
    fetchData();
  }, []);

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
      </div>

      <div className='body-section'>
        <div className="container-table">
          <TableGroup 
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
      <Outlet />
    </section>
  )
}

export default GroupPageAdmin