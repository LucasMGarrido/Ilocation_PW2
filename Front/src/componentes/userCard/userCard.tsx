import React from 'react';
import Styles from './style.module.css';

interface User {
	id: number;
	nome: string;
	email: string;
	telefone: string;
	cidade: string;
	bairro: string;
	rua: string;
	numero: string;
}

interface UserCardProps {
	user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
	return (
		<div className={Styles.container}>
			<div className={Styles.userDados}>
				<h3>Dados Pessoais</h3>
				<p>
					<span>Nome:</span>
					{user.nome}
				</p>
				<p>
					<span>Email:</span>
					{user.email}
				</p>
				<p>
					<span>Telefone:</span>
					{user.telefone}
				</p>
			</div>
			<div className={Styles.userDados}>
				<h3>Dados de Localização</h3>
				<p>
					<span>Cidade:</span>
					{user.cidade}
				</p>
				<p>
					<span>Bairro:</span>
					{user.bairro}
				</p>
				<p>
					<span>Rua:</span>
					{user.rua}
				</p>
				<p>
					<span>Nº:</span>
					{user.numero}
				</p>
			</div>
		</div>
	);
};

export default UserCard;
