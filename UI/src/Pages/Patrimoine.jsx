import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form, Alert, Row, Col } from 'react-bootstrap';
import PatrimoineLineChart from '../components/PatrimoineLineChart';

function Patrimoine() {
  const [date, setDate] = useState('');
  const [donnees, setDonnees] = useState(null);
  const [totalValue, setTotalValue] = useState(0);
  const [error, setError] = useState(null);

  const handleValueAtDateSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending request with date:', date); 
      const response = await axios.get('/api/patrimoine/date', { params: { date } });
      console.log('Response data:', response.data); 
  
      const { totalValue, possessions } = response.data;
  
      setDonnees({
        labels: possessions.map(p => p.libelle),
        valeurs: possessions.map(p => p.valeurActuelle),
      });
      setTotalValue(totalValue);
    } catch (error) {
      console.error('Error in Axios request:', error); 
      setError('Erreur lors de la récupération des valeurs actuelles des possessions');
    }
  };
  
  return (
    <Container>
      <h1 className="my-4">Patrimony</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleValueAtDateSubmit}>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Validate</Button>
      </Form>
      {donnees && (
        <>
          <Row className="mt-4">
            <Col>
              <h4>Your total assets amount to:  {totalValue.toFixed(2)} Ariary</h4>
            </Col>
          </Row>
          <div className="mt-4">
            <PatrimoineLineChart donnees={donnees} />
          </div>
        </>
      )}
    </Container>
  );
}

export default Patrimoine;
