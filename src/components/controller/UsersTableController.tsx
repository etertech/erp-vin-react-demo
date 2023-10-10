import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Product } from '../entity/Product';
import { User } from '../entity/User';
import UsersTableView from '../view/UsersTableView';
import { Button } from 'react-bootstrap';
import { Category } from '../entity/Category';
import { Warehouse } from '../entity/Warehouse';
import { ProductUnit } from '../entity/ProductUnit';
import CartView from '../view/CartView';

interface ProductsTableControllerProps {
  formType?: string;
}



const UsersTableController: React.FC <ProductsTableControllerProps>= ({formType ="ProductsTable"}) => {
  const backUrl = `${config.apiUrl}/user`;
  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {

    axios.get(`${backUrl}/getUsers`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the products!', error);
      });

  }, []); 

  const [filters, setFilters] = useState<{
    productName: string;
    year: string;
    categoryName: string;
    warehouseName: string; // Ajouté
    productUnitName: string; // Ajouté
  }>({
    productName: '',
    year: '',
    categoryName: '',
    warehouseName: '', 
    productUnitName: '', 
  });
  


  const resetFilters = () => {
    setFilters({
      productName: '',
      year: '',
      categoryName: '',
      warehouseName: '', 
      productUnitName: '', 

      
      // ... autres filtres
    });
  };
  

  return (
    <>
     
      <UsersTableView users={users} setUsers = {setUsers} formType={formType}
      />
    </>
  
  )

}

export default UsersTableController;
