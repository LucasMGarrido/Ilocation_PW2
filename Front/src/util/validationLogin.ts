import { z } from 'zod';

export const ValidationLogin = z.object({
    email:z.string().email({message:'Email inválido'}),
    senha:z.string().min(4,{message:'Senha menor ou igual a 3 caracteres'}),
  });

  export type ValidationLoginType = z.infer<typeof ValidationLogin>;