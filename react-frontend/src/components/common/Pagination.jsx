import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [pageInput, setPageInput] = React.useState(currentPage);

  const handlePageInput = (event) => {
    const value = Number(event.target.value);
    if (value > 0 && value <= totalPages) {
      setPageInput(value);
    }
  };

  const handlePageSubmit = (event) => {
    event.preventDefault();
    if (pageInput > 0 && pageInput <= totalPages) {
      onPageChange(pageInput);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  React.useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  return (
    <div className="flex items-center justify-center gap-3 mt-5">
      {/* Botón Anterior */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg text-white font-medium transition ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        Anterior
      </button>

      {/* Input de Página */}
      <form onSubmit={handlePageSubmit} className="flex items-center gap-2">
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInput}
          min="1"
          max={totalPages}
          className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium transition hover:bg-blue-600"
        >
          Ir
        </button>
      </form>

      {/* Botón Siguiente */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg text-white font-medium transition ${
          currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;