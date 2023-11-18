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



    /*
    getEmpleado: async (id: number): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}/api/v1/empleados/${id}`);
        const data = await response.json();
        return data;
    },
    */

    getEmpleado: async (id: number): Promise<Empleado[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/empleados/${id}`, {
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

    /*
    createEmpleado: async (empleado: Empleado): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}api/v1/empleados`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
        return data;
    },
    */

    
    createEmpleado: async (empleado: Empleado): Promise<Empleado[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/empleados`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(empleado)
            });
    
            if (!response.ok) {
                throw new Error('Error al crear empleado');
            }
    
            const data = await response.json();
            console.log('Empleado creado:', data);
    
            return data;
    
        } catch (error) {
            console.error('Error al crear empleado');
            throw error;
        }
    },

    
    /*
    updateEmpleado: async (id: number, empleado: Empleado): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}/api/v1/empleados/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
        return data;
    },
    */

    updateEmpleado: async (id: number, empleado: Empleado): Promise<Empleado[]> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/empleados/modificarEmpleado/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(empleado)
            });
    
            if (!response.ok) {
                throw new Error('Error al modificar empleado');
            }
    
            const data = await response.json();
            console.log('Empleado modificado:', data);
    
            return data;
    
        } catch (error) {
            //console.error('Error al modificar empleado');
            console.log('Error al modificar empleado');
            throw error;
        }
    },


    /*
    deleteEmpleado: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/empleados/${id}`, {
            method: "DELETE"
        });
    }
    */

    deleteEmpleado: async (id: number): Promise<void> => {

        try {
            // Recuperar el token del localStorage
            const token = localStorage.getItem('token');
    
            const response = await fetch(`${BASE_URL}/api/v1/empleados/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            console.log('Respuesta del servidor:', response);


            if (response.status === 204) {
                console.log('Empleado eliminado correctamente');
                //return;
            } else {
                const data = await response.json();
                console.log('Empleado eliminado:', data);
            }


            if (!response.ok) {
                throw new Error('Error al eliminar empleado');
            }
        
        


        } catch (error) {
            console.log('Error al eliminar empleado', error);
            throw error;
        }
    }
}

export default EmpleadoService;