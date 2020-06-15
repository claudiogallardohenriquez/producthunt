import Layout from '../components/layout/Layout';
import DetalleProducto from '../components/layout/DetalleProducto';
import useProductos from '../hooks/useProductos';

const Populares = () => {
    const { productos } = useProductos('votos');

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

export default Populares;
