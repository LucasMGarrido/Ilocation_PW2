import React from 'react';
import Imagem from '../../assets/landing.png';
import Styles from './style.module.css';
import { motion } from 'framer-motion';

export function LandingPage() {
	return (
			<motion.div className={Styles.Container} 
			//initial={{opacity: 0}}
			//animate={{opacity: 1}}
			//exit={{opacity: 0}}

			initial={{width: 0, opacity:0}}
			animate={{width: '100%', opacity:1}}
			exit={{x: window.innerWidth, opacity:0}}
			>
				<div className={Styles.text}>
					<p className={Styles.frases}>Olá, seja bem-vindo!</p>
					<h2>
						Encontre o lar dos seus <span>sonhos</span>
					</h2>
					<p className={Styles.frases}>
						Encontre a chave para o seu novo lar conosco. Sua
						jornada imobiliária começa aqui.
					</p>
				</div>
				<div className={Styles.Imagem}>
					<img src={Imagem} alt="Descrição da imagem" />
				</div>
			</motion.div>
	);
}

export default LandingPage;
