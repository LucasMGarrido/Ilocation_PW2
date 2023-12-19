import React from 'react';
import Imagem from '../../assets/sobre.png';
import Styles from './style.module.css';
import { motion } from 'framer-motion';

export function Sobre() {
	return (
		<motion.div 
		initial={{x: 1000}}
		animate={{x: 0}}
		exit={{x: window.innerWidth}}
		>
			<div className={Styles.Container}>
				<div className={Styles.text}>
					<h2 className={Styles.barra}>
						<span>Sobre nós </span>
						<br></br>Conheça mais detalhes
					</h2>
					<p className={Styles.frases}>
						Bem-vindo à <span>ILocation</span>, sua parceira
						confiável na busca pelo lar perfeito. Nossa história é
						uma mistura de paixão pelo setor imobiliário e um
						compromisso inabalável em atender às necessidades de
						nossos clientes de maneira excepcional. Há anos, temos
						ajudado pessoas a encontrar o lugar ideal para criar
						memórias e construir suas vidas. Acreditamos que um
						imóvel é mais do que apenas quatro paredes; é um
						refúgio, um ponto de partida para aventuras e uma
						expressão de quem você é. Na <span>ILocation</span>, não apenas construímos casas,
						mas também realizamos sonhos. Estamos ansiosos para ser
						parte da sua jornada imobiliária. Junte-se a nós
						enquanto transformamos quaisquer dúvidas em certezas e
						desafios em conquistas. Seja bem-vindo a uma parceria
						imobiliária excepcional.
					</p>
				</div>
				<div className={Styles.Imagem}>
					<img src={Imagem} alt="Descrição da imagem" />
				</div>
			</div>
		</motion.div>
	);
}

export default Sobre;
