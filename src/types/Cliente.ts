export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    eliminado: boolean;
    usuario: string;
}
export default Cliente;