import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";

import useErrors from "../../hooks/useErrors";
import FormGroup from "../FormGroup";
import Input from "../Input";

import {
  Container,
  FormCard,
  Actions
} from "./styles";

import Button from "../Button";


const CategoryForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const {
    errors,
    setError,
    removeError,
    getErrorMessageFieldName
  } = useErrors();

  useImperativeHandle(ref, () => ({
    setFieldsValue: (fields) => {
      setName(fields.name ?? '');
    },

    resetFields: () => {
      setName('');
    },

    setFieldError: (field, message) => {
      setError({ field, message });
    },

    clearFieldError: (field) => {
      removeError(field);
    },
  }), [setError, removeError])

  const isFormValid = name && errors.length === 0;

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    await onSubmit({ name });
    setIsSubmitting(false);
  }

  function handleNameChange(e) {
    setName(e.target.value)

    if (!e.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' })
    } else {
      removeError('name')
    }
  }

  return (
    <Container>
      <FormCard onSubmit={handleSubmit} noValidate>

        <FormGroup
          error={getErrorMessageFieldName('name')}
        >
          <Input
            type="text"
            placeholder="Ex: Família, Trabalho, Amigos... *"
            value={name}
            onChange={handleNameChange}
            disabled={isSubmitting}
            error={getErrorMessageFieldName('name')}
          />
        </FormGroup>

        <Actions>
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            isLoading={isSubmitting}
          >
            {buttonLabel}
          </Button>
        </Actions>
      </FormCard>
    </Container>
  );
})

CategoryForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CategoryForm;
