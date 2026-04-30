import { forwardRef } from "react";
import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import PropTypes from "prop-types";

import { Form, ButtonnContainer } from "./styles";
import FormGroup from "../FormGroup";

import useContactForm from "./useContactForm";

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {

  const {
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
  } = useContactForm(ref, onSubmit);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup
        error={getErrorMessageFieldName('name')}
      >
        <Input
          placeholder="Nome *"
          error={getErrorMessageFieldName('name')}
          value={name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageFieldName('email')}
      >
        <Input
          type="email"
          placeholder="E-mail *"
          error={getErrorMessageFieldName('email')}
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageFieldName('phone')}
      >
        <Input
          placeholder="Telefone *"
          error={getErrorMessageFieldName('phone')}
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup
        error={getErrorMessageFieldName('categoryId')}
        isLoading={isLoadingCategories}
      >
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem Categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Select>
      </FormGroup>

      <ButtonnContainer>
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonnContainer>
    </Form>
  )
})


ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
