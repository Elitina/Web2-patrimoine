import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function ModifierPossession() {
  const { libelle } = useParams();
  const [possession, setPossession] = useState({});
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [taux, setTaux] = useState('');
  const [valeurActuelle, setValeurActuelle] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPossession = async () => {
      try {
        const response = await axios.get(`/api/possession/${libelle}`);
        const { valeur, dateDebut, dateFin, taux, valeurActuelle } = response.data;
        setPossession(response.data);
        setValeur(valeur || '');
        setDateDebut(dateDebut || '');
        setDateFin(dateFin || '');
        setTaux(taux || '');
        setValeurActuelle(valeurActuelle || '');
      } catch (error) {
        console.error('Erreur lors de la récupération de la possession:', error);
        setError('Erreur lors de la récupération de la possession');
      } finally {
        setLoading(false);
      }
    };

    fetchPossession();
  }, [libelle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/possession/${libelle}`, {
        libelle,
        valeur,
        dateDebut,
        dateFin,
        taux
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
            value={possession.libelle || ''}
            readOnly
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
          <Form.Label>Date de Début</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="dateFin" className="mt-3">
          <Form.Label>Date de Fin</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="taux" className="mt-3">
          <Form.Label>Taux</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="valeurActuelle" className="mt-3">
          <Form.Label>Valeur Actuelle</Form.Label>
          <Form.Control
            type="text"
            value={valeurActuelle}
            readOnly
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Mettre à Jour</Button>
      </Form>
    </Container>
  );
}

export default ModifierPossession;
