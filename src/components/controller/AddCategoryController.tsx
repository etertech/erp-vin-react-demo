import React from 'react';
import AddCategoryView from '../view/AddCategoryView';
import axios from 'axios';
import config from '../../config';
import { User } from '../entity/User';

interface AddCategoryRequest {
  categoryName: string;
}

interface AddCategoryControllerProps {
  user: User | null;
  onCategoryAdded?:(addCategoryRequest: AddCategoryRequest) => void;
}

const AddCategoryController: React.FC<AddCategoryControllerProps> = (props) => {
  const backUrl = `${config.apiUrl}/category`
  const addCategory = async (addCategoryRequest:AddCategoryRequest) => {
    try {
      const response = await axios.post(`${backUrl}/addCategory`, addCategoryRequest,
      {
        headers:{
          'Authorization': `${props.user?.tokenType}${props.user?.token}`
        }
      }
      
      )
      if(props.onCategoryAdded){
        props.onCategoryAdded(response.data)
      }
    } catch(error) {
      console.error('An error occured while adding the category:',error)
    }
  }
  return <AddCategoryView addCategory= {addCategory} />

}


export default AddCategoryController;

