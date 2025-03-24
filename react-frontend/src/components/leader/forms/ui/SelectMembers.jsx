import React, { useEffect } from 'react'
import groupMemberService from '../../../../services/api/groupMemberService';
import { PropTypes } from 'prop-types';
import DropdownSelect from '../../../common/dropdownSelect';

function SelectMembers({selectedMember, groupId, handleChange}) {

  const fetchAvalibleTechnician = async () => {
    try {
      const response = await groupMemberService.membersByGroupId(groupId);
      const membersList = response.data.members || [];
      return membersList.map(user => ({
        id: user.groupStaffId,
        label: `${user.surnames}, ${user.names}`,
        ...user 
      }));
    } catch (error) {
      console.error("Error fetching members:", error);
      return [];
    }
  };
  
  useEffect(() => {
    fetchAvalibleTechnician();
  }, [groupId]);

  return (
    <DropdownSelect
      label="Seleccionar tecnico"
      name="groupStaffId"
      value={selectedMember?.names || ''}
      fetchData={fetchAvalibleTechnician}
      handleChange={(selected) => handleChange(selected)}
    />
  )
}

SelectMembers.propTypes = {
  selectedMember: PropTypes.object,
  handleChange: PropTypes.func,
  groupId: PropTypes.number
};

export default SelectMembers