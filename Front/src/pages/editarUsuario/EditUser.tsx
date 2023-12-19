import React, { useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationRegisterUser, ValidationRegisterUserType } from '../../util/validationRegisterUser';
import Imagem from '../../assets/editUser.png';

import Styles from './style.module.css';
import Botao from '../../componentes/botao/botao';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';

interface Auth {
	auth: boolean;
	token: string;
	id: number;
}

interface User{
    nome: string
    email: string
    telefone: string
    senha: string
    cidade: string
    bairro: string
    rua: string
    numero: string
}


export function EditUser() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationRegisterUserType>({
		resolver: zodResolver(ValidationRegisterUser),
	});
	
	const [dataUserId, setUserDataId] = useState<Auth>();
	const [exec, setExec] = useState(0)
	const [dataUser, setUserData] = useState<User>({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
	})


	const urlApi = "http://localhost:3000/api/v1";
	const navigate = useNavigate()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleEditUser = async (data: ValidationRegisterUserType) => {
		console.log(dataUser)
		try {
			const response = await axios.put(`${urlApi}/users/${dataUserId?.id}`, dataUser,{
				headers: {
					Authorization: dataUserId?.token
				}
			}
			)
			console.log(response.data);
			navigate('/perfil')
		} catch (error) {
			console.log(error);
		}
	};

	const getStoredData = () => {
		const storedData = localStorage.getItem('objetoDadosUsuario');
		if (storedData) {
		  setUserDataId(JSON.parse(storedData));
		  console.log(dataUserId?.token);
		} else {
		  console.log('Nada');
		}
	  };

	useEffect(() => {
		getStoredData();
	  }, [exec]);

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
				<div className={Styles.scriptText}>
					<h1>
						Edite seus dados<span> para encontrar o seu lar bem atualizado!</span>
					</h1>
				</div>

				<form
					className={Styles.ContentForm}
					onSubmit={handleSubmit(handleEditUser)}
				>

					{/* -------- Input do nome -------- */}
					<input
						className={Styles.InputForm}
						type="text"
						placeholder="Digite o seu nome"
						{...register('nome')}
						onChange={handleInputChange}
						
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
						onChange={handleInputChange}
						
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
						onChange={handleInputChange}
						
					/>
					{errors.telefone?.message && (
						<label className={Styles.LabelError}>
							{errors.telefone.message}
						</label>
					)}

					{/* -------- Input da Senha -------- */}
					<input
						className={Styles.InputForm}
						type="password"
						placeholder="Digite sua senha"
						{...register('senha')}
						onChange={handleInputChange}
						
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
						onChange={handleInputChange}
						
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
						onChange={handleInputChange}
						
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
						onChange={handleInputChange}
						
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
						onChange={handleInputChange}
						
					/>
					{errors.numero?.message && (
						<label className={Styles.LabelError}>
							{errors.numero.message}
						</label>
					)}

					{/* -------- Botão de enivar-cadastrar OBS: Fazer um componente! -------- */}
					<Botao label="Atualizar" type="submit"/>
				</form>
			</div>
		</motion.div>
	);
}

//Fazer um componente para esse botão e servir para todos os botões da aplicação e mudando a cor deles.

export default EditUser;
