import React from 'react';
import axios from 'axios';
import config from '../../config';
import { User } from '../entity/User';
import { Supplier } from '../entity/Supplier';
import AddSupplierView from '../view/AddSupplierView';


interface AddSupplierControllerProps {
  user: User | null;
  onSupplierAdded?: (supplier: Supplier) => void;
}

const AddSupplierController: React.FC<AddSupplierControllerProps> = (props) => {
  const backUrl = `${config.apiUrl}/supplier`
  
  const addSupplier = async (supplier: Supplier) => {
    try {
      const response = await axios.post(`${backUrl}/addSupplier`, supplier,
        {
          headers:{
            'Authorization': `${props.user?.tokenType}${props.user?.token}`,
          }
        }
      );
      if (props.onSupplierAdded) {
        props.onSupplierAdded(response.data);
      }
    } catch (error) {
      console.error('An error occurred while adding the supplier:', error);
    }
  };

  return <AddSupplierView addSupplier={addSupplier} />;
};

export default AddSupplierController;