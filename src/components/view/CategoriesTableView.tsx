import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { User} from "../entity/User";
import { Modal, Button, TextField } from '@mui/material';
import axios from "axios";
import config from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { Category } from "../entity/Category";


interface CategoriesTableViewProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  formType?: string;
}



const CategoriesTableView: React.FC<CategoriesTableViewProps> = (props) => {
  const backUrl = `${config.apiUrl}/category`;
  const {formType} = props;

const handleEditClick = (category: Category) => {
  setSelectedCategory(category);
  setOpen(true);
};








  const commonColumns = [
   

 


    { field: 'name', headerName: "Nom de la categorie", width: 200 },


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
                onClick={() => handleEditClick(params.row as Category)}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> 
            </Button>
        );
    }
};



let columns = commonColumns;
if (formType === 'ProductsTable') {
  columns = [editColumn,...commonColumns];
} 


  const [open, setOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

// useRef to access form data
const productNameRef = React.useRef<HTMLInputElement>(null);
const priceRef = React.useRef<HTMLInputElement>(null);



const modalBody = (
  <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: 400, backgroundColor: 'white', padding: '16px 32px', borderRadius: '8px'}}>
      <h2>Edit Product</h2>
      <form>
          <TextField label="Product Name" 
          fullWidth 
          margin="normal" 
          inputRef={productNameRef}  
          />
          <TextField label="Price" 
          type="number" 
          fullWidth 
          margin="normal" 
          inputRef={priceRef} 
          />
          {/* ... Add other fields similarly ... */}
          <Button style={{ marginTop: '16px' }} variant="contained" color="primary" >
          Enregistrer
          </Button>
      </form>
  </div>
);





  return (
    <div style={{ height: 500, width: '100%' }}>
      <Modal open={open} onClose={() => setOpen(false)}>
    {modalBody}
</Modal>
      <DataGrid
        rows={props.categories}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
      />
      
    </div>
  );
};

export default CategoriesTableView;
