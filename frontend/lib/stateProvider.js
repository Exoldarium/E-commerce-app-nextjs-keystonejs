import { useState, useContext, createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export default function StateProvider({ children }) {
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);

  function toggleMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function toggleSearchList() {
    setIsSearchActive(true);
  }

  function closeSearchList() {
    setIsSearchActive(false);
  }

  return (
    <LocalStateProvider
      value={{
        isSearchActive,
        toggleSearchList,
        closeSearchList,
        setIsSearchActive,
        isMenuActive,
        setIsMenuActive,
        toggleMenu,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

export function useSetState() {
  const all = useContext(LocalStateContext);
  return all;
}
