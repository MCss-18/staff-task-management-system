import TagTable from '../../common/TagTable';
import { Eye } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Table from '../../common/Table';

const columns = [
  { 
    key: "nameGroup", 
    label: "GRUPO"
  },
  { 
    key: "memberCount", 
    label: "N° MIEMBROS" 
  },
  { 
    key: "userSurnames", 
    label: "RESPONSABLE",
    render: (_,row) => `${row?.userSurnames ?? 'N/A'}, ${row?.userNames ?? 'N/A'}` 
  },
  { 
    key: "state", 
    label: "ESTADO",
    render: (value) => <TagTable state={value} type={1} />
  },
  { 
    key: "creationDate", 
    label: "CREACION" 
  }
];

function TableGroup({ groups, isLoading }) {

  const navigate = useNavigate();

  return (
    <Table
      columns={columns}
      data={groups}
      isLoading={isLoading}
      actionButton={(group) => (
        <div className='flex gap-2 relative'>
          <button 
            onClick={() => navigate("detalles", { state: { groupId: group.groupId } })}
            className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-500 hover:text-blue-700 rounded-md btn-tooltip"
          >
            <Eye />
          </button>
        </div>
      )}
    />
  );
}

TableGroup.propTypes = {
  groups: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


export default TableGroup