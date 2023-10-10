import React, { useState} from "react";
import axios from 'axios';
import config from '../../config';
import { User } from '../entity/User';
import AddClientView from '../view/AddClientView';
import { Client } from '../entity/Client';



interface AddClientControllerProps {
  user: User | null;
  onClientAdded?: (client: Client) => void;
}


const AddClientController: React.FC<AddClientControllerProps> = (props) => {
  const [addStatus, setAddStatus] = useState<'success'|'failure'|null>(null);
  const backUrl = `${config.apiUrl}/client`

  
  const addClient = async (client: Client) => {
    try {
      const response = await axios.post(`${backUrl}/addClient`, client,
        {
          headers:{
            'Authorization': `${props.user?.tokenType}${props.user?.token}`,
          }
        }
      );
      if (props.onClientAdded) {
        props.onClientAdded(response.data);
      }
      setAddStatus('success');
    } catch (error) {
      console.error('An error occurred while adding the client:', error);
      setAddStatus('failure');
    }
  };

  return <AddClientView addClient={addClient} />;
};

export default AddClientController;