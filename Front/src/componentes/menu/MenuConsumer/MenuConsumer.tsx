import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './style.module.css';
import { useMenuContext } from '../MenuProvider/MenuProvider';

const MenuConsumer: React.FC = () => {
  const { menuItems } = useMenuContext();
  const navigate = useNavigate()

  const logout = () =>{
    localStorage.removeItem('objetoDadosUsuario');
    navigate('/login')
    window.location.reload();
    console.log('Logout feito')
  }

  return (
    <header className={Styles.headerst}>
      <nav>
        <ul>
          {menuItems.map((menuItem, index) => (
            <li key={index}>
              {menuItem.label === 'Sair' ? (
                <Link to={menuItem.to}><p onClick={logout}>{menuItem.label}</p></Link>
              ) : (
              <Link to={menuItem.to}><p>{menuItem.label}</p></Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MenuConsumer;