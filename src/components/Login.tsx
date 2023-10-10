import React, { useState, FormEvent } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock , faWineGlass} from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Vérification des identifiants (remplacer par une authentification réelle)
    if (username === 'user' && password === 'password') {
      alert('Connecté avec succès !');
      // Rediriger vers la page d'accueil ou une autre page
    } else {
      alert('Identifiant ou mot de passe incorrect !');
    }
  };

  return (
    <Container fluid>
    <Row className="justify-content-md-center align-items-center vh-100">
      <Col xs={12} md={4}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupPrepend">
                  <FontAwesomeIcon icon={faUser} className="text-goldenrod" />
                </span>
              </div>
              <Form.Control
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-describedby="inputGroupPrepend"
                className="form-control-icon"
              />
            </div>
          </Form.Group>
  
            <Form.Group controlId="formBasicPassword">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </div>
                <Form.Control
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </Form.Group>
  
            <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              Se connecter
            </Button>
            <Button variant="secondary" type="button" onClick={() => {
              // Code à exécuter lorsque l'utilisateur clique sur Annuler
              // Par exemple, réinitialiser les champs ou rediriger vers une autre page
            }}>
              Annuler
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
    <FontAwesomeIcon icon={faWineGlass} />  </Container>
  );
};

export default Login;
