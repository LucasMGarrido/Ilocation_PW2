import { z } from 'zod';

export const ValidationRegisterImovel = z.object({
  preco:z.string().refine((val) => /^\d+$/.test(val), {message: 'Informe o valor do seu imovel.',}),
  descricao: z.string().nonempty({ message: 'Descrição do imovel é obrigatória' }),
  imagem: z.unknown().refine((val) => val !== null && val !== undefined, { message: 'Imagem é obrigatória.' }),
  metrosQuadrados:z.string().refine((val) => /^\d+$/.test(val), {message: 'Informe os metros quadrados do imovel',}),
  cidade: z.string().nonempty({ message: 'Cidade é obrigatório' }),
	bairro: z.string().nonempty({ message: 'Se tiver Bairro insira o nome acima, caso não tenha coloque: -- ' }),
	rua: z.string().nonempty({ message: 'Se tiver Rua insira o nome acima, caso não tenha coloque um -- ' }),
	numero: z.string().refine((val) => /^\d+$/.test(val), {message: 'Se tiver número insira-o acima, caso não tenha coloque: 0.',}),
});

export type ValidationRegisterImovelType = z.infer<typeof ValidationRegisterImovel>;
