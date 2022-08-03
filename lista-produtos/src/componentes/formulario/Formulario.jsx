import React, { useEffect, useRef, useState } from 'react';
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
    localStorage.setItem('criptografia', MD5(email + cpf).toString());
  }

  return (
    <div>
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
        }}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          onChange={(evento) => setEmail(evento.target.value)}
        />

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
          }}
        />
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
