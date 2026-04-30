import { StyledSppiner } from "./styles";
import PropTypes from "prop-types";

export default function Spinner({ size }) {
  return (
    <StyledSppiner size={size} />
  )
}

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 32,
};
