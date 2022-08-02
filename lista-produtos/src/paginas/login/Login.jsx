import React, { useState } from 'react';
import { useFormik } from 'formik';
import styles from './Login.module.css';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      cpf: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input
        id='email'
        name='email'
        type='email'
        placeholder='Email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label htmlFor='cpf'>CPF</label>
      <input
        id='cpf'
        name='cpf'
        type='text'
        placeholder='CPF'
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <button type='submit'>Entrar</button>
    </form>
  );
};

export default Login;
