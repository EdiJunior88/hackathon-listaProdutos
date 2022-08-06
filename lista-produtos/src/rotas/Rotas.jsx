import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../paginas/login/Login";
import ListagemDeProdutos from "../paginas/listagemDeProdutos/ListagemDeProdutos";
import Compras from "../paginas/compras/Compras";
import Calendario from "../paginas/calendario/Calendario";
import { ChecarLogin } from "../checarLogin/ChecarLogin";
import Navbar from "../componentes/navbar/Navbar";
import Footer from "../componentes/footer/Footer";
import { ObrigarLogin } from "../checarLogin/ObrigarLogin";

const Rotas = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <ChecarLogin>
              <Login />
            </ChecarLogin>
          }
        />
        <Route
          exact
          path='/lista'
          element={
            <ObrigarLogin>
              <ListagemDeProdutos />
            </ObrigarLogin>
          }
        />
        <Route
          exact
          path='/compras'
          element={
            <ObrigarLogin>
              <Compras />
            </ObrigarLogin>
          }
        />
        <Route
          exact
          path='/calendario'
          element={
            <ObrigarLogin>
              <Calendario />
            </ObrigarLogin>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
