import Empleado from "../types/Empleado";


const BASE_URL = "http://localhost:8080";

const EmpleadoService = {

    getEmpleados: async (): Promise<Empleado[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/empleados`, {
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




    getEmpleado: async (id: number): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}/api/v1/empleados/${id}`);
        const data = await response.json();
        return data;
    },
    createEmpleado: async (empleado: Empleado): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}api/v1/empleados`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
        return data;
    },
    updateEmpleado: async (id: number, empleado: Empleado): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}/api/v1/empleados/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
        return data;
    },
    deleteEmpleado: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/empleados/${id}`, {
            method: "DELETE"
        });
    }
}

export default EmpleadoService;