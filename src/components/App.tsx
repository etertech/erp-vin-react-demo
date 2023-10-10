import React, { useState } from "react";
import '../sass/App.scss';
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link , redirect} from "react-router-dom";
import ConnectionController from "./controller/ConnectionController";
import AddUserController from "./controller/AddUserController";
import SidebarView from "./view/SiderbarView";
import { User } from "./entity/User";
import Welcome from "./view/WelcomeView";
import LogoutViews from "./view/LogoutViews";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock , faWineGlass, faHome, faKey, faUnlock} from '@fortawesome/free-solid-svg-icons';
import Error404 from "./view/errorPage/Error404";
import AddCategoryController from "./controller/AddCategoryController";
import AddWarehouseController from "./controller/AddWarehouseController";
import AddProductController from "./controller/AddProductController";
import AddClientController from "./controller/AddClientController";
import ProductsTableController from "./controller/ProductsTableController";
import AddSupplierController from "./controller/AddSupplierController";
import OrderController from "./controller/OrderController";
import InfoPageView from "./view/InfoPageView";
import UsersTableController from "./controller/UsersTableController";
import CategoriesTableController from "./controller/CategoriesTableController";
import WarehousesTableController from "./controller/WarehousesTableController";

function App() {

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        const userObject = JSON.parse(savedUser) as User;
        const oneHour = 60 * 60 * 1000;
        if (new Date().getTime() - userObject.savedAt > oneHour) {
            localStorage.removeItem('user');  // Supprimer l'objet expiré
            return null;
        }
        return userObject;
    }
    return null;
});

  function userName() {
    return user !== null ? `${user.firstName} ${user.lastName}` : "";
  }

  return (
  <BrowserRouter>
    <header className="d-flex justify-content-center align-items-center">
        <h1>ERPVin</h1>
    </header>

    <Navbar className="mb-5" collapseOnSelect={true} bg="black" variant="dark" sticky="top" expand="md">
      <Container>
        <Navbar.Brand className="fst-italic">{userName()}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link eventKey="1" as={Link} to="/welcome">
              <FontAwesomeIcon icon={faHome}  className="me-2"/>
              Accueil
            </Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/connection" hidden={user === null}>
            <FontAwesomeIcon icon={faUser}  className="me-2"/>
              Mon espace
            </Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/connection" hidden={user !== null}>
              <FontAwesomeIcon icon={faKey}  className="me-2"/>
              Connexion
            </Nav.Link>
            <Nav.Link eventKey="4" as={Link} to="/logout" hidden={user === null}>
              <FontAwesomeIcon icon={faUnlock}  className="me-2"/>
              Déconnexion
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


<div className="d-flex flex-row">
  <div className="sidebar flex-grow-1" hidden={user === null}  > {/* Sidebar */}
    <SidebarView user={user} />
  </div>
  <article className="flex-grow-2 w-100">

      <Routes>
      <Route 
             path="/connection" 
            element={<ConnectionController user={user} setUser={setUser} />}
          />
      <Route path="/Logout" element={<LogoutViews setUser={setUser} />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route 
  path="/addUser"
  element={
    user && (user.roles.some(role => role.name === "ADMIN" || role.name === "MANAGER")) ? 
    <AddUserController user={user}/> : 
    <Error404 /> // Si l'utilisateur n'a pas les bons rôles, nous le redirigeons vers la page d'accueil
  }
/>
      <Route path="/userTable" element={< UsersTableController/>} />
      <Route path="/addProduct" element={<AddProductController user={user} />} />
      <Route path="/productTable" element={<ProductsTableController />} />
      <Route path="/addCategory" element={<AddCategoryController user={user}/>} />
      <Route path="/addWarehouse" element={<AddWarehouseController user={user}/>} />
      <Route path="/categoryTable" element={<CategoriesTableController />} />
      <Route path="/addWarehouse" element={<Welcome />} />
      <Route path="/warehouseTable" element={<WarehousesTableController />} />
      <Route path="/addClient" element={<AddClientController user={user} />} />
      <Route path="/editClient" element={<Welcome />} />
      <Route path="/addSupplier" element={<AddSupplierController user={user} />} />
      <Route path="/editSupplier" element={<Welcome />} />
      <Route path="/orderClient" element={<OrderController />} />
      <Route path="/editOrder" element={<Welcome />} />
      <Route path="/infoPage" element={<InfoPageView />} />
      <Route path="/infoPage/:pageParametre" element={<InfoPageView />} />

    </Routes>
    </article>
</div>

    <footer className="d-flex justify-content-center align-items-center">
        <h6>ERPVin - 2023</h6>
    </footer>
  </BrowserRouter>
);
}

export default App;
