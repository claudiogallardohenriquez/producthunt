import React, { useState } from 'react';
import { css } from '@emotion/core';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import {
    Formulario,
    Campo,
    InputSubmit,
    Error,
} from '../components/ui/Formulario';

import firebase from '../firebase';

// validaciones
import useValidacion from '../hooks/useValidacion';
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INCIAL = {
    email: '',
    password: '',
};

const Login = () => {
    const [error, guardarError] = useState(false);

    const {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleblur,
    } = useValidacion(STATE_INCIAL, validarIniciarSesion, iniciarSesión);

    const { email, password } = valores;

    async function iniciarSesión() {
        console.log('Iniciando Sesión...');
        try {
            await firebase.login(email, password);
            console.log(usuario);

            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al crear el usuario', error.message);
            guardarError(error.message);
        }
    }

    return (
        <div>
            <Layout>
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >
                        Iniciar Sesión
                    </h1>
                    <Formulario onSubmit={handleSubmit} noValidate>
                        <Campo>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Tu email"
                                value={email}
                                onChange={handleChange}
                                onBlur={handleblur}
                            />
                        </Campo>
                        {errores.email && <Error>{errores.email}</Error>}
                        <Campo>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Tu password"
                                value={password}
                                onChange={handleChange}
                                onBlur={handleblur}
                            />
                        </Campo>
                        {errores.password && <Error>{errores.password}</Error>}
                        {error && <Error>{error}</Error>}
                        <InputSubmit type="submit" value="Iniciar Sesión" />
                    </Formulario>
                </>
            </Layout>
        </div>
    );
};

export default Login;
