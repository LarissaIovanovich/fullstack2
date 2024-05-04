import React, { useState } from 'react';
import ItemList from './components/ItemList';
import Button from '@mui/material/Button'; // Importando o botão da biblioteca
import './App.css';

function App() {
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Categorias</h1>
        <Button variant="contained" onClick={() => handleCategoryClick('ailments')}>Ailments</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('armor')}>Armor</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('charms')}>Charms</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('decorations')}>Decorations</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('events')}>Events</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('items')}>Items</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('locations')}>Locations</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('monsters')}>Monsters</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('skills')}>Skills</Button>
        <Button variant="contained" onClick={() => handleCategoryClick('weapons')}>Weapons</Button>

        {currentCategory && <ItemList category={currentCategory} />}
      </header>
    </div>
  );
}

export default App;