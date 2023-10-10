import React from 'react';
import AddUserView from "../view/AddUserView"
import { User } from '../entity/User';
import config from '../../config' 

interface AddUserRequest {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  birthday: string;
  roles: { name: string }[];
  enabled: boolean
}




interface AddUserControllerProps {
  user: User | null;
  onUserAdded?: (addUserRequest: AddUserRequest) => void;
}

const AddUserController: React.FC<AddUserControllerProps> = (props) => {
  //const backUrl = 'http://localhost:8089/api/user';
  const backUrl = `${config.apiUrl}/user`



  const { user } = props;



  const addUser = async (addUserRequest: AddUserRequest) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,
                 'Authorization': `${props.user?.tokenType}${props.user?.token}` },
      body: JSON.stringify(addUserRequest),
    };

    console.log(addUserRequest)
    console.log(requestOptions)

    try {
      const response = await fetch(`${backUrl}/addUser`, requestOptions);
      const json = await response.json();
  

      if (props.onUserAdded) {
        props.onUserAdded(json);
      }
    } catch (error) {
      console.error('An error occurred while adding the user:', error);
    }
  };

  return <AddUserView addUser={addUser}  user = {user} />;
};

export default AddUserController;