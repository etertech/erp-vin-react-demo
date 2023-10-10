import React, { useState } from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

interface AddCategoryViewProps {
  addCategory: (category: any) => void;
}

interface CategoryFields {
  categoryName: string;
}

const AddCategoryView: React.FC<AddCategoryViewProps> = (props) => {
  const [fields, setFields] = useState<CategoryFields>({
    categoryName: "",
  });

  return (
    <Row className="d-flex justify-content-center p-3 pt-5">
      <Card className="max-width-50-rem p-0">
        <Card.Header className="text-center">Ajouter une catégorie</Card.Header>
        <Form className="p-4">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Nom de catégorie</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Nom de catégorie"
                value={fields.categoryName}
                onChange={e => setFields({ ...fields, categoryName: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Row className="pb-3 ps-3 pe-3">
            <Col className="p-1">
              <Nav.Link
                className="btn bg-black w-100 text-white"
                as={Link} to="/infoPage/Category"
                onClick={() => props.addCategory(fields)}
              >
                Ajouter
              </Nav.Link>
            </Col>
            <Col className="p-1">
              <Nav.Link
                className="btn bg-black w-100 text-white"
                as={Link} to="/welcome" 
              >
                Annuler
              </Nav.Link>
            </Col>
          </Row>
        </Form>
      </Card>
    </Row>
  );
}

export default AddCategoryView;
