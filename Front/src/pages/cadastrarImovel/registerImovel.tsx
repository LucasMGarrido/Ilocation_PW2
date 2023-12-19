import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ValidationRegisterImovel,
	ValidationRegisterImovelType,
} from '../../util/validationRegisterImovel';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import Imagem from '../../assets/imovel.png';

import Styles from './style.module.css';
import Botao from '../../componentes/botao/botao';
import axios from 'axios';
import { motion } from 'framer-motion';

interface auth{
	auth: boolean,
	token: string,
	id: number
}

export function RegisterImovel() {

	const [dataAuth, setDataAuth] = useState<auth>()
	const navigate = useNavigate()
	const [exec, setExec] = useState(0)
	const [imgURL, setImgURL] = useState("");
    const [progressPorcent, setPorgessPorcent] = useState(0);
	
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationRegisterImovelType>({
		resolver: zodResolver(ValidationRegisterImovel),
	});

	const urlApi = "http://localhost:3000/api/v1";

	const handleUploadImage = async (data: ValidationRegisterImovelType) => {
		const fileInput = data.imagem;
	  
		if (fileInput && fileInput[0]?.files && fileInput[0]?.files.length > 0) {
		  const file = fileInput[0].files[0];
		  const storageRef = ref(storage, `images/${file.name}`);
		  const uploadTask = uploadBytesResumable(storageRef, file);
	  
		  uploadTask.on(
			"state_changed",
			(snapshot) => {
			  const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			  );
			  setPorgessPorcent(progress);
			},
			(error) => {
			  console.error("Error:", error);
			  alert(error);
			},
			() => {
			  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				console.log("Download URL:", downloadURL);
				setImgURL(downloadURL);
				// Após o upload, você pode prosseguir com a lógica de envio do formulário se necessário
			  });
			}
		  );
		}
	  };
	  
	  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const fileInput = event.target;
	
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
		  const file = fileInput.files[0];
		  const storageRef = ref(storage, `images/${file.name}`);
		  const uploadTask = uploadBytesResumable(storageRef, file);
	
		  uploadTask.on(
			"state_changed",
			(snapshot) => {
			  const progress = Math.round(
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100
			  );
			  setPorgessPorcent(progress);
			},
			(error) => {
			  console.error("Error:", error);
			  alert(error);
			},
			() => {
			  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				console.log("Download URL:", downloadURL);
				setImgURL(downloadURL);
				handleUploadImage
			  });
			}
		  );
		} else {
		  // Lide com o caso em que não há arquivo selecionado
		  console.error("Nenhum arquivo selecionado!");
		}
	  };

	const getStoredData = () => {
		  const storedData = localStorage.getItem('objetoDadosUsuario');
		  if (storedData) {
			setDataAuth(JSON.parse(storedData));
			console.log(dataAuth?.token);
			setExec(2)
		  } else {
			console.log("Nada");
		  }
	}

	useEffect(() => {
		getStoredData()
	}, [exec])

	const handleRegisterImovel = async (data: ValidationRegisterImovelType) => {
		try {
			const response = await axios.post(`${urlApi}/real-estate`, {
				preco: data.preco,
				cidade: data.cidade,
				bairro: data.bairro,
				rua: data.rua,
				numero: data.numero,
				descricao: data.descricao,
				metrosQuadrados: data.metrosQuadrados,
				imagens: imgURL
			}, {
				headers: {
                    'Authorization': dataAuth?.token
				}
			}
			)
			console.log(response.data)
			navigate('/imoveis')
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
				<div className={Styles.scriptText}>
					<h1>
					Anuncie seu imóvel <br></br>
					<span>
						e coloque-o no centro das atenções. Comece aqui.
					</span>
				</h1>
				</div>
			<form
				className={Styles.ContentForm}
				onSubmit={handleSubmit(handleRegisterImovel)}
			>

				{/* -------- Input do Preço -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Digite o preço do imovel"
					{...register('preco')}
				/>
				{errors.preco?.message && (
					<label className={Styles.LabelError}>
						{errors.preco.message}
					</label>
				)}

				{/* -------- Input do Cidade -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Digite a sua Cidade"
					{...register('cidade')}
				/>
				{errors.cidade?.message && (
					<label className={Styles.LabelError}>
						{errors.cidade.message}
					</label>
				)}

				{/* -------- Input do Bairro -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe o seu Bairro"
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
					placeholder="Informe sua rua"
					{...register('rua')}
				/>
				{errors.rua?.message && (
					<label className={Styles.LabelError}>
						{errors.rua.message}
					</label>
				)}

				{/* -------- Input do Número -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe o número do imovel"
					{...register('numero')}
				/>
				{errors.numero?.message && (
					<label className={Styles.LabelError}>
						{errors.numero.message}
					</label>
				)}

				{/* -------- Input da Metros² -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe os Metros²"
					{...register('metrosQuadrados')}
				/>
				{errors.metrosQuadrados?.message && (
					<label className={Styles.LabelError}>
						{errors.metrosQuadrados.message}
					</label>
				)}

				{/* -------- Input da Descricao -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe a descrição do imovel"
					{...register('descricao')}
				/>
				{errors.descricao?.message && (
					<label className={Styles.LabelError}>
						{errors.descricao.message}
					</label>
				)}

				{/* -------- Input da Imagem -------- */}
		        <input
                  className={Styles.InputForm}
                  type="file"
                  placeholder="Insira uma imagem do imovel"
                  {...register("imagem", { required: "Campo de imagem obrigatório" })}
				  onChange={handleFileChange}
        />
        {errors.imagem?.message && (
          <label className={Styles.LabelError}>{errors.imagem.message}</label>
        )}
        {!imgURL && <p>{progressPorcent}%</p>}
        {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
				<Botao label="Cadastrar" type="submit" />
			</form>
			</div>
		</motion.div>
	);
}

//Fazer um componente para esse botão e servir para todos os botões da aplicação e mudando a cor deles.

export default RegisterImovel;
