import { Overlay } from "./styles";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";
import useAnimatedUnmounted from "../../hooks/useAnimatedUnmounted";

export default function Loader({ isLoading }) {

    const { shouldRender, elementRef } = useAnimatedUnmounted(isLoading);

    if (!shouldRender) return null;

    return (
        <ReactPortal containerId="loader-root">
            <Overlay ref={elementRef} isLeaving={!isLoading}>
                <Spinner size={90} />
            </Overlay>
        </ReactPortal>
    )
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}

Loader.defaultProps = {
  isLoading: false,
}
