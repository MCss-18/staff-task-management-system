import Button from './Button';
import { PropTypes } from 'prop-types';

function IconButton({ icon: Icon, children, ...buttonProps }) {
  return (
    <Button {...buttonProps}>
      <Icon/>
      <span>{children}</span>
    </Button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
}

export default IconButton