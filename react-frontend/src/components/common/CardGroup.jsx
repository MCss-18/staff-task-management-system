import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChevronRight } from 'lucide-react';

function CardGroup({ group, index }) {
  const navigate = useNavigate();

  
  const colors = ["#FFE1CB", "#D5F6ED", "#E2DBF9", "#E0F3FF", "#FBE2F3"];

  const backgroundColor = colors[index % colors.length];

  return (
    <div className="max-w-sm w-full flex flex-col gap-3 p-2 rounded-2xl border border-gray-200 shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Card Body */}
      <div className="p-5 flex flex-col gap-4 rounded-xl" style={{ backgroundColor }}>
        <div className="flex flex-col">
          <h4 className="text-base text-gray-800 font-medium truncate">
            {group.surnameLead}, {group.nameLead}
          </h4>
          <h3 className="text-lg font-bold text-gray-900 truncate">{group.nameGroup}</h3>
        </div>
      </div>

   
      <div className="flex justify-between items-center px-2">
        <p className="text-gray-500 text-sm"></p>
        <button 
          onClick={() => navigate("tareas", { state: { groupId: group.groupId } })}
          className="relative flex items-center gap-2 text-white bg-black-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-black-700 group"
        >
          Abrir 
          <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

CardGroup.propTypes = {
  group: PropTypes.object,
  index: PropTypes.number
};


export default CardGroup