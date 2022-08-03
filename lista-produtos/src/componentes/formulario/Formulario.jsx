import React, { useEffect, useState } from 'react';
import MD5 from 'crypto-js/md5';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './Formulario.module.css';

const Formulario = () => {
  const [email, setEmail] = useState('');
  const [cpf, setCPF] = useState('');
  const [criptografado, setCriptografado] = useState(null);
  const [valorCPF, setValorCPF] = useState('');

  // console.log(email, cpf);

  useEffect(() => {
    setCriptografado(MD5(cpf).toString());
  }, []);

  /* Função para deixar o input CPF somente com números */
  const somenteNumeros = (evento) => {
    const resultado = evento.target.value.replace(/\D/g, '');
    setValorCPF(resultado);
  };

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
          value={valorCPF}
          onChange={(evento) => {
            setCPF(evento.target.value);
            somenteNumeros(evento);
          }}
        />
        <button type='submit'>Entrar</button>
      </form>

      <h1>
        {email} - {criptografado}
      </h1>
    </div>
  );
};

export default Formulario;
