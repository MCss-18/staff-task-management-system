import React, { useEffect } from 'react'
import { PropTypes } from 'prop-types';
import categoryDelayService from '../../../services/api/categoryDelayService';
import DropdownSelect from '../../common/dropdownSelect';

function SelectCategoryDelay({ formData, handleChange }) {

  const fetchCategoryDelay = async () => {
    try {
      const response = await categoryDelayService.getCategoryDelay();
      const categoryDelayList = response.data.categoryDelay || [];
      return categoryDelayList.map(user => ({
        id: user.categoryDelayId,
        label: `${user.descripcionDelay}`,
      }));
    } catch (error) {
      console.error("Error fetching category delay:", error);
      return [];
    }
  };

  useEffect(()=> {
    fetchCategoryDelay()
  }, [])

  return (
    <DropdownSelect
      label="Seleccionar tipo demora"
      name="categoryDelayId"
      value={formData.categoryDelayId}
      fetchData={fetchCategoryDelay}
      handleChange={handleChange}
    />
  )
}

SelectCategoryDelay.propTypes = {
  formData: PropTypes.func.isRequired,
  handleChange: PropTypes.func,
}

export default SelectCategoryDelay