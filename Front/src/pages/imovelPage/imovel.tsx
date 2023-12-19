// ImoveisPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImovelCard from '../../componentes/CardImovel/cardImovel';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Styles from './style.module.css';
import { motion } from 'framer-motion';

interface Imovel {
	id: number;
	imagens: string;
	descricao: string;
	cidade: string;
	bairro: string;
	rua: string;
	numero: string;
	metrosQuadrados: string;
	preco: number;
	handleImovelClick: (id: number) => void;
}

const urlApi = "http://localhost:3000/api/v1";

export const ImoveisPage: React.FC = () => {

	const [imoveisData, setImoveisData] = useState<Imovel[]>([]);
	const navigate = useNavigate()

	const handleImovelClick = (imovelId: number) => {
		localStorage.setItem('meusDados', JSON.stringify(imovelId));
		navigate('/detalhesImovel');
	};

	const fetchData = async () => {
		try {
		  const response = await axios.get(`${urlApi}/real-estate`);
		  setImoveisData(response.data);
		} catch (error) {
		  console.error(error);
		}
	}

	useEffect(() => {
		fetchData()
	}, [])	

	const animacaoImovelPage = {
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
		<motion.div className={Styles.pagina}
		//initial={{x: 1000}}
		//animate={{x: 0}}
		//exit={{x: window.innerWidth}}
		>
  <div className={Styles.pagina}>
  <div className={Styles.container}>
    {imoveisData.map((imovel) => (
      <motion.div key={imovel.id} onClick={() => handleImovelClick(imovel.id)} 
	  variants={animacaoImovelPage}
	  initial="hidden"
	  animate="visible">
        <ImovelCard imovel={imovel} />
      </motion.div>
    ))}
  </div>
</div>

</motion.div>

	);
};

export default ImoveisPage;
