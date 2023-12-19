import { z } from 'zod';

export const ValidationRegisterUser = z.object({
	nome: z.string().nonempty({ message: 'Nome é obrigatório' }),
	email: z.string().nonempty({ message: 'Email é obrigatório' }),
	telefone: z.string().nonempty({ message: 'Telefone é obrigatório' }),
	senha: z.string().nonempty({message:'Senha obrigatório'}).min(4,{message:'Error: Senha menor ou igual a 3 caracteres'}),
	cidade: z.string().nonempty({ message: 'Cidade é obrigatório' }),
	bairro: z.string().nonempty({ message: 'Se tiver Bairro insira o nome acima, caso não tenha coloque: -- ' }),
	rua: z.string().nonempty({ message: 'Se tiver Rua insira o nome acima, caso não tenha coloque um -- ' }),
	numero: z.string().refine((val) => /^\d+$/.test(val), {message: 'Se tiver número insira-o acima, caso não tenha coloque: 0',}),
});

export type ValidationRegisterUserType = z.infer<typeof ValidationRegisterUser>;
