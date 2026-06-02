import { useState } from 'react';
import useErrors from '../../hooks/useErrors';
import isValidEmail from '../../utils/isValidEmail';

export default function useSignInForm(onSubmit) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = email && password && errors.length === 0;

  function handleEmailChange(event) {
    const value = event.target.value;
    setEmail(value);

    if (!value) {
      setError({ field: 'email', message: 'E-mail é obrigatório' });
      return;
    }

    if (!isValidEmail(value)) {
      setError({ field: 'email', message: 'E-mail é inválido' });
      return;
    }

    removeError('email');
  }

  function handlePasswordChange(event) {
    const value = event.target.value;
    setPassword(value);

    if (!value) {
      setError({ field: 'password', message: 'Senha é obrigatória' });
      return;
    }

    removeError('password');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ email, password });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    email,
    password,
    isSubmitting,
    isFormValid,
    getErrorMessageFieldName,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
}
