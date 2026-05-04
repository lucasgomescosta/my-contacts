import { useState, useCallback } from "react";

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  const setError = useCallback(({ field, message }) => {
    setErrors((prevState) => {
      const errorAlreadyExists = prevState.find((error) => error.field === field);

      if (errorAlreadyExists) {
        return prevState;
      }

      return [...prevState, { field, message }];
    });
  }, []);

  const removeError = useCallback((field) => {
    setErrors((prevState) =>
      prevState.filter((error) => error.field !== field)
    );
  }, []);

  const getErrorMessageFieldName = useCallback((fieldName) => {
    return errors.find(
      (error) => error.field === fieldName
    )?.message;
  }, [errors]);

  return {
    errors,
    setError,
    removeError,
    getErrorMessageFieldName,
  };
}
