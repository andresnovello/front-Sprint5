import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import { Producto } from '../../../types/Producto';

type DeleteProductModalProps = {
  onHide: () => void;
  onSave: (p: Producto) => void;
  product: Producto | null;
  show: boolean;
};

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ onSave, onHide, product, show }) => {
  // State
  const [validated, setValidated] = React.useState<boolean>(false);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    const data = Object.fromEntries(new FormData(form));
    onSave({ ...product!, ...data });
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{product?.id === 0 ? 'Create' : 'Edit'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Denominacion</Form.Label>
              <Form.Control
                defaultValue={product?.denominacion}
                name="denominacion"
                placeholder="denominacion"
                required
                type="text"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Precio Venta</Form.Label>
              <Form.Control
                defaultValue={product?.precioVenta}
                name="PrecioVenta"
                placeholder="PrecioVenta"
                required
                type="number"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Costo</Form.Label>
              <Form.Control
                defaultValue={product?.precioCosto}
                name="costo"
                placeholder="Costo"
                required
                type="number"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                defaultValue={product?.descripcion}
                name="descripcion"
                placeholder="descripcion"
                required
                type="text"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Tiempo Estimado Cocina</Form.Label>
              <Form.Control
                defaultValue={product?.tiempoEstimadoCocina}
                name="tiempoEstimadoCocina"
                placeholder="tiempoEstimadoCocina"
                required
                type="text"
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                defaultValue={product?.urlImagen}
                name="imagen"
                placeholder="imagen"
                required
                type="text"
              />
            </Form.Group>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default DeleteProductModal;
