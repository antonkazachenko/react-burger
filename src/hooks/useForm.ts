import { useState, ChangeEvent } from 'react';

type TFormValues = {
  [key: string]: string;
};

type TFormFunctions = {
  values: TFormValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: (values: TFormValues) => void;
};

function useForm(inputValues: TFormValues = {}): TFormFunctions {
  const [values, setValues] = useState<TFormValues>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}

export default useForm;
