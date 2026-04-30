import { useEffect } from "react";
import { Container } from "./styles";
import PropTypes from "prop-types";
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';

export default function ToastMessage({ text, type, onRemove, id, duration }) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemove(id);
    }, duration || 7000);
    return () => clearTimeout(timeout);
  }, [onRemove, id, duration]);

  function handleRemoveToast() {
    onRemove(id);
  }

  return (
    <Container
    type={type}
    onClick={handleRemoveToast}
    tabIndex={0}
    role="button"
    >
      {type === 'success' && <img src={checkCircleIcon} alt="check" />}
      {type === 'danger' && <img src={xCircleIcon} alt="X" />}
      <strong>{text}</strong>
    </Container>
  )
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
  onRemove: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  duration: PropTypes.number,
};

ToastMessage.defaultProps = {
  type: 'default',
};


