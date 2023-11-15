import { useEffect, useState } from "react"
import { Empleado } from "../../types/Empleado"
import Button from 'react-bootstrap/Button';
import EmpleadoService from "../../services/EmpleadoService";
import { ModalType } from "../../types/ModalType/ModalType";
import Loader from "../Loader/Loader";
import { Table } from "react-bootstrap";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import EmpleadoModal from "../EmpleadoModal/EmpleadoModal";

const TablaEmpleados = () => {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    useEffect(() => {
        const fetchEmpleados = async () => {
            const empleados = await EmpleadoService.getEmpleados();
            setEmpleados(empleados);
            setIsLoading(false);
        };
        fetchEmpleados();
    }, [refreshData]);
    console.log(JSON.stringify(empleados, null, 2));
    const initializeNewEmpleado = (): Empleado => {
        return {
            id: 0,
            nombre: "",
            apellido: "",
            telefono: "",
            email: "",
            eliminado: false,
            usuario: "",
        };
    };
    const [empleado, setEmpleado] = useState<Empleado>(initializeNewEmpleado);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");
    const handleClick = (newTitle: string, emp: Empleado, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setEmpleado(emp);
        setShowModal(true);
    };
    return (
        <>
            <Button variant="dark" style={{ float: 'right', margin: "1rem" }} onClick={() => handleClick("Nuevo Empleado", initializeNewEmpleado(), ModalType.CREATE)}>
                Añadir empleado
            </Button>
            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nombre</th>
                            <th>apellido</th>
                            <th>telefono</th>
                            <th>email</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map(empleado => (
                            <tr key={empleado.id}>
                                <td>{empleado.id}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.telefono}</td>
                                <td>{empleado.email}</td>
                                <td><EditButton onClick={() => handleClick("Editar empleado", empleado, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Eliminar empleado", empleado, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal && (
                <EmpleadoModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    emp={empleado}
                    refreshData={setRefreshData}
                />
            )}
        </>
    )
}
export default TablaEmpleados;