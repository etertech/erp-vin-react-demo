import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { User} from "../entity/User";
import { Modal, Button, TextField } from '@mui/material';
import axios from "axios";
import config from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit } from '@fortawesome/free-solid-svg-icons';


interface UsersTableViewProps {
  users: User[];
  setUsers: (users: User[]) => void;
  formType?: string;
}



const UsersTableView: React.FC<UsersTableViewProps> = (props) => {
  const backUrl = `${config.apiUrl}/user`;
  const {formType} = props;

const handleEditClick = (user: User) => {
  setSelectedUser(user);
  setOpen(true);
};





const [hoverImage, setHoverImage] = React.useState<{
  show: boolean;
  top: number;
  left: number;
  src: string;
} | null>(null);


  const commonColumns = [
   

 


    { field: 'username', headerName: "Nom d'utilisateur", width: 200 },
    { field: 'firstName', headerName: 'Prénom', width: 90 },
    { field: 'lastName', headerName: 'Nom', width: 90 },
    { field: 'roles', headerName: 'Roles', width: 90, 
    renderCell: (params:any) => {
      return params.value.map((role: { id: number; name: string }) => role.name).join(' ');
    } },
    { field: 'enabled', headerName: 'Activé', width: 90 
    ,
    renderCell: (params: any) => {
      return params.value ? 'Oui' : 'Non';
    }
  },

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
                onClick={() => handleEditClick(params.row as User)}>
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
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

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
        rows={props.users}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
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

export default UsersTableView;
