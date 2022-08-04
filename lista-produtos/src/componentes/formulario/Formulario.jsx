import React, { useState } from 'react';
import MD5 from 'crypto-js/md5';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './Formulario.module.css';

const Formulario = () => {
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');

  /* Função para deixar o input CPF formatado com números */
  const somenteNumeros = (evento) => {
    const input = evento.target.value.replace(/\D/g, '');
    setCPF(input);
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
    cpf: yup.string().max(11).required('Preencha o CPF'),
  });

  const formik = useFormik({
    validationSchema: esquema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: '',
      cpf: '',
    },

    onSubmit: (values) => {
      return <div>teste</div>;
    },
  });

  return (
    <div>
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          formik.handleSubmit(evento);
        }}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          onChange={(evento) => {
            setEmail(evento.target.value);
            formik.handleChange(evento);
          }}
        />
        {formik.errors.email && <div>{formik.errors.email}</div>}

        <label htmlFor='cpf'>CPF</label>
        <input
          id='cpf'
          name='cpf'
          type='text'
          placeholder='CPF'
          maxLength={11}
          value={cpf}
          onChange={(evento) => {
            setCPF(evento.target.value);
            somenteNumeros(evento);
            formik.handleChange(evento);
          }}
        />
        {formik.errors.cpf && <div>{formik.errors.cpf}</div>}

        <button type='submit' onClick={salvarDados}>
          Entrar
        </button>
      </form>

      <h3>
        {email} - {cpf} - {MD5(email + cpf).toString()}
      </h3>
    </div>
  );
};

export default Formulario;