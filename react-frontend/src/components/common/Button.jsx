import { Loader } from 'lucide-react'
import { PropTypes } from 'prop-types';

function Button({ onClick = null, isLoading = false, children, className='' }) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader className="loader-spin" />
      ) : (
        children
      )}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};
export default Button