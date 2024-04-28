import React, { useState } from 'react';
import ItemList from './components/ItemList';
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
        <button onClick={() => handleCategoryClick('ailments')}>Ailments</button>
        <button onClick={() => handleCategoryClick('armor')}>Armor</button>
        <button onClick={() => handleCategoryClick('charms')}>Charms</button>
        <button onClick={() => handleCategoryClick('decorations')}>Decorations</button>
        <button onClick={() => handleCategoryClick('events')}>Events</button>
        <button onClick={() => handleCategoryClick('items')}>Items</button>
        <button onClick={() => handleCategoryClick('locations')}>Locations</button>
        <button onClick={() => handleCategoryClick('monsters')}>Monsters</button>
        <button onClick={() => handleCategoryClick('skills')}>Skills</button>
        <button onClick={() => handleCategoryClick('weapons')}>Weapons</button>

        {currentCategory && <ItemList category={currentCategory} />}
      </header>
    </div>
  );
}

export default App;