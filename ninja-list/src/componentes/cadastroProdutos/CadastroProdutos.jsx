import { useState } from "react";
import PropTypes from "prop-types";
import Airtable from "airtable";
import { Formik, Form, Field } from "formik";

const CadastroProdutos = ({ chamarLista = () => {} }) => {
  const API_KEY = import.meta.env.VITE_APP_AIRTABLE_API_KEY;
  const [terminaDia, setTerminaDia] = useState();

  const chamandoCadastro = async (values) => {
    try {
      const base = new Airtable({ apiKey: API_KEY }).base("appmzousW9UQxa0xf");

      await base("Produtos").create({
        id_usuario: localStorage.getItem("criptografia"),
        nome: values.nomeProduto,
        repeticao: parseInt(values.repetirQuantidade),
        repeticao_dia: parseInt(values.diaSemana),
        encerramento: terminaDia,
        data_criacao: Date.now() / 1000,
      });

      chamarLista();
    } catch (err) {
      console.error(err);
    }
  };

  const chamandoData = (e) => {
    if (e.target.value === "") {
      setTerminaDia(e.target.value);
    }
    const pegarData = new Date(e.target.value).getTime() / 1000;
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
              <label htmlFor="repetirQuantidade" className="form-label">
                Repetir a cada:
              </label>
              <Field
                id="repetirQuantidade"
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
                id="diaSemana"
                className="form-select"
              >
                <option value="" disabled>
                  -- Selecione --
                </option>
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
            <label className="form-label" htmlFor="nunca">
              Termina:
            </label>
            <div className="form-check">
              <Field
                id="nunca"
                className="form-check-input"
                type="radio"
                name="repeticaoTermina"
                value=""
                checked
              />
              <label
                htmlFor="nunca"
                className="form-check-label"
                name="repeticaoTermina"
              >
                Nunca
              </label>
            </div>
            <div className="form-check">
              <Field
                id="em"
                className="form-check-input"
                type="radio"
                name="repeticaoTermina"
              />
              <label
                htmlFor="em"
                className="form-check-label me-2"
                name="repeticaoTermina"
              >
                Em:
              </label>
              <input
                type="date"
                onChange={chamandoData}
                min={new Date().toISOString().split("T")[0]}
              />
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

CadastroProdutos.propTypes = {
  chamarLista: PropTypes.func.isRequired,
};

export default CadastroProdutos;
