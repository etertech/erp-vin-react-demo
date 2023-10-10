import React, { useState , useRef, useEffect} from "react";
import { Card, Col, Form, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import {Address} from "../entity/Address"
import { Client } from "../entity/Client";
import moment from "moment";

interface AddClientViewProps {
  addClient: (client: any) => void;
}



const AddClientView: React.FC<AddClientViewProps> = (props) => {



const [fields, setFields] = useState<Client>({
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  telephone: "",
  address: {
    street: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  },
  addedDate: "",
});

const [newAddress, setNewAddress] = useState<Address>(
  { street: "",
    postalCode: "",
    city: "",
    state: "",
    country: "",
  });


const addressRef = useRef<HTMLInputElement | null>(null);


useEffect(() => {
  if (addressRef.current) {
    const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      let address = {
        street: "",
        postalCode: "",
        city: "",
        state: "",
        country: "",
      };

      const streetNumber = place.address_components?.find((component:any) =>
        component.types.includes("street_number")
      )?.long_name;
      const route = place.address_components?.find((component:any) =>
        component.types.includes("route")
      )?.long_name;
    
      let street = '';
      if (streetNumber) {
        street += streetNumber;
      }
      if (route) {
        street += ' ' + route;
      }
      street = street.trim();
      address.street = street;

      //const address = place.formatted_address;
      const postalCode = place.address_components?.find(
        (component : any) => component.types.includes("postal_code")
      )?.long_name;
      if (postalCode) address.postalCode = postalCode;

      const city = place.address_components?.find((component:any) =>
        component.types.includes("locality")
      )?.long_name;
      if (city) address.city = city;


      const state = place.address_components?.find((component:any) =>
        component.types.includes("administrative_area_level_1")
      )?.long_name;
      if (state) address.state = state;


      const country = place.address_components?.find((component:any) =>
        component.types.includes("country")
      )?.long_name;
      if (country) address.country = country;

      setNewAddress(address);
      //setFields({ ...fields, address: { ...fields.address, street, postalCode, city, state, country } });
    });
  }
}, []);

useEffect(() => {
  setFields({ ...fields, address: newAddress });
}, [newAddress]);


  return (
    <>
 

    <Row className="d-flex justify-content-center p-3 pt-5">
      <Card className="max-width-50-rem p-0">
        <Card.Header className="text-center">Ajouter un client</Card.Header>

        <Form className="p-4">
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Prénom</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Prénom"
                value={fields.firstName}
                onChange={(e) => setFields({ ...fields, firstName: e.target.value })}
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
                onChange={(e) => setFields({ ...fields, lastName: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Entreprise</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Entreprise"
                value={fields.companyName}
                onChange={(e) => setFields({ ...fields, companyName: e.target.value })}
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
                onChange={(e) => setFields({ ...fields, email: e.target.value })}
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
                onChange={(e) => setFields({ ...fields, telephone: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Adresse</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Adresse"
                value={fields.address.street}
                onChange={(e) => setFields({ ...fields, address: { ...fields.address, street: e.target.value } })}
                ref={addressRef}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Code Postal</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Code Postal"
                value={fields.address.postalCode}
                onChange={(e) => setFields({ ...fields, address: { ... fields.address, postalCode: e.target.value }})}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Ville</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Ville"
                value={fields.address.city}
                onChange={(e) => setFields({ ...fields, address: {... fields.address, city: e.target.value}})}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>State/Province</Form.Label>
            <Col sm={7}>
            <Form.Control
              type="text"
              placeholder="State/Province"
              value={fields.address.state}
              onChange={(e) => setFields({ ...fields, address : {...fields.address, state: e.target.value }})}
          />
  </Col>
</Form.Group>


          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>Pays</Form.Label>
            <Col sm={7}>
              <Form.Control
                type="text"
                placeholder="Pays"
                value={fields.address.country}
                onChange={(e) => setFields({ ...fields, address: {...fields.address, country: e.target.value }})}
              />
            </Col>
          </Form.Group>

          <Row className="pb-3 ps-3 pe-3">
            <Col className="p-1">
              <Nav.Link
                className="btn bg-black w-100 text-white"
                as={Link}
                to="/infoPage/Client"
                onClick={() => 
                    {
                    const newFields = {...fields, addedDate: moment().format()}
                    props.addClient(newFields)
                  }
                  }
                  
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
    </>
  );
};

export default AddClientView;
