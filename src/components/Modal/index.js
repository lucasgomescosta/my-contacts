import { Overlay, Container, Footer } from "./styles";
import Button from "../Button";
import PropTypes from "prop-types";
import ReactPortal from "../ReactPortal";
import useAnimatedUnmounted from "../../hooks/useAnimatedUnmounted";

export default function Modal({ danger, visible, title, children, cancelLabel, confirmLabel, onCancel, onConfirm, isLoading }) {

  const { shouldRender, elementRef } = useAnimatedUnmounted(visible);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible} ref={elementRef} >
        <Container $danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              $danger={danger}
              onClick={onConfirm}
              $isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  )
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
}

Modal.defaultProps = {
  danger: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
  isLoading: false,
}
