import React from 'react'
import PropTypes from 'prop-types';

function DialogAdvertaising({onClose, onConfirm, task }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold text-gray-800">Confirmar eliminación</h2>
        <p className="mt-2 text-gray-600">
          ¿Desea eliminar la tarea <span className="font-bold">{task?.typeStack}</span> asignada a <span className="font-bold">{task?.names} {task?.surnames}</span>?
        </p>
        <p className="mt-2 text-red-500">Esta acción también eliminará las demoras registradas por el inspector.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button 
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

DialogAdvertaising.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default DialogAdvertaising