// Archivo princiṕal de configuración, esta sobre el layout
import App from 'next/app';
import firebase, { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

const MyApp = (props) => {
    const usuario = useAutenticacion();

    const { Component, pageProps } = props;

    return (
        <FirebaseContext.Provider
            value={{
                firebase,
                usuario, //Esta informacion estara disponible para toda la app
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    );
};

export default MyApp;
