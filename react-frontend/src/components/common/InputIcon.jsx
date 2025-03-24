import { PropTypes } from 'prop-types';

function InputIcon({ icon: Icon, ...props }) {
  return (
    <div style={{ position: 'relative' }}>
      <div className="input-icon">
				<Icon className="icon" />
			</div>
      <input {...props} className="input-field" />
    </div>
  );
}

InputIcon.propTypes = {
  icon: PropTypes.object.isRequired
}

export default InputIcon