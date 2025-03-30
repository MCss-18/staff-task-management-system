import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { exportToExcel } from '../../../utils/exportToExcel';
import delayTaskService from '../../../services/api/delayTaskService';
import Table from '../../common/Table';
import { Download } from 'lucide-react';
import { getFormattedDateTime } from '../../../utils/dateHourNow';

const columns = [
  { 
    key: "surnames", 
    label: "APELLIDOS Y NOMBRES",
    render: (_, row) => `${row?.surnames ?? 'N/A'}, ${row?.names ?? 'N/A'}` 
  },
  { 
    key: "creationDate", 
    label: "CREACION" 
  }
];

const TableMembersByGroup =({members, isLoading}) => {

  const [ selectedMember, setSelectedMember ] = useState(null);
  const [ showModalMember, setShowModalMember ] = useState(false);
  const overlayRef = useRef(null);

  const openModal = (group) => {
    setSelectedMember(group);
    setShowModalMember(true);
  };

  const exportTaskDelayByUserExcel = async (member) => {
    try {
      const response = await delayTaskService.taskDelayByGroupAndUser(member.groupStaffId )
      return response.data.tasksDelay
    } catch (error){
      console.error('Error exporting tasks:', error)
      return [];
    } 
  }

  const closeForm = () => {
    setShowModalMember(false)
  };

  const handleDownload = async (member) => {
    try {
      const data = await exportTaskDelayByUserExcel(member);
      const formattedDateTime = getFormattedDateTime()
      exportToExcel(data, `tareas-demoras-${member.surnames}-${member.names} - ${formattedDateTime}.xlsx`);
    } catch (error) {
      console.error('Error exporting tasks:', error);
    }
  };

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
    <>
      <Table
        columns={columns}
        data={members}
        isLoading={isLoading}
        actionButton={(member) => (
          <div className='flex gap-2 relative'>
            <button 
              onClick={() => handleDownload(member)} 
              className="p-1 bg-green-100 hover:bg-green-200 text-green-500 hover:text-green-700 rounded-md btn-tooltip"
            >
              <Download />
              <span className="tooltip-text">Descargar Demoras</span>
            </button>
          </div>
        )}
      />
      {showModalMember && (
        <div className="overlay" >
     
        </div>
      )}
    </>
  )
}

TableMembersByGroup.propTypes = {
  members: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TableMembersByGroup