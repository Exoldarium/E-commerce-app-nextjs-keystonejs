import { useState } from 'react';

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);

  function handleInputs(e) {
    setInputs({
      // when we deal with objects that have multiple pieces of state, we set our state to be an object and copy the existing state
      // react doesn't like when inputs change from controlled to uncontrolled and vice versa
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  function clearForm() {
    setInputs(initialState);
  }

  return {
    inputs,
    handleInputs,
    clearForm,
  };
}
