import PropTypes from 'prop-types';
import Input from '../Input';
import Button from '../Button';
import FormGroup from '../FormGroup';
import useSignInForm from './useSignInForm';
import { Form, ButtonContainer } from './styles';

export default function SignInForm({ buttonLabel, onSubmit }) {
  const {
    email,
    password,
    isSubmitting,
    isFormValid,
    getErrorMessageFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useSignInForm(onSubmit);

  return (
    <Form onSubmit={handleSubmit} noValidate>
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

SignInForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
