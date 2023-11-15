import  Producto  from "../types/Producto";

const API_BASE_URL: string = 'https://fakestoreapi.com/products';

const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: Producto): Promise<any> => {
  const options: any = { headers: { 'Content-Type': 'application/json' }, method };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
  const data = await response.json();

  return data;
};

const fnCreateProduct = async (product: Producto) => fetchApiCall('POST', undefined, product);
const fnDeleteProduct = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchProducts = async () => fetchApiCall('GET');
const fnUpdateProduct = async (product: Producto) => fetchApiCall('PUT', product.id, product);

type DataLayer = {
  create: {
    product: typeof fnCreateProduct,
  },
  delete: {
    product: typeof fnDeleteProduct,
  },
  fetch: {
    products: typeof fnFetchProducts,
  },
  update: {
    product: typeof fnUpdateProduct,
  }
};

const DataLayer: DataLayer = {
  create: {
    product: fnCreateProduct,
  },
  delete: {
    product: fnDeleteProduct,
  },
  fetch: {
    products: fnFetchProducts,
  },
  update: {
    product: fnUpdateProduct,
  }
};

export default DataLayer;
