import { useEffect, useState } from 'react';

export default function useForm(initialState = {}) {
  const [inputs, setInputs] = useState(initialState);
  const initialValues = Object.values(initialState).join('');

  // in order for the values to be present on page reload we have to pass our initial values through useEffect
  // so that they are not dependent on component render
  useEffect(() => {
    setInputs(initialState);
  }, [initialValues]);

  function handleInputs(e) {
    let { name, value, type, files } = e.target;
    if (type === 'file') {
      [value] = files;
    }
    if (type === 'number') {
      value = parseInt(value);
    }
    setInputs({
      // when we deal with objects that have multiple pieces of state, we set our state to be an object and copy the existing state
      // react doesn't like when inputs change from controlled to uncontrolled and vice versa
      ...inputs,
      [name]: value,
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
