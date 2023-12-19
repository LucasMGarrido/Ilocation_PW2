import React from 'react';
import { MenuProvider } from './MenuProvider/MenuProvider';
import MenuConsumer from './MenuConsumer/MenuConsumer';

interface MenuItem {
  label: string;
  to: string;
}

interface MenuProps {
  menuItems: MenuItem[];
}

const Menu: React.FC<MenuProps> = ({ menuItems }) => {

  return (
    <MenuProvider menuItems={menuItems}>
      <MenuConsumer />
    </MenuProvider>
  );
};

export default Menu;