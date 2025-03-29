import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/useStore';
import groupService from '../../services/api/groupService';
import CardGroup from '../../components/common/CardGroup';

function GroupPage() {
  const { user } = useAuthStore();
  const [groups, setGroups] = useState([]);

  const fetchData = async () => {
    try {
      const response = await groupService.groupListByMember(user.userId);
      setGroups(response.data.groups)
    } catch (error) {
      console.log("Error fetching data: ", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <section>
      
      <div className="list-projects">
        {groups.map(group => (
          <CardGroup key={group.groupId} group={group}/>
        ))}
      </div>
    </section>
  )
}

export default GroupPage