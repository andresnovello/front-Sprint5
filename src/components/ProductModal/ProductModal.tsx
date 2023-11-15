import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType/ModalType";
import { Producto } from "../../types/Producto";
//dependencias para validar formularios
import * as Yup from "yup";
import { useFormik } from "formik";
import { ProductService } from "../../services/ProductService";
//notificaciones
import { toast } from 'react-toastify';


type ProductModalProps = {
    show: boolean;
    onHide: () => void;
    title: string
    modalType: ModalType;
    prod: Producto;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};


const ProductModal = ({ show, onHide, title, prod, modalType, refreshData }: ProductModalProps) => {

    //CREATE - UPDATE
    const handleSaveUpdate = async (pro: Producto) => {
        try {
            const isNew = pro.id === 0;
            if (isNew) {
                await ProductService.createProduct(pro);

            } else {
                await ProductService.updateProduct(pro.id, pro);
            }
            toast.success(isNew ? "Producto Creado" : "Producto Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    };

    //DELETE
    const handleDelete = async () => {
        try {
            await ProductService.deleteProduct(prod.id);
            toast.success("Producto Borrado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    }



    //Yup
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('El titulo es requerido'),
            descripcion: Yup.string().required('La descripcion es requerida'),
            tiempoEstimadoCocina: Yup.number().min(0).required('El tiempo de cocina es requerido'),
            pricioVenta: Yup.number().min(0).required('El precio de venta es requerido'),
            pricioCosto: Yup.number().min(0).required('El precio de costo es requerido'),
            urlImagen: Yup.string().required('La URL de la imagen es requerida'),
        });
    };

    //Formik, utiliza el esquema de validación para crear un formulario dinámico y que lo bloquee
    //en caso de haber errores
    const formik = useFormik({
        initialValues: prod,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Producto) => handleSaveUpdate(obj),
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
                            <p>¿Está seguro que desea eliminar el Producto?<br /> <strong>{prod.denominacion}</strong>?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Borrar
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

                            {"Formulario"}
                            <Form onSubmit={formik.handleSubmit}>

                                {/*Debajo de la etiqueta Form, vamos a armar un <Form.Group> por cada uno de los campos para dar de alta o modificar un producto. */}

                                {/*"Denominacion"*/}
                                <Form.Group controlId="formDenominacion">
                                    <Form.Label>Denominacion</Form.Label>
                                    <Form.Control
                                        name="denominacion"
                                        type="text"
                                        value={formik.values.denominacion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.denominacion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"Descripcion"*/}
                                <Form.Group controlId="formDescripcion">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Form.Control
                                        name="descripcion"
                                        type="text"
                                        value={formik.values.descripcion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.descripcion && formik.touched.descripcion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.descripcion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"TiempoEstimadoCocina"*/}
                                <Form.Group controlId="formTiempoEstimadoCocina">
                                    <Form.Label>TiempoEstimadoCocina</Form.Label>
                                    <Form.Control
                                        name="tiempoEstimadoCocina"
                                        type="number"
                                        value={formik.values.tiempoEstimadoCocina || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.tiempoEstimadoCocina && formik.touched.tiempoEstimadoCocina)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.tiempoEstimadoCocina}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"PrecioVenta"*/}
                                <Form.Group controlId="formPrecioVenta">
                                    <Form.Label>PrecioVenta</Form.Label>
                                    <Form.Control
                                        name="precioVenta"
                                        type="number"
                                        value={formik.values.precioVenta || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioVenta && formik.touched.precioVenta)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioVenta}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"PrecioCosto"*/}
                                <Form.Group controlId="formPrecioCosto">
                                    <Form.Label>PrecioCosto</Form.Label>
                                    <Form.Control
                                        name="precioCosto"
                                        type="number"
                                        value={formik.values.precioVenta || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioCosto && formik.touched.precioCosto)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioCosto}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/*"urlImagen"*/}
                                <Form.Group controlId="formUrlImagen">
                                    <Form.Label>UrlImagen</Form.Label>
                                    <Form.Control
                                        name="urlImagen"
                                        type="text"
                                        value={formik.values.urlImagen || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.urlImagen && formik.touched.urlImagen)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.urlImagen}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Modal.Footer className="mt-4">
                                    <Button variant="secondary" onClick={onHide}>
                                        Cancelar
                                    </Button>

                                    <Button variant="primary" type="submit" disabled={!formik.isValid}>
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

export default ProductModal;
