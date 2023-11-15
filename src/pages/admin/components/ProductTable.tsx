import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import  Producto  from "../../../types/Producto";
import DataLayer from '../../../lib/data-layer';

const DeleteProductModal = React.lazy(() => import('./DeleteProductModal'));
const SaveProductModal = React.lazy(() => import('./SaveProductModal'));

type ProductsTableProps = {
  products: Producto[];
};

const emptyProduct: Producto = {
  id: 0,
  denominacion: "",
  descripcion: "",
  tiempoEstimadoCocina: 0,
  precioVenta: 0,
  precioCosto: 0,
  urlImagen: "",
};

const ProductTable: React.FC<ProductsTableProps> = ({ products }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedProducts, setListedProducts] = React.useState<Producto[]>(products);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Producto | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedProduct) {
      setShowDeleteModal(false);
      setLoading(true);
      DataLayer.delete.product(selectedProduct.id!)
        .then(() => setListedProducts((prevState: Producto[]) => prevState.filter((item: Producto) => item.id !== selectedProduct.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedProduct, setShowDeleteModal, setListedProducts, setLoading]);
  const onSave = React.useCallback((p: Producto) => {
    if (selectedProduct) {
      setShowSaveModal(false);
      setLoading(true);
      if (p.id) {
        DataLayer.update.product(p)
          .then((editedProduct: Producto) => setListedProducts((prevState: Producto[]) => prevState.map((item: Producto) => item.id === editedProduct.id ? editedProduct : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        // Delete id property since it is a create action
        delete p.id;

        DataLayer.create.product(p)
          .then((createdProduct: Producto) => {
            setListedProducts((prevState: Producto[]) => [...prevState, createdProduct]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedProduct, setShowSaveModal, setListedProducts, setLoading]);
  const onShowDeleteModal = React.useCallback((p: Producto) => {
    setSelectedProduct(p);
    setShowDeleteModal(true);
  }, [setSelectedProduct, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((p?: Producto) => {
    setSelectedProduct(p ?? emptyProduct);
    setShowSaveModal(true);
  }, [setSelectedProduct, setShowSaveModal])

  // Render
  if (error) {
    return (
      <Alert variant="peligro">
        {error?.message || 'Algo inesperado ocurrio durante la busqueda :c .'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <>
              <Button onClick={() => onShowSaveModal()} style={{ float: 'right', margin: 10 }} variant="primary">Create Product</Button>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Denominacion</th>
                    <th>Descripcion</th>
                    <th>Tiempo Estimado de Cocina</th>
                    <th>Precio Venta</th>
                    <th>Costo</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                id: 0,
                  {
                    listedProducts.map((p: Producto) => (
                      <tr key={p.id}>
                        <td width='2%'>{p.id}</td>
                        <td width='23%'>{p.denominacion}</td>
                        <td width='45%'>{p.descripcion}</td>
                        <td width='10%'>{p.tiempoEstimadoCocina}</td>
                        <td width='5%'>{p.precioVenta}</td>
                        <td width='5%'>{p.precioCosto}</td>
                        <td width='5%'><img alt={p.denominacion} src={p.urlImagen} style={{ height: '250px', maxWidth: '250px', margin: '0.5rem' }} /></td>
                        <td width='10%'>
                          <Button onClick={() => onShowSaveModal(p)} variant="link">Editar</Button>
                          <Button onClick={() => onShowDeleteModal(p)} variant="link">Eliminar</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
      }
      <DeleteProductModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        product={selectedProduct}
        show={showDeleteModal}
      />
      <SaveProductModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        product={selectedProduct}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default ProductTable;