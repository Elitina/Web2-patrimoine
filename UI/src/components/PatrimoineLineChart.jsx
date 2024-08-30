import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function PatrimoineLineChart({ donnees }) {
  const donneesGraphique = {
    labels: donnees?.labels || [],
    datasets: [
      {
        label: 'Valeur du Patrimoine',
        data: donnees?.valeurs || [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return <Line data={donneesGraphique} />;
}

export default PatrimoineLineChart;
