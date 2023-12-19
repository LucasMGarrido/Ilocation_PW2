import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from '../../componentes/userCard/userCard';
import ImovelCard from '../../componentes/CardImovel/cardImovel';
import Styles from './style.module.css';
import Botao from '../../componentes/botao/botao';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Auth {
	auth: boolean;
	token: string;
	id: number;
}

interface User {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
}

interface Imovel {
  id: number;
  imagem: string;
  cidade: string;
  bairro: string;
  metrosQuadrados: string;
  preco: number;
  imagens: string
}

export const UserPage: React.FC = () => {
  const [dataUserId, setUserDataId] = useState<Auth>();
  const [dataUser, setUserData] = useState<User>({
	id: 0,
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  bairro: '',
  rua: '',
  numero: '',
  })
  const [imovelData, setImovelData] = useState<Imovel[]>([]);
  const [exec, setExec] = useState(0)

  const urlApi = 'http://localhost:3000/api/v1';
  const navigate = useNavigate()

  const getStoredData = () => {
    const storedData = localStorage.getItem('objetoDadosUsuario');
    if (storedData) {
      setUserDataId(JSON.parse(storedData));
      console.log(dataUserId?.token);
    } else {
      console.log('Nada');
    }
  };


  const logout = () =>{
    localStorage.removeItem('objetoDadosUsuario')
    navigate('/login')
    window.location.reload()
    console.log('Logout feito')
  }

  const deleteUser = async () =>{
    try{
      await axios.delete(`${urlApi}/users/${dataUserId?.id}`,{
        headers: {
          'Authorization': dataUserId?.token
        }
      })
      logout()
    }catch(error){
      console.log(`Algo deu errado ao excluir o usuário. ${error}`)
    }
  }

  const fetchData = async () => {
  try {
    if (dataUserId?.id !== undefined) {
    const responseUser = await axios.get(`${urlApi}/users/${dataUserId?.id}`);
    const responseImovel = await axios.get(`${urlApi}/real-estate/user`, {
      headers: {
      'Authorization': dataUserId?.token
      }
    });
    setImovelData(responseImovel.data);
    //console.log(responseImovel.data)
    setUserData(responseUser.data);
    //console.log(dataUser)
    }
    setExec(2)
  } catch (error) {
    console.error(error);
  }
  };

  useEffect(() => {
    getStoredData();
      fetchData();
  }, [exec]);

	const animacaoUserPage = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
		  opacity: 1,
		  scale: 1,
		  transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2
		  }
		}
	  };

  return (
    <motion.div
    initial={{x: 1000}}
		animate={{x: 0}}
		exit={{x: window.innerWidth}}
    >
      <UserCard key={dataUser?.id} user={dataUser} />
      <div className={Styles.containerbutton}>
					<div className={Styles.buttonB}>
						<Botao label="Editar" type="submit" onClick={() => { navigate('/editarPerfil') }}/>
					</div>
					<div>
						<Botao label="Deletar" type="submit" onClick={() => deleteUser()}/> 
					</div>
			</div>
      <motion.div className={Styles.container} 
      variants={animacaoUserPage}
      initial="hidden"
      animate="visible"
      >
        {imovelData.map((imovel) => (
          <ImovelCard key={imovel.id} imovel={imovel} token={dataUserId?.token} hasAction /> //Esse hasAction que é um props que tá fazendo mostrar os botões. Acho que vai ter que fazer as funções de deletar e editar dentro componente CardImovel.
        ))}
      </motion.div>
    </motion.div>
  );
};

export default UserPage;
