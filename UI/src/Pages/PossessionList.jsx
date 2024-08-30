import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Tableau from '../components/Tableau';
import './../css/possessionList.css'

function ListePossessions() {
  const [possessions, setPossessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPossessions = async () => {
      try {
        const response = await axios.get('/api/possession');
        console.log('Possessions récupérées:', response.data);
        setPossessions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des possessions:', error);
        setError('Erreur lors de la récupération des possessions');
      } finally {
        setLoading(false);
      }
    };

    fetchPossessions();
  }, []);

  const handleCloturer = async (libelle) => {
    try {
      console.log(`Tentative de clôture pour : ${libelle}`);
      const response = await axios.patch(`/api/possession/${libelle}/close`);
      console.log('Réponse du serveur:', response.data);
      
      setPossessions((prev) => prev.filter((possession) => possession.libelle !== libelle));
    } catch (error) {
      console.error('Erreur lors de la clôture de la possession:', error);
      setError('Erreur lors de la clôture de la possession');
    }
  };

  const handleSupprimer = async (libelle) => {
    try {
      console.log(`Tentative de suppression pour : ${libelle}`);
      await axios.delete(`/api/possession/${libelle}`);
      console.log('Suppression réussie');
      
      setPossessions((prev) => prev.filter((possession) => possession.libelle !== libelle));
    } catch (error) {
      console.error('Erreur lors de la suppression de la possession:', error);
      setError('Erreur lors de la suppression de la possession');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container>
      <h1 className="my-4"></h1>
      <Button className="create-possession-btn" onClick={() => navigate('/possession/create')}>Create Possession</Button>
      {possessions.length > 0 ? (
        <Tableau 
          possessions={possessions} 
          surCloturer={handleCloturer} 
          surSupprimer={handleSupprimer} 
        />
      ) : (
        <div>Aucune possession trouvée</div>
      )}
    </Container>
  );
}

export default ListePossessions;
