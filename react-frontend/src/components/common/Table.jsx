import React from 'react'
import PropTypes from 'prop-types';
import { Loader } from 'lucide-react';

const Table = ({ columns, data, isLoading, actionButton }) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader size="30px" className="loader-spin" />
        Cargando datos...
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-gray-700">
        <thead>
          <tr className="bg-gray-100 text-left text-xs uppercase font-semibold">
            <th className="p-3">#</th>
            {columns.map((col) => (
              <th key={col.key} className={`p-3 ${col.className || ""}`}>
                {col.label}
              </th>
            ))}
            {actionButton && <th className="p-3"></th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-300 hover:bg-blue-50">
              <td className="p-3 text-sm">{index + 1}</td>
              {columns.map((col) => (
                <td key={col.key} className={`p-3 text-sm ${col.className || ""}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actionButton && <td className="p-3">{actionButton(row)}</td>}
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