import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function ModifierPossession() {
  const { libelle: initialLibelle } = useParams();
  const [libelle, setLibelle] = useState(initialLibelle);
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPossession = async () => {
      try {
        const response = await axios.get(`/api/possession/${initialLibelle}`);
        const { valeur, dateDebut, dateFin, tauxAmortissement } = response.data;
        setLibelle(response.data.libelle || '');
        setValeur(valeur || '');
        setDateDebut(dateDebut || '');
        setDateFin(dateFin || '');
        setTauxAmortissement(tauxAmortissement || '');
      } catch (error) {
        console.error('Erreur lors de la récupération de la possession:', error);
        setError('Erreur lors de la récupération de la possession');
      } finally {
        setLoading(false);
      }
    };

    fetchPossession();
  }, [initialLibelle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/possession/${initialLibelle}`, {
        libelle,
        valeur,
        dateDebut,
        dateFin,
        tauxAmortissement
      });
      navigate('/possession');
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la possession:', error);
      setError('Erreur lors de la mise à jour de la possession');
    }
  };

  if (loading) {
    return (
      <Container>
        <h1 className="my-4">Modifier la Possession</h1>
        <Spinner animation="border" />
        <span className="ms-2">Chargement...</span>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="my-4">Modifier la Possession</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="libelle">
          <Form.Label>Libelle</Form.Label>
          <Form.Control
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="valeur" className="mt-3">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="dateDebut" className="mt-3">
          <Form.Label>Date de début</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="dateFin" className="mt-3">
          <Form.Label>Date de fin</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="tauxAmortissement" className="mt-3">
          <Form.Label>Taux d'amortissement</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={tauxAmortissement}
            onChange={(e) => setTauxAmortissement(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Mettre à jour</Button>
      </Form>
    </Container>
  );
}

export default ModifierPossession;
