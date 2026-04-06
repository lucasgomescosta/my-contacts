import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import PropTypes from "prop-types";

import { Form, ButtonnContainer } from "./styles";
import FormGroup from "../FormGroup";

export default function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    console.log('enviou');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup
        error="Nome é obrigatório"
      >
        <Input  placeholder="Nome" error value={name} onChange={(e) => setName(e.target.value)}  />
      </FormGroup>

      <FormGroup
        error="O formato do e-mail é inválido"
      >
        <Input placeholder="E-mail" error value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormGroup>

      <FormGroup
        error="Telefone é obrigatório"
      >
        <Input placeholder="Telefone" error value={phone} onChange={(e) => setPhone(e.target.value)} />
      </FormGroup>

      <FormGroup>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>''''
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
