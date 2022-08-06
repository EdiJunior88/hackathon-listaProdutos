import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../paginas/login/Login";
import ListagemDeProdutos from "../paginas/listagemDeProdutos/ListagemDeProdutos";
import Compras from "../paginas/compras/Compras";
import Calendario from "../paginas/calendario/Calendario";
import Navbar from "../componentes/navbar/Navbar";
import Footer from "../componentes/footer/Footer";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/lista" element={<ListagemDeProdutos />} />
                <Route exact path="/compras" element={<Compras />} />
                <Route exact path="/calendario" element={<Calendario />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default Rotas;
