import React, { useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

let initialState = [
    {
        id: 1,
        descricao: "Açúcar",
    },
    {
        id: 2,
        descricao: "Nescau",
    },
];

const ListagemDeProdutos = () => {
    const [atividades, setAtividades] = useState(initialState);

    function addAtividade(e) {
        e.preventDefault();
        const atividade = {
            id: document.getElementById("id").value,
            descricao: document.getElementById("descricao").value,
        };

        setAtividades([...atividades, { ...atividade }]);
    }

    return (
        <>
            <form className="row g-3 mt-3">
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
                    <button
                        type="submit"
                        className="btn btn-warning"
                        onClick={addAtividade}
                    >
                        Cadastrar
                    </button>
                </div>
            </form>
            <div className="mt-3">
                <h5 className="card-title pb-3 pt-4">Listagem de Produtos</h5>
                {atividades.map((ativ) => (
                    <div key={ativ.id} className="card mb-2 shadow-sm">
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h6 className="card-title">
                                    <span class="badge rounded-pill text-bg-secondary me-2">
                                        03 Ago. 2022, Qua.
                                    </span>
                                    {ativ.descricao}
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
