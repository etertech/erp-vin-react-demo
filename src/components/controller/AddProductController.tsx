import React, {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../../config';
import { User } from '../entity/User';
import AddProductView from '../view/AddProductView';
import { Product } from '../entity/Product';
import { Category} from '../entity/Category';
import { Warehouse } from '../entity/Warehouse';
import { ProductUnit } from '../entity/ProductUnit';



interface AddProductControllerProps {
  user: User | null;
  onProductAdded?: (addProductRequest: Product) => void;
}




const AddProductController: React.FC<AddProductControllerProps> = (props) => {
  const backUrl = `${config.apiUrl}/product`
  const [categories, setCategories] = useState<Category[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [productUnits, setProductUnits] = useState<ProductUnit[]>([]);

  useEffect(() => {
    axios.get(`${backUrl}/getCategories`)
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the categories!', error);
      });
  
    axios.get(`${backUrl}/getWarehouses`)
      .then(response => {
        setWarehouses(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the warehouses!', error);
      });

      axios.get(`${backUrl}/getProductUnits`)
      .then(response => {
        setProductUnits(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the productUnits!', error);
      });

  }, []);
  
  
  const addProduct = async (product: Product, productPhotos: File[] | null) => {
    const formData = new FormData();
  
    formData.append('productName', product.productName);
    formData.append('price', product.price.toString());
    formData.append('productUnitId', product.productUnit_id.toString());
    formData.append('soldQuantity', product.soldQuantity.toString());
    formData.append('description', product.description);
    formData.append('stock', product.stock.toString());
    formData.append('year', product.year.toString());
    formData.append('categoryId', product.category_id.toString());
    formData.append('warehouseId', product.warehouse_id.toString());

    if (productPhotos) {
      Array.from(productPhotos).forEach((photo) => {
        formData.append('productPhotos', photo);
      });
    }
  
    try {
      const response = await axios.post(`${backUrl}/addProduct`, formData, {
        headers: {
          'Authorization': `${props.user?.tokenType}${props.user?.token}`,
        }
      });
      if (props.onProductAdded) {
        props.onProductAdded(response.data);
      }
    } catch (error) {
      console.error('An error occurred while adding the product:', error);
    }
  };
  
  
  return <AddProductView addProduct={addProduct} categories= {categories} warehouses= {warehouses} 
  productUnits = {productUnits}/>;
};

export default AddProductController;
