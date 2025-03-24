import React, { useEffect, useState } from 'react'
import groupMemberService from '../../../../services/api/groupMemberService';
import { PropTypes } from 'prop-types';
import DropdownSelect from '../../../common/dropdownSelect';

// Este select solo mistrar los usuarios que no tiene un grupo
function SelectAvailableMembers({ formData, groupId, handleAddItem }) {

  const [ members, setMembers ] = useState([]);

  const fetchAvalibleTechnician = async () => {
    try {
      const response = await groupMemberService.availableMembers(groupId);
      const membersList = response.data.members || [];
      setMembers(membersList)
      return membersList.map(user => ({
        id: user.staffId,
        label: `${user.surnames} - ${user.names}`,
      }));
    } catch (error) {
      console.error("Error fetching members:", error);
      return [];
    }
  };

  const handleSelectChange = (e) => {
    const selectedTechnician = members.find(technician => technician.staffId === parseInt(e.target.value, 10));
    handleAddItem(selectedTechnician);
  };

  useEffect(()=> {
    fetchAvalibleTechnician()
  }, [])

  return (
    <DropdownSelect
      label="Seleccionar tecnico"
      name="staffId"
      value={formData.staffId}
      fetchData={fetchAvalibleTechnician}
      handleChange={handleSelectChange}
    />
  )
}

SelectAvailableMembers.propTypes = {
  formData: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func,
  groupId: PropTypes.number.isRequired
}


export default SelectAvailableMembers