import PropTypes from 'prop-types';

function ReturnButton(props) {
  return (
    <button type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

ReturnButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string,
};

export { ReturnButton }