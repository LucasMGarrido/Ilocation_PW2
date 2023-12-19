import React, { ButtonHTMLAttributes } from 'react';
import Styles from './style.module.css';

interface botaoI extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
}

const Botao: React.FC<botaoI> = ({ label, ...info }) => {
	return (
		<div className={Styles.test}>
			<button {...info}>{label}</button>
		</div>
	);
};

export default Botao;
