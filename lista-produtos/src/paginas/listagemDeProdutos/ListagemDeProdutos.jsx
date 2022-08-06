import React, { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import CadastroProdutos from "../../componentes/cadastroProdutos/CadastroProdutos";

const ListagemDeProdutos = () => {
    const [lista, setLista] = useState([]);
    const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;

    const chamandoLista = () => {
        // const tamanhoPag = 5; pageSize=${tamanhoPag}

        fetch(
            `https://api.airtable.com/v0/appky4xTJcWP3RBeN/Produtos?&filterByFormula=` +
                encodeURI(
                    "({id_usuario} = '" +
                        localStorage.getItem("criptografia") +
                        "')"
                ) +
                "&sort" +
                encodeURI("[0][field]=data_criacao") +
                "&sort" +
                encodeURI("[0][direction]=desc"),
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            }
        )
            .then((response) => response.json())
            .then((result) => setLista(result.records))
            .catch((error) => console.error("error", error));
    };

    const deletarProduto = (id) => {
        fetch(`https://api.airtable.com/v0/appky4xTJcWP3RBeN/Produtos/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        })
            .then((response) => {
                console.log(response);
                response.json();
                chamandoLista();
            })
            .catch((error) => console.error("error", error));
    };

    useEffect(() => {
        chamandoLista();
    }, []);

    return (
        <>
            <div className="card mt-5">
                <CadastroProdutos chamarLista={() => chamandoLista()} />
            </div>
            <div className="mt-3 mb-5">
                <h5 className="card-title pb-3 pt-4">Listagem de Produtos</h5>
                {lista.map((user) => (
                    <div key={user.id} className="card mb-2 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h6 className="card-title">
                                    <span className="badge rounded-pill text-bg-secondary me-2">
                                        {format(
                                            user.fields.data_criacao * 1000,
                                            "dd MMM'. ' yyyy', ' EEE",
                                            { locale: pt }
                                        )}
                                    </span>
                                    {user.fields.nome}
                                </h6>
                                <div>
                                    <button className="btn btn-sm btn-warning me-2">
                                        <BsFillPencilFill className="me-2" />
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm  btn-danger"
                                        onClick={() => deletarProduto(user.id)}
                                    >
                                        <BsFillTrashFill className="me-2" />
                                        Deletar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ListagemDeProdutos;
