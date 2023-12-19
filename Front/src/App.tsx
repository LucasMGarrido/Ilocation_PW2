import React, { useEffect, useState } from 'react';
import './App.css';
import Menu from './componentes/menu/MenuL';
import { Outlet } from 'react-router-dom';

interface Auth {
  auth: boolean;
  token: string;
  id: number;
}

function App() {
  const [dataAuth, setDataAuth] = useState<Auth | undefined>(undefined);

  const menuItemsLoggedIn = [
    { label: 'Vender', to: '/cadastrarimovel' },
    { label: 'Imoveis', to: '/imoveis' },
    { label: 'Perfil', to: '/perfil' },
    { label: 'Sair', to: '/login' },
  ];

  const menuItemsLoggedOut = [
    { label: 'Home', to: '/' },
    { label: 'Sobre', to: '/sobre' },
    { label: 'Entrar', to: '/login' },
    { label: 'Cadastrar-se', to: '/registrar' },
  ];

  const menuItems =
    dataAuth?.token === undefined ? menuItemsLoggedOut : menuItemsLoggedIn;

  useEffect(() => {
    const getStoredData = () => {
      const storedData = localStorage.getItem('objetoDadosUsuario');
      if (storedData) {
        setDataAuth(JSON.parse(storedData));
        console.log(dataAuth?.token);
      } else {
        setDataAuth(undefined);
      }
    };
    getStoredData();
  }, [localStorage.getItem('objetoDadosUsuario')]);

  return (
    <>
      <div className="outlet-space">
        <Menu menuItems={menuItems} />
      </div>
      <Outlet />
    </>
  );
}

export default App;
