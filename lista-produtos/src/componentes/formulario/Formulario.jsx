import React, { useState } from 'react';
import MD5 from 'crypto-js/md5';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { RiAlertFill } from 'react-icons/ri';
import imagemLogo from '../../imagens/logo.jpg';

const Formulario = () => {
  /* Atualiza o valor do input Email e CPF */
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');

  /* Ocultar o token da API Airtable */
  /* Redireciona para a página escolhida */
  const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
  let navegacao = useNavigate();

  /* Função para deixar o input CPF formatado com números */
  const somenteNumeros = (evento) => {
    const input = evento.target.value.replace(/\D/g, '');
    setCPF(input);
  };

  /* Função para remover os espaços em branco do input Email */
  const somenteEmail = (evento) => {
    if (evento.key === ' ') {
      evento.preventDefault();
    }
    const input = evento.target.value.replace(/\s+/g, '');
    setEmail(input);
  };

  /* Função que salva os dados dos inputs (Email e CPF) no localStorage */
  /* e criptografa os inputs em hash MD5 para string */
  function salvarDados() {
    const inputEmail = document.getElementById('email').value;
    const inputCPF = document.getElementById('cpf').value;

    /* Verifica se o input Email e CPF estão preenchidos */
    /* para salvar o hash MD5 no localStorage */
    if (inputEmail !== '' && inputCPF !== '') {
      localStorage.setItem('criptografia', MD5(email + cpf).toString());
    }
  }

  /* Padronização dos input Email e CPF */
  const esquema = yup.object().shape({
    email: yup.string().email().required('Preencha o email'),
    cpf: yup
      .string()
      .min(11, 'CPF incompleto')
      .max(11)
      .required('Preencha o CPF'),
  });

  const formik = useFormik({
    validationSchema: esquema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: '',
      cpf: '',
    },

    onSubmit: () => {
      fetch(
        'https://api.airtable.com/v0/appky4xTJcWP3RBeN/Produtos?filterByFormula=' +
          encodeURI(
            "({id_usuario} = '" + localStorage.getItem('criptografia') + "')"
          ),
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      )
        /* Redirecionamento do usuário para a página Cadastro de Compras */
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            navegacao('/cadastro');
          }
        })
        .catch((error) => console.error('error', error));
    },
  });

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-9 col-md-7 col-lg-6 mx-auto'>
          <div className='card border-0 shadow rounded-3 my-5'>
            {/* <a href="https://br.freepik.com/fotos-vetores-gratis/arte">Arte psd criado por freepik - br.freepik.com</a> */}
            <div className='card-body p-4 p-sm-5'>
              <div className='form-floating mb-3'>
                <img
                  className='rounded mx-auto d-block rounded-circle'
                  style={{ width: '40%' }}
                  src={imagemLogo}
                  alt='imagem login'
                />

                <h5 className='card-title text-center my-4 mb-4 fs-5'>
                  Lista de Compras
                </h5>

                <form
                  onSubmit={(evento) => {
                    evento.preventDefault();
                    formik.handleSubmit(evento);
                  }}>
                  <div className='form-outline'>
                    <label
                      className='form-label'
                      htmlFor='email floatingInput'></label>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      className='form-control form-control-lg'
                      placeholder='Email'
                      onKeyDown={somenteEmail}
                      onChange={(evento) => {
                        somenteEmail(evento);
                        formik.handleChange(evento);
                      }}
                    />
                    {formik.errors.email && (
                      <div className='alert alert-warning d-flex align-items-center is-invalid'>
                        <RiAlertFill className='me-2' />
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                  <div className='form-outline mb-4'>
                    <label className='form-label' htmlFor='cpf'></label>
                    <input
                      id='cpf'
                      name='cpf'
                      type='text'
                      className='form-control form-control-lg'
                      placeholder='CPF'
                      maxLength={11}
                      value={cpf}
                      onChange={(evento) => {
                        somenteNumeros(evento);
                        formik.handleChange(evento);
                      }}
                    />
                    {formik.errors.cpf && (
                      <div className='alert alert-warning d-flex align-items-center is-invalid'>
                        <RiAlertFill className='me-2' />
                        {formik.errors.cpf}
                      </div>
                    )}
                  </div>

                  <button
                    className='w-100 btn btn-lg btn-primary'
                    type='submit'
                    onClick={salvarDados}>
                    Entrar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
