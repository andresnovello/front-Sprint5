import { useEffect, useState } from "react";
import { Producto } from "../../types/Producto";
import { ProductService } from "../../services/ProductoService";
import Loader from "../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../types/ModalType/ModalType";
import ProductModal from "../ProductoModal/ProductoModal";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { EditButton } from "../EditButton/EditButton";


const ProductTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [products, setProducts] = useState<Producto[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderize el componente o refreshData cambie de estado
    useEffect(() => {

        //Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchProducts = async () => { 
            const products = await ProductService.getProductos();
            setProducts(products);
            setIsLoading(false);
        };

        fetchProducts();

    }, [refreshData]);

    //Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(products, null, 2));


    //Se inicializa un producto vacio cuando vallamos a crear uno nuevo, para evitar "undefined"
    const initializeNewProduct = (): Producto => {
        return {
            id: 0,
            denominacion: '',
            descripcion: '',
            tiempoEstimadoCocina: 0,
            precioVenta: 0,
            precioCosto: 0,
            urlImagen: '',
        };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
    const [product, setProduct] = useState<Producto>(initializeNewProduct);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, prod: Producto, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setProduct(prod);
        setShowModal(true);
    };

    return (
        <>
            <Button onClick={() => handleClick("Nuevo Producto", initializeNewProduct(), ModalType.CREATE)}>
                Nuevo Producto
            </Button>

            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Denominacion</th>
                            <th>Descripcion</th>
                            <th>TiempoEstimadoCocina</th>
                            <th>precioVenta</th>
                            <th>precioCosto</th>
                            <th>urlImagen</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.denominacion}</td>
                                <td>{product.descripcion}</td>
                                <td>{product.tiempoEstimadoCocina}</td>
                                <td>{product.precioVenta}</td>
                                <td>{product.precioCosto}</td>
                                <td><img src={product.urlImagen} alt={product.denominacion} style={{ width: '50px' }} /></td>
                                <td><EditButton onClick={() => handleClick("Editar Producto", product, ModalType.UPDATE)} /></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar Producto", product, ModalType.DELETE)} /></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            )}


            {showModal && (
                <ProductModal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    title={title}
                    modalType={modalType}
                    prod={product}
                    refreshData={setRefreshData}
                />
            )}


        </>
    )

}

export default ProductTable;
