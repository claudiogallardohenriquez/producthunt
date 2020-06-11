export default function validarNuevoProducto(valores) {
    let errores = {};

    // validar el nombre del usuario
    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio';
    }

    // validar empresa
    if (!valores.empresa) {
        errores.empresa = 'El nombre de empresa es obligatorio';
    }

    // validar url
    if (!valores.url) {
        errores.url = 'El url del producto es obligatoria';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = 'Url mal formateada o no valida';
    }

    // validar la descripcion
    if (!valores.descripcion) {
        errores.descripcion = 'Agrega una descripcion de tu producto';
    }

    return errores;
}
