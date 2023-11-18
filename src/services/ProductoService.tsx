
import Producto from "../types/Producto";

const BASE_URL = 'http://localhost:8080/';

export const ProductService = {

    getProductos: async (): Promise<Producto[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/productos`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Error al recuperar datos');
            }
    
            const data = await response.json();
            console.log('Datos recuperados:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al recuperar datos');
            throw error;
        }
    },


    getProducto: async (id: number): Promise<Producto[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/productos/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Error al recuperar dato');
            }
    
            const data = await response.json();
            console.log('Dato recuperado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al recuperar dato');
            throw error;
        }
    },


    createProducto: async (producto: Producto): Promise<Producto[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/productos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(producto)
            });
    
            if (!response.ok) {
                throw new Error('Error al crear producto');
            }
    
            const data = await response.json();
            console.log('Producto creado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al crear producto');
            throw error;
        }
    },


    updateProducto: async (id: number, producto: Producto): Promise<Producto[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/productos/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(producto)
            });
    
            if (!response.ok) {
                throw new Error('Error al modificar producto');
            }
    
            const data = await response.json();
            console.log('Producto modificado:', data);
    
            return data;
    
        } catch (error) {
            
            console.log('Error al modificar producto');
            throw error;
        }
    },


    deleteProducto: async (id: number): Promise<void> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/productos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log('Respuesta del servidor:', response);


            if (response.status === 204) {
                console.log('Producto eliminado correctamente');
                //return;
            } else {
                const data = await response.json();
                console.log('Producto eliminado:', data);
            }


            if (!response.ok) {
                throw new Error('Error al eliminar producto');
            }
        
        


        } catch (error) {
            console.log('Error al eliminar producto', error);
            throw error;
        }
    }

};
