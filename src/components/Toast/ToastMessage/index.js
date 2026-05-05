import { useEffect, memo } from "react";
import { Container } from "./styles";
import PropTypes from "prop-types";
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';

function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef
}) {

  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);
    return () => clearTimeout(timeout);
  }, [onRemoveMessage, message.id, message.duration]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }


  return (
    <Container
    type={message.type}
    onClick={handleRemoveToast}
    tabIndex={0}
    role="button"
    isLeaving={isLeaving}
    ref={animatedRef}
    >
      {message.type === 'success' && <img src={checkCircleIcon} alt="check" />}
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      <strong>{message.text}</strong>
    </Container>
  )
}

ToastMessage.propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  animatedRef: PropTypes.shape().isRequired,
};

ToastMessage.defaultProps = {
  type: 'default',
};

export default memo(ToastMessage);



