import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Category({ setFormData }) {
  const [selectedCategory, setCategory] = React.useState('');

  React.useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
      category: selectedCategory
    }))
  }, [selectedCategory])

  return (
    <div>
      <InputLabel
        htmlFor="standard-brandName"
        sx={{ textAlign: 'left', fontSize: 15, color: 'black', fontWeight:"bold" }}
      >
        Category <span style={{ color: 'red' }}>*</span>
      </InputLabel>
      <FormControl required >
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          name='category'
          value={selectedCategory}
          onChange={(e) => setCategory(e.target.value)}
          sx={{
            '& .MuiSelect-select': {
              fontSize: 15, // Adjust the font size as needed
              height: '1px', // Set the height of the input field
              width: '30vw', // Set the width of the input field
            },
          }}
        >
          <MenuItem style={{fontSize:"15px", margin: "-5px 0"}} value="Top">Top</MenuItem>
          <MenuItem style={{fontSize:"15px", margin: "-5px 0"}} value="Bottom">Bottom</MenuItem>
          <MenuItem style={{fontSize:"15px", margin: "-5px 0"}} value="Dresss">Dress</MenuItem>
          <MenuItem style={{fontSize:"15px", margin: "-5px 0"}} value="Outer Wear">Outer Wear</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}