import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function PatrimoineGraph({ donnees }) {
  const donneesGraphique = {
    labels: donnees?.labels || [],
    datasets: [
      {
        label: 'Valeur du Patrimoine',
        data: donnees?.valeurs || [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Graphique des Valeurs du Patrimoine',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dates',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valeur du Patrimoine (€)',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={donneesGraphique} options={options} />;
}

export default PatrimoineGraph;
