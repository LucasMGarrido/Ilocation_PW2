// MenuProvider.tsx
import React, { createContext, FC, ReactNode, useContext } from 'react';

interface MenuItem {
  label: string;
  to: string;
}

interface MenuContextType {
  menuItems: MenuItem[];
  children?: ReactNode;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: FC<MenuContextType> = ({ menuItems, children }) => {
  return (
    <MenuContext.Provider value={{ menuItems, children }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
};
