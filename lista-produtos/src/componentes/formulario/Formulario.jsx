import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import styles from './Formulario.module.css';

const validacao = Yup.object().shape({
  email: Yup.string()
    .email('Informe um email válido!')
    .required('O Email é obrigatório'),
  cpf: Yup.string()
    .max(11, 'O CPF deve ter 11 dígitos')
    .cpf('Informe um CPF válido!')
    .required('O CPF é obrigatório'),
});

const Formulario = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      cpf: '',
    },
    validationSchema: { validacao },
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

export default Formulario;
