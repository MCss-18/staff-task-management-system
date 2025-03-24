import TagTable from '../../common/TagTable';
import { Eye } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function TableGroup({ groups }) {

  if (!groups) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>GUPO</th>
            <th>LIDER</th>
            <th>MIEMBROS</th>
            <th>ESTADO</th>
            <th>CREACION</th>
            <th >
              ACCIONES
            </th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.groupId}>
              <td>{group.groupId}</td>
              <td>{group.nameGroup}</td>
              <td>{group.userSurnames}, {group.userNames}</td>
              <td>{group.memberCount}</td>
              <td>
                <TagTable state={group.state} type={1} />
              </td>
              <td>{group.creationDate}</td>
              <td className='flex gap-2'>
                <Link className='p-2 bg-slate-600' to={`detalles/${group.groupId}`}>
                  <Eye />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}

TableGroup.propTypes = {
  groups: PropTypes.array.isRequired,
};


export default TableGroup