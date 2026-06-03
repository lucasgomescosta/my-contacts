import { Container, Input } from "./styles";
import PropTypes from 'prop-types';

export default function InputSearch({ value, onChange, placeholder }) {
  return (
    <Container>
      <Input>
        <input value={value} type="text" placeholder={placeholder} onChange={onChange} />
      </Input>
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
