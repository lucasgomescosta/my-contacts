import { useState, useImperativeHandle } from "react";
import { useQuery } from "@tanstack/react-query";
import { listAllCategories } from "../../services/CategoriesService";
import useErrors from "../../hooks/useErrors";
import formatPhone from "../../utils/formatPhone";
import isValidEmail from "../../utils/isValidEmail";

export default function useContactForm(ref, onSubmit) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, setError, removeError, getErrorMessageFieldName } = useErrors();

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => listAllCategories(),
  });

  useImperativeHandle(ref, () => ({
    setFieldsValue: (fields) => {
      setName(fields.name ?? '');
      setEmail(fields.email ?? '');
      setPhone(formatPhone(fields.phone ?? ''));
      setCategoryId(fields.category.id ?? "");
    },

    resetFields: () => {
      setName('');
      setEmail('');
      setPhone('');
      setCategoryId('');
    },
  }), [])

  const isFormValid = (name && errors.length === 0)

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true)
    await onSubmit({ name, email, phone, categoryId });
    setIsSubmitting(false)
  }

  function handleNameChange(e) {
    setName(e.target.value)

    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' })
    } else {
      removeError('name')
    }

  }

  function handleEmailChange(e) {
    setEmail(e.target.value);

    if (e.target.value && !isValidEmail(e.target.value)) {
      setError({ field: 'email', message: 'E-mail é inválido' })
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(e) {
    setPhone(formatPhone(e.target.value))
  }

  return {
    name,
    email,
    phone,
    categoryId,
    categories,
    isLoadingCategories,
    isSubmitting,
    getErrorMessageFieldName,
    isFormValid,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    setCategoryId
  }
}
