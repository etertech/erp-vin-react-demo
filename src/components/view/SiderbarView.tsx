import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { User } from "../entity/User";

interface SidebarProps {
  user: User | null;
}

const hasRole = (user: User | null, ... roles: string [] ) => {
  return user ? user.roles.some(role => roles.includes(role.name)) :false
}


const SidebarView: React.FC<SidebarProps> = (props) => {

  return (
    <ListGroup>
      <ListGroup.Item>
        Gestion utilisateur
        <ListGroup>
          {hasRole(props.user, "ADMIN", "MANAGER") && 
          (
            <>
          <ListGroup.Item as={Link} to="/addUser">Ajouter un utilisateur</ListGroup.Item>
          <ListGroup.Item as={Link} to="/userTable">Modifier utilisateur</ListGroup.Item>
            </>
          )
          }
        </ListGroup>
      </ListGroup.Item>
      <ListGroup.Item>
        Gestion Produit et entrepôt
        <ListGroup>
          <ListGroup.Item as={Link} to="/addProduct">Ajouter un produit</ListGroup.Item>
          <ListGroup.Item as={Link} to="/productTable">Consulter/modifier produits</ListGroup.Item>
          <ListGroup.Item as={Link} to="/addCategory">Ajouter une catégorie </ListGroup.Item>
          <ListGroup.Item as={Link} to="/categoryTable">Modifier une catégorie</ListGroup.Item>
          <ListGroup.Item as={Link} to="/addWarehouse">Ajouter une entrepôt</ListGroup.Item>
          <ListGroup.Item as={Link} to="/warehouseTable">Modifier une entrepôt</ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
      <ListGroup.Item>
        Gestion client
        <ListGroup>
          <ListGroup.Item as={Link} to="/addClient">Ajouter un client</ListGroup.Item>
          <ListGroup.Item as={Link} to="/editClient">Modifier un client</ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
      <ListGroup.Item>
        Gestion fournisseur
        <ListGroup>
          <ListGroup.Item as={Link} to="/addSupplier">Ajouter un fournisseur</ListGroup.Item>
          <ListGroup.Item as={Link} to="/editSupplier">Modifier un fournisseur</ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
      <ListGroup.Item>
        Gestion commande
        <ListGroup>
          <ListGroup.Item as={Link} to="/orderClient">Créer une commande</ListGroup.Item>
          <ListGroup.Item as={Link} to="/editOrder">Modifier une commande</ListGroup.Item>
        </ListGroup>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default SidebarView;