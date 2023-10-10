import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../entity/User";
import { Card, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


interface InfoPageProps {
  parentPage: string;
  itemType: string;
}

const InfoPageView: React.FC = () => {
  const navigate = useNavigate();
  const { pageParametre } = useParams<{ pageParametre: string }>();



 

  return (

<Row className="d-flex justify-content-center p-3 pt-5">
<Card className="max-width-50-rem p-0">
<Card.Header className="text-center">L'ajout a réussi!</Card.Header>
    <br/>

    <Row className="pb-3 ps-3 pe-3">
        <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
            <Nav.Link
                className="btn bg-black w-100 text-white"
                as={Link} to= {`/add${pageParametre}`}
            >
               Continuer à ajouter

            </Nav.Link>
        </Col>

        <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
            <Nav.Link className="btn bg-black w-100 text-white"
            as={Link} to="/welcome"
            >
                Retourner vers la page d'accueil
            </Nav.Link>
        </Col>
    </Row>
    <br/>
</Card>
</Row>





  );
};

export default InfoPageView;
