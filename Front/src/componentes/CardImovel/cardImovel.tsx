import React from "react";
import Styles from "./style.module.css";
import Botao from "../../componentes/botao/botao";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

interface Auth {
	auth: boolean;
	token: string;
	id: number;
}

interface Imovel {
  id: number;
  imagens: string;
  cidade: string;
  bairro: string;
  metrosQuadrados: string;
  preco: number;
}

interface ImovelCardProps {
  imovel: Imovel;
  hasAction?: boolean;
  token: string | undefined
}

const ImovelCard: React.FC<ImovelCardProps> = ({
  imovel,
  hasAction = false,
  token
}) => {
  const sendId = (id: number) => {
    localStorage.setItem("idImovelEdicao", JSON.stringify(id));
	navigate("/editarImovel");
  console.log(`ID do imóvel: ${id} enviado!`)
  };

  const navigate = useNavigate();
  const urlApi = "http://localhost:3000/api/v1";

  const deleteImovel = async (id: number) => {
    try {
      const response = await axios.delete(`${urlApi}/real-estate/${id}`, {
        headers: {
          'Authorization': token
        }
      });
  
      console.log(`Imóvel com id ${response.data} deletado!`);
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };

  const AnimacaoCard = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div className={Styles.container}
    variants={AnimacaoCard}
    >
      <img
        src={ imovel.imagens !== "" ? imovel.imagens !== 'string' ? imovel.imagens: "https://www.imobiliariadourada.com.br/blog/wp-content/uploads/2021/01/55-1024x640.jpg": "https://www.imobiliariadourada.com.br/blog/wp-content/uploads/2021/01/55-1024x640.jpg"}
        alt=""
      />
      <h3>{imovel.cidade}</h3>
      <p>{imovel.bairro}</p>
      <p>{imovel.metrosQuadrados} m²</p>
      <p className={Styles.preco}>R$ {imovel.preco}</p>

      {hasAction && (
        <div className={Styles.containerbutton}>
          <div>
            <Botao
              label="Editar"
              type="submit"
              onClick={() => {
				sendId(imovel.id)
              }}
            />
          </div>
          <div>
            <Botao label="Deletar" type="submit" onClick={() => {deleteImovel(imovel.id)}}/>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ImovelCard;
