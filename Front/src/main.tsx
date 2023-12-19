import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import LandingPage from './pages/LandingPage/landing.tsx';
import Sobre from './pages/Sobre/sobre.tsx';
import Login from './pages/loginPage/login.js';
import RegisterUser from './pages/cadastrarUsuario/registerUser.js'
import RegisterImovel from './pages/cadastrarImovel/registerImovel.tsx'
import ImoveisPage from './pages/imovelPage/imovel.tsx'
import UserPage from './pages/perfilUser/perfil.tsx'
import ImoveisDetalhes from './pages/detalhesImovel/detalhes.tsx'
import EdicaoPerfilUser from './pages/editarUsuario/EditUser.tsx'
import EdicaoImovel from './pages/editarImovel/EditImovel.tsx'
import Documentos from './pages/Documentos/documentos'


const router = createBrowserRouter([
	{
		element: <App />,
		children:[
			{
				path: "/",
				element: <LandingPage />
			},
			{
				path: "/sobre",
				element: <Sobre />
			},
			{
				path: "/login",
				element: <Login />
			},
			{
				path: "/registrar",
				element: <RegisterUser />
			},
			{
				path: "/cadastrarImovel",
				element: <RegisterImovel/>
			},
			{
				path: "/imoveis",
				element: <ImoveisPage/>
			},
			{
				path: "/detalhesImovel",
				element: <ImoveisDetalhes/>
			},
			{
				path: "/perfil",
				element: <UserPage/>
			},
			{
				path: "/editarPerfil",
				element: <EdicaoPerfilUser/>
			},
			{
				path: "/editarImovel",
				element: <EdicaoImovel/>
			},
			{
				path: "/documentos",
				element: <Documentos/>
			}
		]
	}
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<AnimatePresence mode='wait'>
			<RouterProvider router={router}/>
		</AnimatePresence>
	</React.StrictMode>
);
