import React, { useEffect, useState } from 'react';
import Botao from '../../componentes/botao/botao';
import { useNavigate } from 'react-router-dom';
import Styles from './style.module.css';


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
}

interface ImovelDetalhesProps {
	imovel: Imovel;
}

const ImovelDetalhe: React.FC<ImovelDetalhesProps> = ({ imovel }) => {
	const navigate = useNavigate();
	const navegacao = () => {
		navigate('/documentos');
	  }
	return (
		<div className={Styles.container}>
			<div>
				<img
				className={Styles.imgcontainer}
					src={imovel.imagens !== "" ? imovel.imagens !== 'string' ? imovel.imagens: "https://www.imobiliariadourada.com.br/blog/wp-content/uploads/2021/01/55-1024x640.jpg": "https://www.imobiliariadourada.com.br/blog/wp-content/uploads/2021/01/55-1024x640.jpg"}
					alt=""
				/>
			</div>
			<div>
				<p className={Styles.descricao}>
					<span>Sobre este imovel: </span>
					{imovel.descricao}
				</p>
				<h3 className={Styles.cidade}>{imovel.cidade}</h3>
				<p className={Styles.cidadeInfo}>Bairro {imovel.bairro}</p>
				<p className={Styles.cidadeInfo}>Rua {imovel.rua}</p>
				<p className={Styles.cidadeInfo}>nº {imovel.numero}</p>
				<p className={Styles.cidadeInfo}>{imovel.metrosQuadrados} m²</p>
				<p className={Styles.preco}>R${imovel.preco}</p>
				<Botao label="Comprar" type="submit" onClick={navegacao}/>
			</div>
		</div>
	);
};

export default ImovelDetalhe;
