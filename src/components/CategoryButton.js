import React from 'react';
import Button from '@mui/material/Button';

function CategoryButton({ category, onClick }) {
  return (
    <Button variant="contained" color="primary" onClick={() => onClick(category)}>
      {category}
    </Button>
  );
}

export default CategoryButton;