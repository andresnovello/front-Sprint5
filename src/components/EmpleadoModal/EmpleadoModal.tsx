import { toast } from "react-toastify";
import EmpleadoService from "../../services/EmpleadoService";

import { ModalType } from "../../types/ModalType/ModalType";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import Empleado from "../../types/Empleado";

type EmpleadoModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    emp: Empleado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmpleadoModal = ({ show, onHide, title, modalType, emp, refreshData }: EmpleadoModalProps) => {
    const handleSaveUpdate = async (em: Empleado) => {
        try {
            const isNew = em.id === 0;
            if (isNew) {
                await EmpleadoService.createEmpleado(em);
            } else {
                await EmpleadoService.updateEmpleado(em.id, em);
            }
            toast.success(isNew ? "Nuevo empleado añadido" : "Empleado actualizado", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Se ha producido un error');
        }
    };
    const handleDelete = async () => {
        try {
            await EmpleadoService.deleteEmpleado(emp.id);
            toast.success("Empleado eliminado correctamente", { position: "top-center", });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('Se ha producido un error');
        }
    };
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            nombre: Yup.string().required('Por favor ingrese el nombre'),
            apellido: Yup.string().required('Por favor ingrese el apellido'),
            telefono: Yup.string().required('Por favor ingrese un telefono'),
            email: Yup.string().required('Por favor ingrese el email'),
            usuario: Yup.string().required('Por favor ingrese el usuario'),
        });
    };
    const formik = useFormik({
        initialValues: emp,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Empleado) => handleSaveUpdate(obj),
    });
    return (
        <>
            {modalType === ModalType.DELETE ? (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>¿Está seguro que desea eliminar este empleado?<br />
                                <strong>{emp.nombre}</strong>?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="dark" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Eliminar empleado
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>
                                {/* Denominacion */}
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="nombre"
                                        type="string"
                                        value={formik.values.nombre || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.nombre}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* urlImagen */}
                                <Form.Group controlId="formApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        name="apellido"
                                        type="string"
                                        value={formik.values.apellido || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.apellido}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* Telefono */}
                                <Form.Group controlId="formTelefono">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        name="telefono"
                                        type="string"
                                        value={formik.values.telefono || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.telefono}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                {/* Email */}
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="string"
                                        value={formik.values.email || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.email && formik.touched.email)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Modal.Footer className="mt-4">
                                    <Button variant="dark" onClick={onHide}>
                                        Cancelar
                                    </Button>
                                    <Button variant="warning" type="submit" disabled={!formik.isValid}>
                                        Guardar
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    )
}
export default EmpleadoModal;