import PropTypes from "prop-types";
import "../../styles/st-toggle.css";

function Toggle({ isChecked, onToggle }) {
  return (
    <div
      className={`toggle-container ${isChecked ? "checked" : ""}`}
      onClick={() => onToggle(!isChecked)}
    >
      <div className="toggle-circle" />
    </div>
  );
}

Toggle.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Toggle;
