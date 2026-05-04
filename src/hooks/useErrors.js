import { useState, useCallback } from "react";

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if (errorAlreadyExists) {
      return;
    }

    setErrors((prevState) => [...prevState, { field, message }]);
  }, [errors]);

  function removeError(field) {
    setErrors((prevState) => prevState.filter((error) => error.field !== field));
  }

  function getErrorMessageFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageFieldName,
  };
}
