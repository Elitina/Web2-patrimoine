import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './../css/table.css'

function Tableau({ possessions, surCloturer, surSupprimer }) {
  return (
    <Table striped bordered hover className="custom-table">
      <thead>
        <tr>
          <th>Libelle</th>
          <th>Valeur</th>
          <th>Date Début</th>
          <th>Date Fin</th>
          <th>Taux</th>
          <th>Valeur Actuelle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map((possession) => (
          <tr key={possession.libelle}>
            <td>{possession.libelle}</td>
            <td>{possession.valeur}</td>
            <td>{possession.dateDebut}</td>
            <td>{possession.dateFin || 'Non clôturée'}</td>
            <td>{possession.taux}</td>
            <td>{possession.valeurActuelle}</td>
            <td>
              <Link to={`/possession/${possession.libelle}/update`}>
                <Button variant="warning" className="me-2 custom-button">Edit</Button>
              </Link>
              <Button
                variant="secondary"
                className="me-2 custom-button"
                onClick={() => surCloturer(possession.libelle)}
              >
                Close
              </Button>
              <Button
                variant="danger"
                className="custom-button"
                onClick={() => surSupprimer(possession.libelle)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Tableau;
