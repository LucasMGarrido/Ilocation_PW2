import React from 'react';
import Styles from './style.module.css';

interface DocumentosInfo {
	titulo: string;
	itens: string[];
}

const ParagrafoDoc: React.FC<DocumentosInfo> = ({ titulo, itens }) => {
	return (
		<div className={Styles.container}>
			<h4>{titulo}</h4>
			<ul>
				{itens.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ul>
		</div>
	);
};

export default ParagrafoDoc;
