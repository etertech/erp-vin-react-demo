import React, { useState } from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import { Product } from "../entity/Product";
import { Category } from "../entity/Category";
import { Warehouse } from "../entity/Warehouse";
import { ProductUnit } from "../entity/ProductUnit";

interface AddProductViewProps {
  addProduct: (product: Product , productPhotos: File[]| null) => void;
  categories: Category [];
  warehouses: Warehouse [];
  productUnits: ProductUnit[];
}

const AddProductView: React.FC<AddProductViewProps> = (props) => {
  const [fields, setFields] = useState<Product>({
    productName: "",
    price: 0,
    productUnit_id: 0,
    productUnitName:"",
    soldQuantity: 0,
    description: "",
    stock: 0,
    year: 0,
    warehouse_id: 0,
    warehouseName: "",
    category_id: 0,
    categoryName: "",

  });

  const [productPhotos, setProductPhotos] = useState<File[]>([]);

  return (
    <Row className="d-flex justify-content-center p-3 pt-5">
      <Card className="max-width-50-rem p-0">
        <Card.Header className="text-center">Ajouter un produit</Card.Header>
        <Form className="p-4">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Nom du produit</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Nom du produit"
                value={fields.productName}
                onChange={(e) => setFields({ ...fields, productName: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Millésimes</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="number"
                placeholder="Millésimes"
                value={fields.year}
                onChange={(e) => setFields({ ...fields, year: parseInt(e.target.value) })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Catégorie</Form.Label>
            <Col sm={7}>
              <Form.Select
                value={fields.category_id}
                onChange={(e) => setFields({ ...fields, category_id: parseInt(e.target.value) })}
              >
                <option>Sélectionner une catégorie</option>
                {props.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Entrepôt</Form.Label>
            <Col sm={7}>
              <Form.Select
                value={fields.warehouse_id}
                onChange={(e) => setFields({ ...fields, warehouse_id: parseInt(e.target.value) })}
              >
                <option>Sélectionner une entrepôt</option>
                {props.warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Unité de produit</Form.Label>
            <Col sm={7}>
              <Form.Select
                value={fields.productUnit_id}
                onChange={(e) => setFields({ ...fields, productUnit_id: parseInt(e.target.value) })}
              >
                <option>Sélectionner une unité</option>
                {props.productUnits.map((productUnit) => (
                  <option key={productUnit.id} value={productUnit.id}>
                    {productUnit.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Quantité vendue</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="number"
                placeholder="Quantité vendue"
                value={fields.soldQuantity}
                onChange={(e) => setFields({ ...fields, soldQuantity: parseInt(e.target.value) })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Prix</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="number"
                placeholder="Prix"
                value={fields.price}
                onChange={(e) => setFields({ ...fields, price: parseFloat(e.target.value) })}
                step="0.1"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Description</Form.Label>
            <Col sm={7}>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={fields.description}
                onChange={(e) => setFields({ ...fields, description: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Stock</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="number"
                placeholder="Stock"
                value={fields.stock}
                onChange={(e) => setFields({ ...fields, stock: parseInt(e.target.value) })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Télécharger les images</Form.Label>
                <Col sm={7}>
        <FilePond
        files={productPhotos}
        onupdatefiles={fileItems => setProductPhotos(fileItems.map(fileItem => fileItem.file as File))}
        allowMultiple={true}
        maxFiles={3}
        name="files"
        labelIdle='Glissez et déposez vos fichiers ou <span class="filepond--label-action"> Parcourir </span>'
    /> 
                </Col>
            </Form.Group> 

          <Row className="pb-3 ps-3 pe-3">
            <Col className="p-1">
              <Nav.Link
                className="btn bg-black w-100 text-white"
                as={Link}
                to="/infoPage/Product"
                onClick={() => props.addProduct(fields, productPhotos)}
              >
                Ajouter
              </Nav.Link>
            </Col>

            <Col className="p-1">
              <Nav.Link
                className="btn bg-black w-100 text-white"
                as={Link}
                to="/welcome" 
              >
                Annuler
              </Nav.Link>
            </Col>
          </Row>
        </Form>
      </Card>
    </Row>
  );
};

export default AddProductView;
