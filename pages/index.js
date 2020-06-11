import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import DetalleProducto from '../components/layout/DetalleProducto';
import { FirebaseContext } from '../firebase';

const Home = () => {
    const [productos, guardarProductos] = useState([]);
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerProductos = () => {
            // hacer la consulta a la base de datos
            firebase.db
                .collection('productos')
                .orderBy('creado', 'desc')
                .onSnapshot(manejarSnapshot);
        };
        obtenerProductos();
    }, []);

    function manejarSnapshot(snapshot) {
        const productos = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });
        guardarProductos(productos);
    }

    return (
        <div>
            <Layout>
                <div className="listado-productos">
                    <div className="contenedor">
                        <ul className="bg-white">
                            {productos.map((producto) => (
                                <DetalleProducto
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default Home;
