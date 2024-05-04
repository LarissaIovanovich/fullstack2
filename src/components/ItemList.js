import React, { useState, useRef, useEffect, useMemo } from 'react';
import axios from 'axios';

function ItemList({ category }) {
  const [items, setItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const searchTextRef = useRef('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchData = useMemo(() => {
    return async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://mhw-db.com/${category}`);
        setItems(response.data);
        setLoading(false);
        localStorage.setItem(`items_${category}`, JSON.stringify(response.data));
        localStorage.setItem(`lastFetchTime_${category}`, Date.now());
      } catch (error) {
        console.error('Erro ao obter os itens:', error);
        setLoading(false);
      }
    };
  }, [category]);

  useEffect(() => {
    setSelectedCategory(category); // Atualiza a categoria selecionada
    const cachedData = localStorage.getItem(`items_${category}`);
    const lastFetchTime = localStorage.getItem(`lastFetchTime_${category}`);
    if (cachedData && lastFetchTime && (Date.now() - parseInt(lastFetchTime, 10) < 10 * 60 * 1000)) {
      setItems(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetchData();
    }
  }, [category, fetchData]);

  const handleSearch = async () => {
    const searchText = searchTextRef.current.value.trim().toLowerCase();

    if (searchText === '') {
      setErrorMessage('Por favor, insira pelo menos 1 caracter para pesquisar.');
      fetchData(); // Recarrega a lista completa
      return;
    }

    try {
      const response = await axios.get(`https://mhw-db.com/${category}`);
      const allItems = response.data;

      const searchResults = allItems.filter(item =>
        item.name.toLowerCase().includes(searchText)
      );

      if (searchResults.length === 0) {
        setErrorMessage('Nenhum resultado encontrado.');
      } else {
        setErrorMessage('');
        setItems(searchResults);
      }
    } catch (error) {
      console.error('Erro ao pesquisar os itens:', error);
      setErrorMessage('Erro ao realizar a pesquisa.');
      setItems([]);
    }
  };

  return (
    <div style={{
      marginTop: "127px",
      marginBottom: '2px',
      border: '1px solid #ccc',
      padding: '10px',
      background: 'rgba(255, 255, 255, 0.21)',
      borderRadius: '16px',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(12.9px)',
      WebkitBackdropFilter: 'blur(12.9px)',
      maxHeight: '60vh',
      overflowY: 'auto',
      alignItems: "center",
      marginLeft: "-5px",
      marginRight: "-5px"
    }}>
      <h1>Lista de {selectedCategory}</h1>
      <div>
        <input 
          type="text" 
          id={`${selectedCategory}-search`} 
          className="form-control" 
          maxLength="50" 
          minLength="1" 
          placeholder="Pesquisar..." 
          ref={searchTextRef} 
        />
        <button onClick={handleSearch}>Buscar</button>
        <p id={`${selectedCategory}-error-message`} className="error-message">{errorMessage}</p>
        {loading && <p style={{ fontSize: "20px" }}>Carregando...</p>}
        <ul className="custom-list">
          {items.map(item => (
            <li key={item.id} className="list-item">{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ItemList;