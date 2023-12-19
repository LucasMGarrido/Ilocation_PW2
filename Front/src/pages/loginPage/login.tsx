import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ValidationLogin,
	ValidationLoginType,
} from '../../util/validationLogin';
import { useNavigate } from 'react-router-dom';
import Imagem from '../../assets/login.png';
import Botao from '../../componentes/botao/botao';

import Styles from './style.module.css';
import axios from 'axios';
import App from '../../App';
import { motion } from 'framer-motion';

interface UserData {
	email: string;
	senha: string;
}

interface auth{
	auth: boolean,
	token: string,
	id: number
}


export function Login() {

	const [userData, setUserData] = useState<UserData>({
		email: '',
		senha: ''
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationLoginType>({
		resolver: zodResolver(ValidationLogin),
	});
	const urlApi = "http://localhost:3000/api/v1";
	const navigate = useNavigate();


	const handleImovelClick = (objAuth: auth) => {
		localStorage.setItem('objetoDadosUsuario', JSON.stringify(objAuth));
		navigate('/');
		window.location.reload();
	};

	const handleLogar = async (data: ValidationLoginType) => {
		try {
			const response = await axios.post(`${urlApi}/login`, {
				email: data.email,
				senha: data.senha
			},
			{
				headers: {
				  'Content-Type': 'application/json',
				},
			  }
			)
			handleImovelClick(response.data)
			console.log(response.data);
			//setIsUserLoggedIn(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<motion.div className={Styles.Container}
		initial={{x: 1000}}
		animate={{x: 0}}
		exit={{x: window.innerWidth}}
		>
			<div className={Styles.Imagem}>
				<img src={Imagem} alt="Descrição da imagem" />
			</div>
			<div className={Styles.containerText}>
			<div className={Styles.test}>
				<h3 className={Styles.h3titulo}>
					Faça o login
					<span className={Styles.spanText}>
						e acesse o seu mundo de oportunidades imobiliárias.
					</span>
				</h3>
				</div>

			<form
				className={Styles.ContentForm}
				onSubmit={handleSubmit(handleLogar)}
			>

				{/* -------- Input do Email -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Digite o seu Email"
					{...register('email')}
				/>
				{errors.email?.message && (
					<label className={Styles.LabelError}>
						{errors.email.message}
					</label>
				)}

				{/* -------- Input da Senha -------- */}
				<input
					className={Styles.InputForm}
					type="password"
					placeholder="Digite o sua senha"
					{...register('senha')}
				/>
				{errors.senha?.message && (
					<label className={Styles.LabelError}>
						{errors.senha.message}
					</label>
				)}

				{/* -------- Botão de enivar-cadastrar OBS: Fazer um componente! -------- */}
				<Botao label="Entrar" type="submit" />
			</form>
			</div>
		</motion.div>
	);
}

//Fazer um componente para esse botão e servir para todos os botões da aplicação e mudando a cor deles.

export default Login;
