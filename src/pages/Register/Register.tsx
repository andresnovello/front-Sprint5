import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { AuthService } from '../../services/AuthService';

import { toast } from 'react-toastify';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);

    const validationSchema = yup.object().shape({
        username: yup.string().required('Username es requerido'),
        password: yup.string().required('Password es requerido'),
        apellido: yup.string().required('Apellido es requerido'),
        nombre: yup.string().required('Nombre es requerido'),
        telefono: yup.string().required('Teléfono es requerido'),
        email: yup.string().email('Email no válido').required('Email es requerido'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            apellido: '',
            nombre: '',
            telefono: '',
            email: '',
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
            try {
              const token = await AuthService.register(values);
              console.log("Registro exitoso. Token:", token);
              navigate('/');
              toast.success('Registro exitoso');
            } catch (error) {
              console.error("Error al iniciar sesión:");
              
            }
          },
    });
    
    

    const handleHide = () => {
        setShow(false);

    };

    return (

        <Modal show={show} onHide={handleHide} centered backdrop="static" className="modal-xl">
            <Modal.Header closeButton>
                <Modal.Title>Registrarse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    {/* Form.Group para cada campo para dar de alta o modificar un producto */}
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            type="text"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.username && formik.touched.username)}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.password && formik.touched.password)}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            name="apellido"
                            type="text"
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.apellido}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="nombre"
                            type="text"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formTelefono">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                            name="telefono"
                            type="text"
                            value={formik.values.telefono}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.telefono}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            type="text"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.email && formik.touched.email)}
                        />
                        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                    </Form.Group>


                    <Modal.Footer className="mt-4">
                        <Button variant="secondary" onClick={handleHide}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" disabled={!formik.isValid}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Register;
