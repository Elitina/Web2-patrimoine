import { readFile } from "../../data/index.js";
import { calculateCurrentValue } from "./possessionController.js";

export async function getTotalValueAtDate (req, res) {
  try {
    console.log('Request received with date:', req.query.date);
    const { date } = req.query;
    const { status, data } = await readFile();

    if (status === 'OK') {
      const patrimoineData = data.find(item => item.model === 'Patrimoine');

      if (patrimoineData && patrimoineData.data && patrimoineData.data.possessions) {
        const possessionsWithCurrentValue = patrimoineData.data.possessions.map(possession => {
          const valeurActuelle = calculateCurrentValue(
            possession.valeur,
            possession.tauxAmortissement,
            possession.dateDebut,
            possession.dateFin || date
          );
          return { ...possession, valeurActuelle };
        });

        const totalValue = possessionsWithCurrentValue.reduce((sum, possession) => sum + possession.valeurActuelle, 0);

        console.log('Calculated totalValue:', totalValue);

        res.json({ totalValue, possessions: possessionsWithCurrentValue });
      } else {
        res.status(404).json({ error: 'Données de patrimoine introuvables' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    console.error('Error in getTotalValueAtDate:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des valeurs actuelles', details: error.message });
  }
}



export async function getValuesByDateRange(req, res) {
  try {
    const { dateDebut, dateFin, interval } = req.query;

    console.log('Params:', { dateDebut, dateFin, interval });

    if (!dateDebut || !dateFin || !interval) {
      return res.status(400).json({ error: 'Les paramètres dateDebut, dateFin et interval sont requis' });
    }

    const start = new Date(dateDebut);
    const end = new Date(dateFin);
    const dayInterval = parseInt(interval, 10);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ error: 'Les dates fournies sont invalides' });
    }

    const { status: readStatus, data } = await readFile();
    console.log('Read Status:', readStatus);
    console.log('Data:', data);

    if (readStatus === 'OK') {
      const patrimoineData = data.find(item => item.model === 'Patrimoine');
      console.log('Patrimoine Data:', patrimoineData);

      if (patrimoineData && patrimoineData.data && Array.isArray(patrimoineData.data.possessions)) {
        const dates = [];
        const valeurs = [];

        for (let currentDate = new Date(start); currentDate <= end; currentDate.setDate(currentDate.getDate() + dayInterval)) {
          const formattedDate = currentDate.toISOString().split('T')[0];
          console.log('Date courante:', formattedDate);
          dates.push(formattedDate);

          const possessionsWithCurrentValue = patrimoineData.data.possessions.map(possession => {
            const valeurActuelle = calculateCurrentValue(
              possession.valeur,
              possession.tauxAmortissement,
              possession.dateDebut,
              formattedDate
            );
            return { ...possession, valeurActuelle };
          });

          const valeurTotal = possessionsWithCurrentValue.reduce((sum, possession) => sum + possession.valeurActuelle, 0);

          valeurs.push(Math.round(valeurTotal * 100) / 100);
        }

        console.log('Valeurs finales:', valeurs);
        res.json({ dates, valeurs });
      } else {
        console.error('Structure des données incorrecte ou aucune possession trouvée');
        res.status(404).json({ error: 'Aucune possession trouvée dans les données de patrimoine' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    console.error('Erreur lors du traitement de la demande:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des valeurs pour la plage de dates sélectionnée', details: error.message });
  }
}




/*
async function testGetValuesByDateRange() {
  const req = {
    query: {
      dateDebut: '2024-09-01',
      dateFin: '2024-09-18',
      interval: '1',
    },
  };

  const res = {
    json: (data) => console.log('Réponse JSON:', data),
    status: (statusCode) => {
      console.log('Code de statut:', statusCode);
      return {
        json: (data) => console.log('Réponse JSON avec statut:', data),
      };
    },
  };

  await getValuesByDateRange(req, res);
}
testGetValuesByDateRange();
*/