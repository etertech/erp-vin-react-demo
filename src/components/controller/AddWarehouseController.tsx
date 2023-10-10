import React from 'react';
import axios from 'axios';
import config from '../../config';
import { User } from '../entity/User';
import AddWarehouseView from '../view/AddWarehouseView';

interface AddWarehouseRequest {
  name: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

interface AddWarehouseControllerProps {
  user: User | null;
  onWarehouseAdded?: (addWarehouseRequest: AddWarehouseRequest) => void;
}

const AddWarehouseController: React.FC<AddWarehouseControllerProps> = (props) => {
  const backUrl = `${config.apiUrl}/warehouse`
  
  const addWarehouse = async (addWarehouseRequest: AddWarehouseRequest) => {
    try {
      const response = await axios.post(`${backUrl}/addWarehouse`, addWarehouseRequest,
        {
          headers:{
            'Authorization': `${props.user?.tokenType}${props.user?.token}`,
          }
        }
      );
      if (props.onWarehouseAdded) {
        props.onWarehouseAdded(response.data);
      }
    } catch (error) {
      console.error('An error occurred while adding the warehouse:', error);
    }
  };

  return <AddWarehouseView addWarehouse={addWarehouse} />;
};

export default AddWarehouseController;
