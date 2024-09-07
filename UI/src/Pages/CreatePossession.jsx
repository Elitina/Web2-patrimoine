import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function CreatePossession() {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [tauxAmortissement, setTauxAmortissement] = useState('');
  const [possesseur, setPossesseur] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const
        valeurNumerique = parseFloat(valeur);
      const tauxAmortissementNumerique = parseFloat(tauxAmortissement);

      const possesseurObject = { possesseur };

      await axios.post('/api/possession', {
        possesseur: possesseurObject,
        libelle,
        valeur: valeurNumerique,
        dateDebut,
        dateFin: dateFin || null,
        tauxAmortissement: tauxAmortissementNumerique,
      });
      navigate('/possession');
    } catch (error) {
      setError('Erreur lors de la création de la possession');
      console.error('Erreur lors de la création de la possession:', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Create a Possession</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Possesseur */}
        <Form.Group controlId="possesseur" className="mt-3">
          <Form.Label>Owner</Form.Label>
          <Form.Control
            type="text"
            value={possesseur}
            onChange={(e) => setPossesseur(e.target.value)}
            required
          />
        </Form.Group>

        {/* Libelle */}
        <Form.Group controlId="libelle" className="mt-3">
          <Form.Label>Libelle</Form.Label>
          <Form.Control
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </Form.Group>

        {/* Valeur */}
        <Form.Group controlId="valeur" className="mt-3">
          <Form.Label>Value</Form.Label>
          <Form.Control
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
        </Form.Group>

        {/* Date Debut */}
        <Form.Group controlId="dateDebut" className="mt-3">
          <Form.Label>Start date</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
        </Form.Group>

        {/* Date Fin */}
        <Form.Group controlId="dateFin" className="mt-3">
          <Form.Label>End date (optional)</Form.Label>
          <Form.Control type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} />
        </Form.Group>

        {/* Taux Amortissement */}
        <Form.Group controlId="tauxAmortissement" className="mt-3">
          <Form.Label>Amortization rate</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={tauxAmortissement}
            onChange={(e) => setTauxAmortissement(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create
        </Button>
      </Form>
    </Container>
  );
}

export default CreatePossession;