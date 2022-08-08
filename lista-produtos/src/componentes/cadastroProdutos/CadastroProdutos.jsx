import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

const CadastroProdutos = ({ chamarLista = () => {} }) => {
    const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;

    const [terminaDia, setTerminaDia] = useState();

    const chamandoCadastro = (values) => {
        var Airtable = require("airtable");
        var base = new Airtable({ apiKey: API_KEY }).base("appky4xTJcWP3RBeN");

        base("Produtos").create(
            {
                id_usuario: localStorage.getItem("criptografia"),
                nome: values.nomeProduto,
                repeticao: parseInt(values.repetirQuantidade),
                repeticao_dia: parseInt(values.diaSemana),
                encerramento: terminaDia,
                data_criacao: new Date().getTime() / 1000,
            },
            function (err, record) {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(record.getId());
                chamarLista();
            }
        );
    };

    const chamandoData = (e) => {
        if (e.target.value === "") {
            setTerminaDia(e.target.value);
        }
        var pegarData = new Date(e.target.value).getTime() / 1000;
        console.log("pegarData", pegarData);
        setTerminaDia(pegarData);
    };

    return (
        <div className="card-body">
            <h5 className="card-title pb-3 pt-2">Cadastro de Produtos</h5>
            <Formik
                initialValues={{
                    nomeProduto: "",
                    repetirQuantidade: "",
                    diaSemana: "",
                }}
                onSubmit={(values, { resetForm }) => {
                    chamandoCadastro(values);
                    resetForm({ values: "" });
                }}
            >
                <Form className="row g-3">
                    <div className="col-md-12">
                        <Field
                            name="nomeProduto"
                            className="form-control"
                            placeholder="Nome do Produto"
                            required
                        />
                    </div>
                    <div className="row g-3 mt-0">
                        <div className="col-md-3">
                            <label
                                htmlFor="repetirQuantidade"
                                className="form-label"
                            >
                                Repetir a cada:
                            </label>
                            <Field
                                type="number"
                                min="0"
                                step="1"
                                name="repetirQuantidade"
                                className="form-control"
                                placeholder="0"
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="diaSemana" className="form-label">
                                Dia da semana:
                            </label>
                            <Field
                                name="diaSemana"
                                as="select"
                                className="form-select"
                            >
                                <option value="" disabled>-- Selecione --</option>
                                <option value="0">Domingo</option>
                                <option value="1">Segunda</option>
                                <option value="2">Terça</option>
                                <option value="3">Quarta</option>
                                <option value="4">Quinta</option>
                                <option value="5">Sexta</option>
                                <option value="6">Sabado</option>
                            </Field>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Termina:</label>
                        <div className="form-check">
                            <Field
                                className="form-check-input"
                                type="radio"
                                name="repeticaoTermina"
                                value=""
                                checked
                            />
                            <label
                                className="form-check-label"
                                name="repeticaoTermina"
                            >
                                Nunca
                            </label>
                        </div>
                        <div className="form-check">
                            <Field
                                className="form-check-input"
                                type="radio"
                                name="repeticaoTermina"
                            />
                            <label
                                className="form-check-label me-2"
                                name="repeticaoTermina"
                            >
                                Em:
                            </label>
                            <input type="date" onChange={chamandoData} min={new Date().toISOString().split('T')[0]} />
                        </div>
                    </div>
                    <hr className="mb-0" />
                    <div className="col-12">
                        <button type="submit" className="btn btn-warning">
                            Cadastrar
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default CadastroProdutos;