import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreatePossession() {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [taux, setTaux] = useState(''); // Taux d'amortissement
  const [possesseur, setPossesseur] = useState('');
  const [status, setStatus] = useState('non clôturé'); // Valeur par défaut
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assurez-vous que les valeurs sont correctement formatées
      const valeurNumerique = parseFloat(valeur);
      const tauxNumerique = parseFloat(taux);

      await axios.post('/api/possession', {
        libelle,
        valeur: valeurNumerique,
        dateDebut,
        dateFin,
        taux: tauxNumerique, // Utilisé pour le taux d'amortissement
        possesseur,
        status
      });
      navigate('/possession');
    } catch (error) {
      setError('Erreur lors de la création de la possession');
      console.error('Erreur lors de la création de la possession:', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Créer une Possession</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="libelle">
          <Form.Label>Libelle</Form.Label>
          <Form.Control
            type="text"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="valeur" className="mt-3">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dateDebut" className="mt-3">
          <Form.Label>Date de Début</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dateFin" className="mt-3">
          <Form.Label>Date de Fin (facultatif)</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="taux" className="mt-3">
          <Form.Label>Taux d'Amortissement</Form.Label>
          <Form.Control
            type="number"
            step="0.01" // Assurez-vous que les valeurs décimales sont possibles
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="possesseur" className="mt-3">
          <Form.Label>Possesseur</Form.Label>
          <Form.Control
            type="text"
            value={possesseur}
            onChange={(e) => setPossesseur(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="status" className="mt-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="non clôturé">Non Clôturé</option>
            <option value="clôturé">Clôturé</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Créer</Button>
      </Form>
    </Container>
  );
}

export default CreatePossession
;
