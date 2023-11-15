
import Producto from "../types/Producto";

const BASE_URL = 'http://localhost:8080/';

export const ProductService = {
    getProducts: async (): Promise<Producto[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/productos/`);
        const data = await response.json();
        return data;
    },

    getProduct: async (id: number): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/api/v1/productos/${id}`);
        const data = await response.json();
        return data;
    },

    createProduct: async (product: Producto): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/api/v1/productos/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        return data;
    },

    updateProduct: async (id: number, product: Producto): Promise<Producto> => {
        const response = await fetch(`${BASE_URL}/api/v1/productos/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const data = await response.json();
        return data;
    },

    deleteProduct: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/productos/${id}`, {
            method: "DELETE"
        });
    }

};
