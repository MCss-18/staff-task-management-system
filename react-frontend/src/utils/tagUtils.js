export const getTagData = (state, type) => {
  if (type === 1) {
    return getItemTagData(state);
  } else if (type === 2) {
    return getRequestTagData(state);
  } else if (type === 3) {
    return getRolTagData(state);
  }
};

const getItemTagData = (state) => {

  const tagData = {
    0: { color: 'rose', label: 'Inactivo' },
    1: { color: 'lime', label: 'Activo' },
  };
  return tagData[state] || { className: '', label: '' };
};

const getRequestTagData = (state) => {
  const tagData = {
    1: { color: 'orange', label: 'No iniciado' },
    2: { color: 'green', label: 'En proceso' },
    3: { color: 'red', label: 'Finalizado' },
  };
  return tagData[state] || { className: '', label: '' }; 
};


const getRolTagData = (state) => {
  const tagData = {
    1: { color: 'purple', label: 'Admin' },
    2: { color: 'blue', label: 'Lider' },
    3: { color: 'rose', label: 'Tecnico' }
  };
  return tagData[state] || { className: '', label: '' }; 
};

