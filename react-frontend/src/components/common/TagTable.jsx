import { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { getTagData } from '../../utils/tagUtils.js';
import { Badge } from './Badge.jsx';

function TagTable({ state, type }) {
  const [tagData, setTagData] = useState({
    color: "gray",
    label: "NR",
  });

  useEffect(() => {
    const data = getTagData(state, type);
    setTagData(data ?? { color: "gray", label: "NR" });
  }, [state, type]);

  return <Badge color={tagData.color}>{tagData.label}</Badge>;
}

TagTable.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
  type: PropTypes.number.isRequired,
};


export default TagTable