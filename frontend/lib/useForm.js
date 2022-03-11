import { useEffect, useState } from 'react';

export default function useForm(init = {}) {
  const [inputs, setInputs] = useState(init);

  const initialValues = Object.values(init).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(init);
  }, [initialValues]);

  const handleChange = (event) => {
    let { name, value, type } = event.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = event.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(init);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
