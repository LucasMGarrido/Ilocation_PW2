import { Route, Routes, BrowserRouter } from 'react-router-dom';

//import {useAuth} from './hooks/useAuth';

//import {DefaultLayout} from './layouts/DefaultLayout';

import { RegisterUser } from '../src/pages/cadastrarUsuario/registerUser';
import { RegisterImovel } from '../src/pages/cadastrarImovel/registerImovel';
import { ImoveisDetalhes } from '../src/pages/detalhesImovel/detalhes';
import { ImoveisPage } from '../src/pages/imovelPage/imovel';
import { Login } from './pages/loginPage/login';
import { UserPage } from '../src/pages/perfilUser/perfil';
import React from 'react';

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/inicial" element={<ImoveisPage />} />
				<Route
					path="/detalhes-imovel/:id"
					element={<ImoveisDetalhes />}
				/>
				<Route path="/cadastrar-usuario" element={<RegisterUser />} />
				<Route path="/cadastrar-imovel" element={<RegisterImovel />} />
				<Route path="/login" element={<Login />} />
				<Route path="/perfil" element={<UserPage />} />
			</Routes>
		</BrowserRouter>
	);
}
