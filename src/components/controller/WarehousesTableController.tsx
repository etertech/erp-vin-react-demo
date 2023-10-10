import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Product } from '../entity/Product';
import { User } from '../entity/User';
import CategoriesTableView from '../view/CategoriesTableView';
import { Button } from 'react-bootstrap';
import { Warehouse } from '../entity/Warehouse';
import { ProductUnit } from '../entity/ProductUnit';
import CartView from '../view/CartView';
import WarehousesTableView from '../view/WarehousesTableViev';

interface WarehousesTableControllerProps {
  formType?: string;
}



const WarehousesTableController: React.FC <WarehousesTableControllerProps>= ({formType ="ProductsTable"}) => {
  const backUrl = `${config.apiUrl}/warehouse`;
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);


  useEffect(() => {

    axios.get(`${backUrl}/getWarehouses`)
      .then(response => {
        setWarehouses(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the warehouses!', error);
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
     
      <WarehousesTableView warehouses={warehouses} setWarehouses = {setWarehouses} formType={formType}
      />
    </>
  
  )

}

export default WarehousesTableController;
