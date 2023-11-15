import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';

import Product from '../../../types/Producto';

type DeleteProductModalProps = {
  onDelete: () => void;
  onHide: () => void;
  product: Product | null;
  show: boolean;
};


const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ onDelete, onHide, product, show }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Eliminar Producto</Modal.Title>
    </Modal.Header>
    <Modal.Body>Esta seguro de querer eliminar el siguiente producto: <strong>{product?.denominacion}</strong>?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cerrar
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Eliminar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteProductModal;