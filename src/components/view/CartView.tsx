import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Product } from "../entity/Product";
import { Modal, Button, TextField } from '@mui/material';
import axios from "axios";
import config from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


interface CartViewProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  formType?: string;
  cart: Product[];
  setCart: (cart: Product[]) => void;
}



const CartView: React.FC<CartViewProps> = (props) => {
  const backUrl = `${config.apiUrl}/product`;
  const {formType} = props;

const handleEditClick = (product: Product) => {
  setSelectedProduct(product);
  setOpen(true);
};

const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
const [productToDelete, setProductToDelete] = React.useState<Product | null>(null);

const deleteModalBody = (
  <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: 400, backgroundColor: 'white', padding: '16px 32px', borderRadius: '8px'}}> 
    <h2>Supprimer le produit</h2>
    <p>Êtes-vous sûr de vouloir supprimer "{productToDelete?.productName}" du panier ?</p>
    <Button variant="contained" color="primary" onClick={() => {
      const updatedCart = props.cart.filter((product) => product.id !== productToDelete?.id);
      props.setCart(updatedCart);
      setOpenDeleteModal(false);
    }}>Supprimer</Button>
    <Button variant="contained" color="secondary" onClick={() => setOpenDeleteModal(false)}>Annuler</Button>
  </div>
);



const handleQuantityChange = (product: Product, change: 'increment' | 'decrement') => {
  // Trouvez le produit dans le panier
  const productInCart = props.cart.find(item => item.id === product.id);

  if (!productInCart) return;  // Le produit n'est pas dans le panier
  
  let newQuantity = productInCart.quantity!;

  if (change === 'increment' && newQuantity < product.stock) {
    newQuantity++;
  } else if (change === 'decrement' && newQuantity > 1) {
    newQuantity--;
  }

  // Mettre à jour le panier
  const updatedCart = props.cart.map(item => 
    item.id === product.id ? {...item, quantity: newQuantity} : item
  );
  
  props.setCart(updatedCart);
};



const handleRemoveFromCart = (product: Product) => {
  // Afficher une modal pour confirmer la suppression
  setProductToDelete(product);
  setOpenDeleteModal(true);



};

const [hoverImage, setHoverImage] = React.useState<{
  show: boolean;
  top: number;
  left: number;
  src: string;
} | null>(null);




  const commonColumns = [
   

 
  {
    field: 'firstPhoto',
    headerName: 'Photo',
    width: 100,
    renderCell: (params: any) => {
        const product: Product = params.row as Product;
        if (product.productPhotos && product.productPhotos.length > 0) {
            return (
                <img 
                    src={product.productPhotos[0].photoLink}
                    alt="Product" 
                    style={{ width: '50px', height: 'auto' }} 
                    onMouseEnter={e => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoverImage({
                            show: true,
                            top: rect.top,
                            left: rect.left + 60,
                            src: product.productPhotos===undefined?"nolink":product.productPhotos[0].photoLink,
                        });
                    }}
                    onMouseLeave={() => setHoverImage(null)}
                />
            );
        }
        return <span>Sans photo</span>;
    }
}

  ,

    { field: 'productName', headerName: 'Nom du produit', width: 200 },
    { field: 'year', headerName: 'Millésimes', type: 'number', width: 90 ,valueFormatter: (params:any) => params.value.toString().replace(/\s/g, '') },
    { field: 'categoryName', headerName: 'Catégorie', width: 90 },
    { field: 'warehouseName', headerName: 'Entrepôt', width: 90 },
    { field: 'price', headerName: 'Prix', type: 'number', width: 90 },
    { field: 'soldQuantity', headerName: 'Quantité vendue', type: 'number', width: 90 },
    { field: 'productUnitName', headerName: 'Unité de produit', type: 'string', width: 90 },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 90 },
    // Vous pouvez ajouter d'autres colonnes si nécessaire...
  ];

  const editColumn = {
    field: 'edit',
    headerName: 'Modifier',
    sortable: false,
    width: 90,
    disableClickEventBubbling: true,
    renderCell: (params:any) => {
        return (
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleEditClick(params.row as Product)}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> 
            </Button>
        );
    }
};

const orderClientColumn = {
  field: 'order',
  headerName: 'Modifier',
  sortable: false,
  width: 160,
  disableClickEventBubbling: true,
  renderCell: (params:any) => {
    const productInCart = props.cart.find(item => item.id === params.row.id);

    return (
      <>

        <Button
        style={{ marginRight: '4px', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
         size="small" variant="contained" color="primary" onClick={() => handleQuantityChange(params.row as Product, 'increment')}>+</Button>
        <Button
         style={{ marginRight: '4px', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
        size="small" variant="contained" color="primary" onClick={() => handleQuantityChange(params.row as Product, 'decrement')}>-</Button>
 
 
        <TextField 
        variant="outlined" 
        size="small"
        placeholder="0"
        value={productInCart ? productInCart.quantity : 0}
        style={{  maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', verticalAlign: 'center' ,marginRight: '4px'}} 
        />
                   <Button 
                     className="center-icon-button"
                   style={{ marginRight: '4px', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                variant="contained" 
                color="primary" 
                size="small"
                onClick={() => handleRemoveFromCart(params.row as Product)}>
                  <FontAwesomeIcon icon={faTrash}/> 
            </Button>
      </>
    );
  }
};

let columns = commonColumns;
if (formType === 'ProductsTable') {
  columns = [editColumn,...commonColumns];
} else if (formType === 'OrderClient') {
  columns = [orderClientColumn, ...commonColumns];
}


  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

// useRef to access form data
const productNameRef = React.useRef<HTMLInputElement>(null);
const priceRef = React.useRef<HTMLInputElement>(null);

const handleSave = async () => {
  // Assuming your backend API endpoint is /api/products/{id}
  const response = await axios.put(`${backUrl}/${selectedProduct?.id}`, {
    productName: productNameRef.current!.value,
    price: priceRef.current!.value,
    // ... other fields ...
  });

  // Handle the response (e.g., show a success message, error handling, etc.)
  if (response.data.success) {

  // Trouver l'index du produit modifié dans la liste des produits
  const index = props.products.findIndex((p) => p.id === selectedProduct?.id);

  // Créer une copie du produit et y apporter les modifications
  const updatedProduct = { ...props.products[index], productName: productNameRef.current!.value, price: parseFloat(priceRef.current!.value) };

  // Créer une nouvelle liste de produits en remplaçant l'ancien produit par le nouveau
  const updatedProducts = [...props.products.slice(0, index), updatedProduct, ...props.products.slice(index + 1)];
  props.setProducts(updatedProducts);

    setOpen(false);
    // Optional: Update the frontend data, trigger a re-fetch, etc.
  } else {
    // Handle the error...
  }
};

const modalBody = (
  <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: 400, backgroundColor: 'white', padding: '16px 32px', borderRadius: '8px'}}>
      <h2>Edit Product</h2>
      <form>
          <TextField label="Product Name" 
          fullWidth 
          margin="normal" 
          defaultValue={selectedProduct?.productName} 
          inputRef={productNameRef}  
          />
          <TextField label="Price" 
          type="number" 
          fullWidth 
          margin="normal" 
          defaultValue={selectedProduct?.price} 
          inputRef={priceRef} 
          />
          {/* ... Add other fields similarly ... */}
          <Button style={{ marginTop: '16px' }} variant="contained" color="primary" onClick={handleSave}>
          Enregistrer
          </Button>
      </form>
  </div>
);





  return (
    <div style={{ height: 500, width: '100%' }}>
        <form>
      <label>Le client : </label>
      <input type="text" name="clientName" />
    </form>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
  {deleteModalBody}
</Modal>
      <Modal open={open} onClose={() => setOpen(false)}>
    {modalBody}
</Modal>
      <DataGrid
        rows={props.products}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        //checkboxSelection
      />

{
    hoverImage && (
        <div 
            style={{
                position: 'fixed',
                top: hoverImage.top + 'px',
                left: hoverImage.left + 'px',
                zIndex: 9999,
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
            }}
        >
            <img 
                src={hoverImage.src}
                alt="Zoomed Product" 
                style={{ width: '350px', height: 'auto' }} 
            />
        </div>
    )
}

      
    </div>
  );
};

export default CartView;
