import { useState, useContext, createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export default function StateProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  function toggleSearchList() {
    setIsActive(true);
  }

  function closeSearchList() {
    setIsActive(false);
  }

  return (
    <LocalStateProvider
      value={{ toggleSearchList, closeSearchList, isActive, setIsActive }}
    >
      {children}
    </LocalStateProvider>
  );
}

export function useSetState() {
  const all = useContext(LocalStateContext);
  return all;
}
