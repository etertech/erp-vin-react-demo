import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../entity/User";
import { Card, Col, Form, InputGroup, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

interface LogoutProps {
  setUser: (user: User | null) => void;
}

const LogoutViews: React.FC<LogoutProps> = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // réinitialiser l'état de l'utilisateur
    navigate("/welcome"); // rediriger vers la page d'accueil
  };

  const handleCancel = () => {
    navigate("/welcome"); // rediriger vers la page d'accueil
  };

  return (

<Row className="d-flex justify-content-center p-3 pt-5">
<Card className="max-width-50-rem p-0">
<Card.Header className="text-center">Voulez-vous vraiment vous déconnecter?</Card.Header>
    <br/>

    <Row className="pb-3 ps-3 pe-3">
        <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
            <Nav.Link
                className="btn bg-black w-100 text-white"
                as={Link} to="/welcome"
                onClick={handleLogout}
            >
                Confirmer
            </Nav.Link>
        </Col>

        <Col sm={{ offset: 1, span: 10 }} lg={4} className="p-1">
            <Nav.Link className="btn bg-black w-100 text-white"
            as={Link} to="/welcome"
            onClick={handleCancel}
            >
                Annuler
            </Nav.Link>
        </Col>
    </Row>
    <br/>
</Card>
</Row>





  );
};

export default LogoutViews;
