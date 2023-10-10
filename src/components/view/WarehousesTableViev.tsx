import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { User} from "../entity/User";
import { Modal, Button, TextField } from '@mui/material';
import axios from "axios";
import config from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit } from '@fortawesome/free-solid-svg-icons';
import { Warehouse } from "../entity/Warehouse";


interface WarehousesTableViewProps {
  warehouses: Warehouse[];
  setWarehouses: (warehouses: Warehouse[]) => void;
  formType?: string;
}



const WarehousesTableView: React.FC<WarehousesTableViewProps> = (props) => {
  const backUrl = `${config.apiUrl}/warehouse`;
  const {formType} = props;

const handleEditClick = (warehouse: Warehouse) => {
  setSelectedWarehouse(warehouse);
  setOpen(true);
};








  const commonColumns = [
   

 


    { field: 'name', headerName: "Nom d'entrepôt", width: 200 },
    { 
      field: 'address', 
      headerName: "Adresse", 
      width: 500,
      valueGetter: (params:any) => {
        const address = params.row.address;
        return `${address.street}, ${address.postalCode}, ${address.city}, ${address.state}, ${address.country}`;
      }
    }



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
                onClick={() => handleEditClick(params.row as Warehouse)}>
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
  const [selectedWarehouse, setSelectedWarehouse] = React.useState<Warehouse | null>(null);

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
        rows={props.warehouses}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
      />
      
    </div>
  );
};

export default WarehousesTableView;
