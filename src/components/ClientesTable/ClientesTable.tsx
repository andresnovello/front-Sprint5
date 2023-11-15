import { useEffect, useState } from "react"
import { Cliente } from "../../types/Cliente"
import Button from 'react-bootstrap/Button';
import ClienteService from "../../services/ClienteService";
import { ModalType } from "../../types/ModalType/ModalType";
import Loader from "../Loader/Loader";
import { Table } from "react-bootstrap";
import EditButton from "../EditButton/EditButton";
import DeleteButton from "../DeleteButton/DeleteButton";
import ClienteModal from "../ClienteModal/ClienteModal";

const TablaClientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    useEffect(() => {
        const fetchClientes = async () => {
            const clientes = await ClienteService.getClientes();
            setClientes(clientes);
            setIsLoading(false);
        };
        fetchClientes();
    }, [refreshData]);
    console.log(JSON.stringify(clientes, null, 2));
    const initializeNewClient = (): Cliente => {
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
    const [cliente, setCliente] = useState<Cliente>(initializeNewClient);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");
    const handleClick = (newTitle: string, cli: Cliente, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setCliente(cli);
        setShowModal(true);
    };
    return (
        <>
            <Button variant="dark" style={{ float: 'right', margin: "1rem" }} onClick={() => handleClick("Nuevo cliente", initializeNewClient(), ModalType.CREATE)}>
                Añadir cliente
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
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.email}</td>
                                <td><EditButton onClick={() => handleClick("Editar cliente", cliente, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Eliminar cliente", cliente, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal && (
                <ClienteModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    cli={cliente}
                    refreshData={setRefreshData}
                />
            )}
        </>
    )
}
export default TablaClientes;