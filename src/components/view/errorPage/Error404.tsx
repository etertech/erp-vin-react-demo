import React from 'react';
import { Card, Col, Row } from "react-bootstrap";

const Error404: React.FC = () => {
    return (


<Row className="d-flex justify-content-center p-3 pt-5">
<Card className="max-width-50-rem p-0">
<Card.Header className="text-center">Erreur 404</Card.Header>
    <br/>

    <Row className="pb-3 ps-3 pe-3">
        <Col sm={{ offset: 3, span: 12 }} lg={12} className="p-1">
        <p>La page que vous recherchez n'a pas été trouvée.</p>
        </Col>
    </Row>
    <br/>
</Card>
</Row>

    );
};

export default Error404;