import React from 'react';
import Imagem from '../../assets/documentacao.png';
import Styles from './style.module.css';
import Menu from '../../componentes/menu/MenuL';
import ParagrafoDoc from '../../componentes/paragrafoDoc/paragrafoDoc';
import { motion } from 'framer-motion';

const documentosData = [
	{
		titulo: 'Documentos de Identificação:',
		itens: [
			'RG ou CNH (Carteira Nacional de Habilitação) dos vendedores.',
			'CPF dos vendedores.',
			'Certidão de estado civil (certidão de casamento, divórcio, ou declaração de estado civil, se aplicável).',
		],
	},
	{
		titulo: 'Comprovante de Renda:',
		itens: [
			'Contracheques ou extratos bancários que comprovem a capacidade de pagamento.',
			'Declaração de Imposto de Renda (IR)',
		],
	},
	{
		titulo: 'Comprovante de Residência:',
		itens: ['Contas de água, luz, gás, telefone ou contrato de aluguel.'],
	},
	{
		titulo: 'Carta de Crédito ou Pré-aprovação de Financiamento:',
		itens: [
			'Se o comprador estiver financiando a compra, é necessário apresentar uma carta de crédito ou pré-aprovação do banco.',
		],
	},
	{
		titulo: 'Comprovação de Recursos Próprios',
		itens: [
			'Declaração de saldo em contas bancárias e outros investimentos.',
		],
	},
	{
		titulo: 'Contrato de Compra e Venda',
		itens: [
			'Documento formalizando a transação entre as partes, geralmente preparado por um advogado ou corretor.',
		],
	},
];

export function Documentos() {
	return (
		<motion.div
		initial={{x: 1000}}
		animate={{x: 0}}
		exit={{x: window.innerWidth}}
		>
			<div className={Styles.Container01}>
				<div className={Styles.text01}>
					<h1 className={Styles.barra01}>
						<span className={Styles.span01}>Documentação Legal</span> <br></br>para aquisição/compra do imovel.
					</h1>
					{documentosData.map((documento, index) => (
						<ParagrafoDoc
							key={index}
							titulo={documento.titulo}
							itens={documento.itens}
						/>
					))}
				</div>
				<div className={Styles.Imagem}>
					<img src={Imagem} alt="Descrição da imagem" />
				</div>
			</div>
		</motion.div>
	);
}

export default Documentos;
