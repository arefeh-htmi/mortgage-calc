import React, { useState } from "react";

type FormPrimeTypes = string | number | boolean;

type useFormSpecs<T, K extends FormPrimeTypes> = {
  [key in keyof T]: K;
};

export function useForm(initialValues: useFormSpecs<any, any>) {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = event.target;
    if (type === "range") {
      const value = event.currentTarget.value;
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  return {
    formValues,
    handleChange,
  };
}
