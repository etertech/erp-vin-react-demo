import React, { useState } from "react";
import { Card, Col, Form, InputGroup, Nav, Row, FormCheck } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../entity/User";

interface AddUserViewProps {
    user : User | null
    addUser: (user: any) => void;
}



interface UserFields {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    telephone: string;
    birthday: string;
    roles: { name: string }[];
    enabled: boolean;
  }

const AddUserView: React.FC<AddUserViewProps> = (props) => {
  const [fields, setFields] = useState<UserFields>({
      username: "", password: "", email: "", firstName: "", lastName: "",
      telephone: "", birthday: "1990-01-01", roles: [{ name: "USER" }], enabled: true
  });

  const handleRoleChange = (e: any) => {
      const value = e.target.value;
      if (e.target.checked) {
          setFields({ ...fields, roles: [...fields.roles, { name: value }] });
      } else {
          setFields({ ...fields, roles: fields.roles.filter((role: any) => role.name !== value) });
      }
  };

  const isAdmin = props.user && props.user.roles.some(role => role.name === "ADMIN")

    return (
      <Row className="d-flex justify-content-center p-3 pt-5">
          <Card className="max-width-50-rem p-0">
          <Card.Header className="text-center">Ajouter un utilisateur</Card.Header>
              <Form className="p-4">
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3}>Identifiant</Form.Label>
                      <Col sm={7}>
                          <Form.Control
                              type="text"
                              placeholder="Identifiant"
                              value={fields.username}
                              onChange={e => setFields({ ...fields, username: e.target.value })}
                          />
                      </Col>
                  </Form.Group>

                   {/* Password */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Mot de passe</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={fields.password}
                onChange={e => setFields({ ...fields, password: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3}>Email</Form.Label>
                      <Col sm={7}>
                          <Form.Control
                              type="text"
                              placeholder="Email"
                              value={fields.email}
                              onChange={e => setFields({ ...fields, email: e.target.value })}
                          />
                      </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3}>Prénom</Form.Label>
                      <Col sm={7}>
                          <Form.Control
                              type="text"
                              placeholder="Prénom"
                              value={fields.firstName}
                              onChange={e => setFields({ ...fields, firstName: e.target.value })}
                          />
                      </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3}>Nom</Form.Label>
                      <Col sm={7}>
                          <Form.Control
                              type="text"
                              placeholder="Nom"
                              value={fields.lastName}
                              onChange={e => setFields({ ...fields, lastName: e.target.value })}
                          />
                      </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={3}>Téléphone</Form.Label>
                      <Col sm={7}>
                          <Form.Control
                              type="text"
                              placeholder="Téléphone"
                              value={fields.telephone}
                              onChange={e => setFields({ ...fields, telephone: e.target.value })}
                          />
                      </Col>
        </Form.Group>


          

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Date de naissance</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="date"
                value={fields.birthday}
                onChange={e => setFields({ ...fields, birthday: e.target.value })}
              />
            </Col>
          </Form.Group>


                  {/* Repeat similar blocks for other string/numeric fields */}
                  {/* ... */}
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Rôles</Form.Label>
                      <Col sm={10}>
                        <FormCheck
                              inline
                              label="Administrateur"
                              value="ADMIN"
                              onChange={handleRoleChange}
                              disabled = {!isAdmin}
                          />
                          <FormCheck
                              inline
                              label="Manager"
                              value="MANAGER"
                              onChange={handleRoleChange}
                              disabled = {!isAdmin}
                          />
                          <FormCheck
                              inline
                              label="Utilisateur"
                              value="USER"
                              checked={fields.roles.some((role: any) => role.name === "USER")}
                              onChange={handleRoleChange}
                              disabled
                          />
                      </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>Actif</Form.Label>
                      <Col sm={10}>
                          <Form.Check
                              type="checkbox"
                              checked={fields.enabled}
                              onChange={e => setFields({ ...fields, enabled: e.target.checked })}
                          />
                      </Col>
                  </Form.Group>


    


                  {/* ... */}
                  <Row className="pb-3 ps-3 pe-3">
                      <Col className="p-1">
                          <Nav.Link
                              className="btn bg-black w-100 text-white"
                              as={Link} to="/infoPage/User"
                              onClick={() => props.addUser(fields)}
                          >
                              Ajouter
                          </Nav.Link>
                      </Col>
                  
                      <Col className="p-1">
                        <Nav.Link
                            className="btn bg-black w-100 text-white"
                            as={Link} to="/welcome" // Vous pouvez modifier cette URL pour rediriger vers la page souhaitée lors de l'annulation
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

export default AddUserView