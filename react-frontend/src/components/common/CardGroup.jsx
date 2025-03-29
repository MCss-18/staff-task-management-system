import { useNavigate } from 'react-router-dom';
import '../../styles/st-cardGroup.css';
import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

function CardGroup({ group }) {
  const navigate = useNavigate();

  return (
    <div className="card-project">
      <div className='card-body'>
        <div className='info-card'>
          <h4>{group.surnameLead}, {group.nameLead}</h4>
          <h3>{group.nameGroup}</h3>
        </div>
      </div>
      <div className='card-footer'>
        <p></p>
        <button onClick={() => navigate("tareas", { state: { groupId: group.groupId } })}>
          Abrir <ChevronRight />
        </button>
      </div>
    </div>
  );
}

CardGroup.propTypes = {
  group: PropTypes.object
};


export default CardGroup