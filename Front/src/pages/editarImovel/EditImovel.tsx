import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
	ValidationRegisterImovel,
	ValidationRegisterImovelType,
} from '../../util/validationRegisterImovel';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';
import Imagem from '../../assets/editimovel.png';

import Styles from './style.module.css';
import Botao from '../../componentes/botao/botao';
import axios from 'axios';
import { motion } from 'framer-motion';

interface auth{
	auth: boolean,
	token: string,
	id: number
}

interface Imovel{
    preco: number
    cidade: string
    bairro: string
    rua: string
    numero: string
    descricao: string
    metrosQuadrados: number
    imagens: string
}

export function EditImovel() {

	const [dataAuth, setDataAuth] = useState<auth>()
	const [data, setData] = useState<Imovel>({
		preco: 0,
        cidade: '',
        bairro: '',
        rua: '',
        numero: '',
        descricao: '',
        metrosQuadrados: 0,
        imagens: '',
	})
	const [idImovel, setIdImovel] = useState(0)
	const navigate = useNavigate()
	const [exec, setExec] = useState(0)
	const [imgURL, setImgURL] = useState('');
    const [progressPorcent, setPorgessPorcent] = useState(0);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationRegisterImovelType>({
		resolver: zodResolver(ValidationRegisterImovel),
	});

	const urlApi = "http://localhost:3000/api/v1";

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: keyof Imovel,
		URLImagem?: any
	  ) => {
		const { value } = e.target;
		if (fieldName === "imagens") {
		  setData((prevValues) => ({ ...prevValues, [fieldName]: URLImagem}));
		  console.log(`A url é: ${URLImagem}`)
		} else {
		  setData((prevValues) => ({ ...prevValues, [fieldName]: value }));
		}
	};
			

	const getStoredData = () => {
		  const storedData = localStorage.getItem('objetoDadosUsuario');
		  const storedDataId = localStorage.getItem('idImovelEdicao');
		  if (storedData) {
			setDataAuth(JSON.parse(storedData));
			if(storedDataId){
				setIdImovel(JSON.parse(storedDataId))
				console.log(idImovel)
			}
			console.log(dataAuth?.token);
			setExec(2)

		  } else {
			console.log("Nada");
		  }
	}

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
				console.log("Download URL here:", downloadURL);
				setImgURL(downloadURL);
				console.log(`Setted: ${downloadURL}`)
				handleUploadImage
				handleInputChange(event, "imagens", downloadURL)
			  });
			}
		  );
		} else {
		  // Lide com o caso em que não há arquivo selecionado
		  console.error("Nenhum arquivo selecionado!");
		}
	  };

	const handleEditarImovel = async () => {
		try {
			const response = await axios.put(`${urlApi}/real-estate/${idImovel}`,data, {
				headers: {
                    'Authorization': dataAuth?.token
				}
			}
			)
			console.log(`Edição: ${response.data}`)
			navigate('/imoveis')
			
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getStoredData()
	}, [idImovel])

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
					Atualize seu imóvel <br></br>
					<span>
						e coloque-o sempre no topo!
					</span>
				</h1>
				</div>
			<form
				className={Styles.ContentForm}
				onSubmit={handleSubmit(handleEditarImovel)}
			>

				{/* -------- Input do Preço -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Digite o preço do imovel"
					{...register('preco')}
					onChange={(e) => handleInputChange(e, "preco")}
				/>

				{/* -------- Input do Cidade -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Digite a sua Cidade"
					{...register('cidade')}
					onChange={(e) => handleInputChange(e, "cidade")}
				/>

				{/* -------- Input do Bairro -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe o seu Bairro"
					{...register('bairro')}
					onChange={(e) => handleInputChange(e, "bairro")}
				/>

				{/* -------- Input da Rua -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe sua rua"
					{...register('rua')}
					onChange={(e) => handleInputChange(e, "rua")}
				/>

				{/* -------- Input do Número -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe o número do imovel"
					{...register('numero')}
					onChange={(e) => handleInputChange(e, "numero")}
				/>

				{/* -------- Input da Metros² -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe os Metros²"
					{...register('metrosQuadrados')}
					onChange={(e) => handleInputChange(e, "metrosQuadrados")}
				/>

				{/* -------- Input da Descricao -------- */}
				<input
					className={Styles.InputForm}
					type="text"
					placeholder="Informe a descrição do imovel"
					{...register('descricao')}
					onChange={(e) => handleInputChange(e, "descricao")}
				/>

				{/* -------- Input da Imagem -------- */}
				<input
					className={Styles.InputForm}
					type="file"
					placeholder="Insira uma imagem do imovel"
					{...register('imagem')}
					onChange={handleFileChange}
				/>

				{/* -------- Botão -------- */}
				{!imgURL && <p>{progressPorcent}%</p>}
        {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
				<Botao label="Atualizar informações" type="submit" onClick={() => {handleEditarImovel()}}/>
			</form>
			</div>
		</motion.div>
	);
}


export default EditImovel;
