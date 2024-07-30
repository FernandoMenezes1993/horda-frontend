import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'

import './index.css'

import Login from "./pages/login/Login.jsx"
import Cadastro from "./pages/cadastro/Cadastro.jsx"
import Horda from './pages/horda/Horda.jsx'
import Pedidos from "./pages/pedidos/Pedidos.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Login />}/>
          <Route path='/cadastro' element={<Cadastro />}/>
          <Route path='/horda' element={<Horda />}/>
          <Route path='/pedido' element={<Pedidos />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
