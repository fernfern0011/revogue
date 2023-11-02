"use client";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel sx={{ fontSize: '13px', transform: 'translate(12px, 4px)' }}id="demo-select-small-label">Sort by</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={age}
        onChange={handleChange}
        sx={{ height: '28px' }} 
      >
        <MenuItem value={"newest first"} sx={{ fontSize: 13}}>Newest First</MenuItem>
        <MenuItem value={"most popular"} sx={{ fontSize: 13}}>Most Popular</MenuItem>
      </Select>
    </FormControl>
  );
}
