import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Product } from '../entity/Product';
import { User } from '../entity/User';
import CategoriesTableView from '../view/CategoriesTableView';
import { Button } from 'react-bootstrap';
import { Category } from '../entity/Category';
import { Warehouse } from '../entity/Warehouse';
import { ProductUnit } from '../entity/ProductUnit';
import CartView from '../view/CartView';

interface CategoriesTableControllerProps {
  formType?: string;
}



const CategoriesTableController: React.FC <CategoriesTableControllerProps>= ({formType ="ProductsTable"}) => {
  const backUrl = `${config.apiUrl}/category`;
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {

    axios.get(`${backUrl}/getCategories`)
      .then(response => {
        setCategories(response.data);
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
     
      <CategoriesTableView categories={categories} setCategories = {setCategories} formType={formType}
      />
    </>
  
  )

}

export default CategoriesTableController;
