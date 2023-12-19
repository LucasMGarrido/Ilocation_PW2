import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationRegisterUser, ValidationRegisterUserType } from '../../util/validationRegisterUser';
import { useNavigate } from 'react-router-dom';
import Imagem from '../../assets/usuario.png';

import Styles from './style.module.css';
import Botao from '../../componentes/botao/botao';
import axios from 'axios';
import { motion } from 'framer-motion';

export function RegisterUser() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationRegisterUserType>({
		resolver: zodResolver(ValidationRegisterUser),
	});

	const urlApi = "http://localhost:3000/api/v1";
	const navigate = useNavigate();

	const handleRegisterUser = async (data: ValidationRegisterUserType) => {
		try {
			const response = await axios.post(`${urlApi}/users`, {
				nome: data.nome,
				email: data.email,
				senha: data.senha,
				telefone: data.telefone,
				cidade: data.cidade,
				bairro: data.bairro,
				rua: data.rua,
				numero: data.numero
			}
			)
			console.log(response.data);
			navigate('/login')
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
				<h2 className={Styles.textLeft}>
					Seja bem-vindo
					<span>à nossa imobiliária!</span>
				</h2>
				<img src={Imagem} alt="Descrição da imagem" />
			</div>

			<div className={Styles.containerText}>
				<div className={Styles.scriptText}>
					<h1>
						Cadastre-se <span> e encontre o lar dos seus sonhos em apenas alguns cliques</span>
					</h1>
				</div>

				<form
					className={Styles.ContentForm}
					onSubmit={handleSubmit(handleRegisterUser)}
				>

					{/* -------- Input do nome -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Digite o seu nome"
						{...register('nome')}
					/>
					{errors.nome?.message && (
						<label className={Styles.LabelError}>
							{errors.nome.message}
						</label>
					)}

					{/* -------- Input do Email -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Digite o seu email"
						{...register('email')}
					/>
					{errors.email?.message && (
						<label className={Styles.LabelError}>
							{errors.email.message}
						</label>
					)}

					{/* -------- Input do Telefone -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Informe o seu telefone"
						{...register('telefone')}
					/>
					{errors.telefone?.message && (
						<label className={Styles.LabelError}>
							{errors.telefone.message}
						</label>
					)}

					{/* -------- Input da Senha -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Digite sua senha"
						{...register('senha')}
					/>
					{errors.senha?.message && (
						<label className={Styles.LabelError}>
							{errors.senha.message}
						</label>
					)}

					{/* -------- Input da Cidade -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Informe a sua cidade"
						{...register('cidade')}
					/>
					{errors.cidade?.message && (
						<label className={Styles.LabelError}>
							{errors.cidade.message}
						</label>
					)}

					{/* -------- Input da Bairro -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Informe o seu bairro"
						{...register('bairro')}
					/>
					{errors.bairro?.message && (
						<label className={Styles.LabelError}>
							{errors.bairro.message}
						</label>
					)}

					{/* -------- Input da Rua -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Informe a sua rua"
						{...register('rua')}
					/>
					{errors.rua?.message && (
						<label className={Styles.LabelError}>
							{errors.rua.message}
						</label>
					)}

					{/* -------- Input da Número -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Informe o número da sua casa"
						{...register('numero')}
					/>
					{errors.numero?.message && (
						<label className={Styles.LabelError}>
							{errors.numero.message}
						</label>
					)}

					{/* -------- Botão de enivar-cadastrar OBS: Fazer um componente! -------- */}
					<Botao label="Cadastrar" type="submit" />
				</form>
			</div>
		</motion.div>
	);
}

//Fazer um componente para esse botão e servir para todos os botões da aplicação e mudando a cor deles.

export default RegisterUser;
