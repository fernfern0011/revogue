import React, { useState } from 'react';
import '../styles/AddItem.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Menu from "@mui/material/Menu";
import MenuItem from '@mui/material/MenuItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CreateItemOverlay = ({ onSave }) => {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState('');
  const [images, setImages] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Create an object with all the item details
    const newItem = {
      name: itemName,
      description,
      price,
      size,
      images,
    };

    // Pass the new item to the onSave callback
    onSave(newItem);

    // Clear the form fields and close the overlay
    setItemName('');
    setDescription('');
    setPrice(0);
    setSize('');
    setImages([]);
    handleClose();
  };

  return (
    <div>
      <MenuItem onClick={handleOpen}>
            <div className="menu-icons1">
                <AddCircleOutlineIcon />
            </div>
            <div className="menu-icons">
                Create Item
            </div>
        </MenuItem>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Item
          </Typography>
          <div className="overlay-content">
            <form>
              <label htmlFor="itemName">Item Name:</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              />
              {/* ... Add other form fields as you did before ... */}
              <button type="button" onClick={handleSave}>Create</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateItemOverlay;
