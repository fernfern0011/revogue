import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Size({ setFormData }) {
  const [selectedSize, setSize] = React.useState('');

  React.useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      size: selectedSize
    }))
  }, [selectedSize])

  return (
    <div>
      <InputLabel
        htmlFor="standard-brandName"
        sx={{ textAlign: 'left', fontSize: 15, color: 'black', fontWeight: 'bold'  }}
      >
        Size <span style={{ color: 'red' }}>*</span>
      </InputLabel>
      <FormControl required >
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          name='size'
          value={selectedSize}
          onChange={(e) => setSize(e.target.value)}
          sx={{
            '& .MuiSelect-select': {
              fontSize: 15, // Adjust the font size as needed
              height: '1px', // Set the height of the input field
              width: '30vw', // Set the width of the input field
            },
          }}
        >
          <MenuItem style={{fontSize:"15px", margin: "-5px 0"}} value="S">S</MenuItem>
          <MenuItem style={{fontSize:"15px", margin: "-5px 0"}} value="M">M</MenuItem>
          <MenuItem style={{fontSize:"15px", margin: "-5px 0"}} value="L">L</MenuItem>
          <MenuItem style={{fontSize:"15px", margin: "-5px 0"}} value="Free Size">Free Size</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}