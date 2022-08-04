import React, { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

const ListagemDeProdutos = () => {
    const [lista, setLista] = useState([]);
    const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;

    useEffect(() => {
        fetch(
            "https://api.airtable.com/v0/appky4xTJcWP3RBeN/Produtos?filterByFormula=" +
                encodeURI("({id_usuario}='0277a69cf889d21e9614966db20e858a')") +
                "&sort" +
                encodeURI("[0][field]=nome") +
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
    }, []);

    return (
        <>
            <form className="row g-3 m-0">
                <div className="col-md-6">
                    <label htmlFor="id" className="form-label">
                        Id
                    </label>
                    <input id="id" type="text" className="form-control" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="descricao" className="form-label">
                        Descrição
                    </label>
                    <input
                        id="descricao"
                        type="text"
                        className="form-control"
                    />
                </div>
                <hr />
                <div className="col-12">
                    <button type="submit" className="btn btn-warning">
                        Cadastrar
                    </button>
                </div>
            </form>
            <div className="mt-3">
                <h5 className="card-title pb-3 pt-4">Listagem de Produtos</h5>
                {lista.map((user, i) => (
                    <div key={i} className="card mb-2 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h6 className="card-title">
                                    <span className="badge rounded-pill text-bg-secondary me-2">
                                        {format(
                                            user.fields.encerramento * 1000,
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
                                    <button className="btn btn-sm  btn-danger">
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
