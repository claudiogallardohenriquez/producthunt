/*

HOOK Personalizado para validar formularios

*/

import React, { useState, useEffect } from 'react';

/*
    param1: el state inicial
    param2: lo que se va a validar, tendra las reglas de validacion
    param3: la función que se va a ejecutar cuando se haga el submit

*/

const useValidacion = (stateInicial, validar, fn) => {
    const [valores, guardarValores] = useState(stateInicial);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0; //significa que el objeto esta vacio

            if (noErrores) {
                fn(); // FN = funcion que se ejecuta en el componente
            }
            guardarSubmitForm(false); // Reinicia el formulario
        }
    }, [errores]);

    // funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = (e) => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value,
        });
    };

    // funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    };

    // cuando se realiza el evento de blur
    const handleblur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    };

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleblur,
    };
};

export default useValidacion;
