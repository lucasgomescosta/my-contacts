import { useState } from 'react';
import useErrors from '../../hooks/useErrors';
import isValidEmail from '../../utils/isValidEmail';

export default function useSignUpForm(onSubmit) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageFieldName,
  } = useErrors();

  const isFormValid = name && email && password && errors.length === 0;

  function handleNameChange(event) {
    const value = event.target.value;
    setName(value);

    if (!value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
      return;
    }

    removeError('name');
  }

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

    if (value.length < 6) {
      setError({ field: 'password', message: 'A senha deve ter no mínimo 6 caracteres' });
      return;
    }

    removeError('password');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit({ name, email, password });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
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
  };
}
