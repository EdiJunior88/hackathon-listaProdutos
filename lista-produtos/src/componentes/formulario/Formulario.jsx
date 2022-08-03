import React, { useEffect, useRef, useState } from 'react';
import MD5 from 'crypto-js/md5';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './Formulario.module.css';

const Formulario = () => {
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [criptografado, setCriptografado] = useState('');

  /* Função para deixar o input CPF somente com números */
  const somenteNumeros = (evento) => {
    const input = evento.target.value.replace(/\D/g, '');
    setCPF(input);
  };

  /* Função que criptografa o valor do input CPF e transformando em string */
  function cpfCriptografado() {
    setCriptografado(MD5(cpf).toString());
  }

  function salvarDados() {
    localStorage.setItem('email', JSON.stringify(email));
    localStorage.setItem('cpf', JSON.stringify(criptografado));
  }

  console.log(email + cpf);

  return (
    <div>
      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          cpfCriptografado();
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
        {email}-{cpf}-{criptografado}
      </h3>
    </div>
  );
};

export default Formulario;
