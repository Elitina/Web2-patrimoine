import { readFile } from "../../data/index.js";
import { calculateCurrentValue } from "./possessionController.js";

export default async function getTotalValueAtDate(req, res) {
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
