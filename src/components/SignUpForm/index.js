import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import FormGroup from '../FormGroup';
import useSignUpForm from './useSignUpForm';
import { Form, ButtonContainer } from './styles';

export default function SignUpForm({ buttonLabel, onSubmit }) {
  const {
    name,
    email,
    password,
    isSubmitting,
    isFormValid,
    getErrorMessageFieldName,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useSignUpForm(onSubmit);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageFieldName('name')}>
        <Input
          type="text"
          placeholder="Nome completo *"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail *"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageFieldName('password')}>
        <Input
          type="password"
          placeholder="Senha *"
          value={password}
          onChange={handlePasswordChange}
          error={getErrorMessageFieldName('password')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          $isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

SignUpForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
