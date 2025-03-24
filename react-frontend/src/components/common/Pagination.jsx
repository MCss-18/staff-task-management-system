import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/st-pagination.css'

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
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Anterior
      </button>
      <form onSubmit={handlePageSubmit}>
        <input
          type="number"
          value={pageInput}
          onChange={handlePageInput}
          min="1"
          max={totalPages}
        />
        <button type="submit">Ir</button>
      </form>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
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