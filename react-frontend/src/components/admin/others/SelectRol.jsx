import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import rolService from '../../../services/api/rolService';

function SelectRol({ formData, handleChange }) {
  const [rol, setRol] = useState([]);
  const fetchData = async () => {
    try {
      const response = await rolService.rolesList();
      setRol(response.data.roles);
    } catch (error) {
      console.error('Error fetching rol:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const { value } = e.target;
    handleChange({ target: { name: 'rolId', value } }); 
  };

  return (
    <select 
      className='roles'
      value={formData.rolId}
      onChange={handleSelectChange} 
      id='rol-select' 
      required
      name="rolId"
    >
      <option value="">Seleccionar un rol</option>
      {rol.map(item => (
        <option key={item.rolId} value={item.rolId}>
          {item.rolUser}
        </option>
      ))}
    </select>
  )
}

SelectRol.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectRol