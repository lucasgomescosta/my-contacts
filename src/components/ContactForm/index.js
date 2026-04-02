import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import PropTypes from "prop-types";

import { Form, ButtonnContainer } from "./styles";
import FormGroup from "../FormGroup";

export default function ContactForm({ buttonLabel }) {
  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="E-mail" />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>''
          <option value="whatsapp">WhatsApp</option>
        </Select>
      </FormGroup>

      <ButtonnContainer>
        <Button type="submit">
          {buttonLabel}
        </Button>
      </ButtonnContainer>
    </Form>
  )
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
