import React from 'react'
import PropTypes from 'prop-types';

const Table = ({ columns, data, isLoading, actionButton }) => {

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            {actionButton && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              {actionButton && <td>{actionButton(item)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  actionButton: PropTypes.func,
};

export default Table;