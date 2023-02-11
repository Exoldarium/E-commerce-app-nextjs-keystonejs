import { useState } from 'react';

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);

  function handleInputs(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  return {
    inputs,
    handleInputs,
  };
}
