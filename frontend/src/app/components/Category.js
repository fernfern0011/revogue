import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels() {
  const [size, setSize] = React.useState('');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <div>
        <InputLabel
            htmlFor="standard-brandName"
            sx={{ textAlign: 'left', fontSize: 13, color: 'black' }}
        >
            Category <span style={{ color: 'red' }}>*</span>
        </InputLabel>
      <FormControl required >
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={size}
          onChange={handleChange}
          sx={{
            '& .MuiSelect-select': {
              fontSize: 13, // Adjust the font size as needed
              height: '1px', // Set the height of the input field
              width: '23vw', // Set the width of the input field
            },
          }}
        >
          <MenuItem value="Top">Top</MenuItem>
          <MenuItem value="Bottom">Bottom</MenuItem>
          <MenuItem value="Dresss">Dress</MenuItem>
          <MenuItem value="OuterWear">Outer Wear</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}