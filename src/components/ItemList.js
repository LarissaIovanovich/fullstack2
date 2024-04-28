// src/components/ItemList.js
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';


function ItemList({ category }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useMemo(() => {
    return () => {
      setLoading(true);
      axios.get(`https://mhw-db.com/${category}`)
        .then(response => {
          setItems(response.data);
          setLoading(false);
          localStorage.setItem(`items_${category}`, JSON.stringify(response.data));
          localStorage.setItem(`lastFetchTime_${category}`, Date.now());
        })
        .catch(error => {
          console.error('Erro ao obter os itens:', error);
          setLoading(false);
        });
    };
  }, [category]);

  const cachedItems = useMemo(() => {
    const cachedData = localStorage.getItem(`items_${category}`);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return [];
  }, [category]);

  const lastFetchTime = useMemo(() => {
    const timestamp = localStorage.getItem(`lastFetchTime_${category}`);
    return timestamp ? parseInt(timestamp, 10) : null;
  }, [category]);

  useEffect(() => {
    const fetchDataAndCache = async () => {
      if (cachedItems.length > 0 && lastFetchTime && (Date.now() - lastFetchTime < 10 * 60 * 1000)) {
        setItems(cachedItems);
        setLoading(false);
      } else {
        await fetchData();
      }
    };

    fetchDataAndCache();
  }, [category, cachedItems, lastFetchTime, fetchData]);

  return (
    <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
      <h1>Lista de {category}</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ItemList;
