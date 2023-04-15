import { useState, useContext, createContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export default function StateProvider({ children }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isUserMenuActive, setUserMenuActive] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAmount, setAmount] = useState('');
  const [isProductId, setProductId] = useState();

  function toggleMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function toggleUserMenu() {
    setUserMenuActive(!isUserMenuActive);
  }

  function toggleSearchList() {
    setIsSearchActive(true);
  }

  function closeSearchList() {
    setIsSearchActive(false);
  }

  function toggleCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
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
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        closeCart,
        isAmount,
        setAmount,
        isUserMenuActive,
        setUserMenuActive,
        toggleUserMenu,
        isProductId,
        setProductId,
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
