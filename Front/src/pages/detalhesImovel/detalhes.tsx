// ImoveisPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ImovelDetalhe from "../../componentes/detalhesImovel/detalhes";
import { BrowserRouter as Router } from "react-router-dom";
import Styles from "./style.module.css";
import { motion } from 'framer-motion';

interface Imovel {
  id: number;
  imagem: string;
  descricao: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  metrosQuadrados: string;
  preco: number;
}

export const ImoveisDetalhes: React.FC = () => {
  const [data, setData] = useState(0);

  const [imovelData, setImovelData] = useState<Imovel>({
    id: 0,
    imagem: "",
    descricao: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
    metrosQuadrados: "",
    preco: 0,
  });

  const urlApi = "http://localhost:3000/api/v1";

  useEffect(() => {
	const getStoredData = () => {
	  const storedData = localStorage.getItem('meusDados');
	  if (storedData) {
		setData(parseInt(storedData, 10));
		console.log(data);
	  } else {
		console.log("Nada");
	  }
	};
	getStoredData();
  
	const fetchData = async () => {
	  try {
		const response = await axios.get(`${urlApi}/real-estate/${data}`);
		setImovelData(response.data);
	  } catch (error) {
		console.error(error);
	  }
	};
  
	fetchData();
  }, [data]);

  return (
    <motion.div className={Styles.pagina}
    initial={{x: 1000}}
		animate={{x: 0}}
		exit={{x: window.innerWidth}}
    >
      <div className={Styles.container}>
        <ImovelDetalhe imovel={imovelData} />
      </div>
    </motion.div>
  );
};

export default ImoveisDetalhes;
