import { readFile } from "../../data/index.js";
import { calculateCurrentValue } from "./possessionController.js";
export default async function getTotalValueAtDate(req, res) {
  try {
    console.log('Request received with date:', req.query.date); // Ajoutez ceci pour vérifier la date reçue
    const { date } = req.query; 
    const { status, data } = await readFile();

    if (status === 'OK') {
      const possessionsWithCurrentValue = data.possessions.map(possession => {
        const valeurActuelle = calculateCurrentValue(
          possession.valeur,
          possession.taux,
          possession.dateDebut,
          possession.dateFin || date 
        );
        return { ...possession, valeurActuelle };
      });

      const totalValue = possessionsWithCurrentValue.reduce((sum, possession) => sum + possession.valeurActuelle, 0);

      console.log('Calculated totalValue:', totalValue); // Ajoutez ceci pour vérifier le totalValue calculé

      res.json({ totalValue, possessions: possessionsWithCurrentValue });
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    console.error('Error in getTotalValueAtDate:', error.message); // Ajoutez ceci pour afficher les erreurs
    res.status(500).json({ error: 'Erreur lors de la récupération des valeurs actuelles', details: error.message });
  }
}
