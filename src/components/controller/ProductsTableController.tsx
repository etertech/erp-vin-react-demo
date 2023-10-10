import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import { Product } from '../entity/Product';
import ProductsTableView from '../view/ProductsTableView';
import { Button } from 'react-bootstrap';
import { Category } from '../entity/Category';
import { Warehouse } from '../entity/Warehouse';
import { ProductUnit } from '../entity/ProductUnit';
import CartView from '../view/CartView';

interface ProductsTableControllerProps {
  formType?: string;
}



const ProductsTableController: React.FC <ProductsTableControllerProps>= ({formType ="ProductsTable"}) => {
  const backUrl = `${config.apiUrl}/product`;
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [productUnits, setProductUnits] = useState<ProductUnit[]>([]);
  const [cart, setCart] = useState<Product[]>([]);


  useEffect(() => {

    axios.get(`${backUrl}/getProducts`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the products!', error);
      });

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
  

  const filteredProducts = products.filter(product => {
    return (
      (!filters.productName || 
        product.productName.toLowerCase().includes(filters.productName.toLowerCase())) &&
      (!filters.year || product.year.toString().startsWith(filters.year)) &&
      (!filters.categoryName||filters.categoryName ===""|| product.categoryName === filters.categoryName) &&
      (!filters.warehouseName||filters.warehouseName===""|| product.warehouseName === filters.warehouseName) &&
      (!filters.productUnitName|| filters.productUnitName ===""|| product.productUnitName === filters.productUnitName) 
      // ... autres filtres
    );
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
 {formType === 'OrderClient' ? (
  <CartView
    products={cart}
    setProducts={setCart}
    formType={formType}
    cart={cart}
    setCart={setCart}
  />
) : null} 

        <div className="filter-bar">
        <input
          type="text"
          placeholder="Nom du produit"
          value={filters.productName}
          onChange={e => setFilters({ ...filters, productName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Année"
          value={filters.year}
          onChange={e => setFilters({ ...filters, year: e.target.value })}
        />
      
      <select
          value={filters.categoryName}
          onChange={e => setFilters({ ...filters, categoryName: e.target.value })}
        >
          <option value ="">Sélectionner une catégorie</option>
          {categories.map((category, index) => <option key={index} value={category.name}>{category.name}</option>)}
        </select>

        <select
          value={filters.warehouseName}
          onChange={e => setFilters({ ...filters, warehouseName: e.target.value })}
        >
            <option value="">Sélectionner une entrepôt</option>
          {warehouses.map((warehouse, index) => <option key={index} value={warehouse.name}>{warehouse.name}</option>)}
        </select>

        <select
          value={filters.productUnitName}
          onChange={e => setFilters({ ...filters, productUnitName: e.target.value })}
        >
       
       <option value="">Sélectionner un unité de produit</option>
          {productUnits.map((unit, index) => <option key={index} value={unit.name}>{unit.name}</option>)}
        </select>

        <Button variant="primary" onClick={resetFilters}>Réinitialiser</Button>
        {/* ... autres champs de filtre */}
      </div>
      <ProductsTableView products={filteredProducts} setProducts = {setProducts} formType={formType}
      cart={cart} setCart = {setCart}
      />
    </>
  
  )

}

export default ProductsTableController;
