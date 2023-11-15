export interface Producto{
    id: number;
    denominacion: string;
    descripcion: string;
    tiempoEstimadoCocina: number;
    precioVenta: number;
    precioCosto: number;
    urlImagen: string;
}

export default Producto;