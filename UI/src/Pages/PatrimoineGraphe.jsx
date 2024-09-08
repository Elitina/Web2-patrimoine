import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Alert, Row, Col } from 'react-bootstrap';
import PatrimoineGraph from '../components/PatrimoineGraph';

function PatrimoineGraphe() {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [interval, setInterval] = useState(1);
  const [donnees, setDonnees] = useState(null);
  const [error, setError] = useState(null);

  const handleRangeValueSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Envoi de la requête avec:', { dateDebut, dateFin, interval });
      
      // Utilisez l'URL complète de votre backend, par exemple :
      const response = await axios.get('/api/patrimoine/range', {
        params: { dateDebut, dateFin, interval }
      });

      console.log('Réponse reçue:', response.data);

      const { dates, valeurs } = response.data;
      setDonnees({
        labels: dates,
        valeurs: valeurs,
      });
      setError(null);
    } catch (error) {
      console.error('Erreur lors de la requête Axios:', error);
      setError('Erreur lors de la récupération des données pour la plage de dates sélectionnée');
    }
  };

  return (
    <Container>
      <h1 className="my-4">Asset values by date range</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleRangeValueSubmit}>
        <Row>
          <Col>
            <Form.Group controlId="dateDebut">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dateFin">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="interval">
              <Form.Label>Interval day</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={interval}
                onChange={(e) => setInterval(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">Approve</Button>
      </Form>
      {donnees && (
        <>
          <Row className="mt-4">
            <Col>
              <h4>Patrimoine values on the Selected Beach</h4>
            </Col>
          </Row>
          <div className="mt-4">
            <PatrimoineGraph donnees={donnees} />
          </div>
        </>
      )}
    </Container>
  );
}

export default PatrimoineGraphe;
