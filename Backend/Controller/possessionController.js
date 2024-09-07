import { readFile, writeFile } from '../../data/index.js';


export function calculateCurrentValue(valeur, tauxAmortissement, dateDebut, dateFin) {
  const now = new Date();
  const startDate = new Date(dateDebut);
  const endDate = dateFin ? new Date(dateFin) : now;
  const monthsPassed =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    endDate.getMonth() -
    startDate.getMonth();

  const valeurActuelle = tauxAmortissement >= 0
    ? valeur * Math.pow(1 - tauxAmortissement / 100, monthsPassed)
    : valeur * Math.pow(1 + Math.abs(tauxAmortissement) / 100, monthsPassed);

  return Math.round(valeurActuelle * 100) / 100;
}

export async function getPossessions(req, res) {
  try {
    const { status, data } = await readFile();

    if (status === 'OK') {
      const patrimoineData = data.find(item => item.model === 'Patrimoine');

      if (patrimoineData && patrimoineData.data && patrimoineData.data.possessions) {
        const possessionsWithCurrentValue = patrimoineData.data.possessions.map(possession => {
          const valeurActuelle = calculateCurrentValue(
            possession.valeur,
            possession.tauxAmortissement,
            possession.dateDebut,
            possession.dateFin
          );
          return { ...possession, valeurActuelle };
        });

        res.json(possessionsWithCurrentValue);
      } else {
        res.status(404).json({ error: 'Aucune possession trouvée' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des possessions' });
  }
}

export async function addPossession(req, res) {
  try {
    const { possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, status } = req.body;

    const { status: readStatus, data } = await readFile();

    if (readStatus === 'OK') {
      const patrimoineData = data.find(item => item.model === 'Patrimoine');

      if (patrimoineData && patrimoineData.data && patrimoineData.data.possessions) {
        const nouvellePossession = {
          possesseur: { possesseur },
          libelle,
          valeur,
          dateDebut,
          dateFin: dateFin || null,
          tauxAmortissement,
          status,
          valeurActuelle: calculateCurrentValue(valeur, tauxAmortissement, dateDebut, dateFin)
        };

        patrimoineData.data.possessions.push(nouvellePossession);

        await writeFile(data);
        res.status(201).json(nouvellePossession);
      } else {
        res.status(404).json({ error: "Impossible d'ajouter la possession, aucune donnée Patrimoine trouvée" });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'ajout de la possession", details: error.message });
  }
}


export async function updatePossession(req, res) {
  try {
    const { libelle } = req.params;
    const updatedData = req.body;
    const { status: readStatus, data } = await readFile();

    if (readStatus === 'OK') {
      const patrimoineData = data.find(item => item.model === 'Patrimoine');

      if (patrimoineData && patrimoineData.data && patrimoineData.data.possessions) {
        const possessionIndex = patrimoineData.data.possessions.findIndex(p => p.libelle === libelle);

        if (possessionIndex !== -1) {
          const updatedPossession = { ...patrimoineData.data.possessions[possessionIndex], ...updatedData };
          updatedPossession.valeurActuelle = calculateCurrentValue(
            updatedPossession.valeur,
            updatedPossession.tauxAmortissement,
            updatedPossession.dateDebut,
            updatedPossession.dateFin
          );
          patrimoineData.data.possessions[possessionIndex] = updatedPossession;
          await writeFile(data);
          res.json(updatedPossession);
        } else {
          res.status(404).json({ error: 'Possession non trouvée' });
        }
      } else {
        res.status(404).json({ error: 'Données de patrimoine introuvables' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la possession' });
  }
}


export async function closePossession(req, res) {
  try {
    const { libelle } = req.params;
    const { status: readStatus, data } = await readFile();

    if (readStatus === 'OK') {
      const patrimoineData = data.find(item => item.model === 'Patrimoine');

      if (patrimoineData && patrimoineData.data && patrimoineData.data.possessions) {
        const possessionIndex = patrimoineData.data.possessions.findIndex(p => p.libelle.trim() === libelle.trim());
        if (possessionIndex !== -1) {
          patrimoineData.data.possessions[possessionIndex].dateFin = new Date().toISOString().split('T')[0];
          patrimoineData.data.possessions[possessionIndex].status = 'closed';
          await writeFile(data);
          res.json({ message: 'Possession clôturée avec succès' });
        } else {
          res.status(404).json({ error: 'Possession non trouvée' });
        }
      } else {
        res.status(404).json({ error: 'Données de patrimoine introuvables' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la clôture de la possession', details: error.message });
  }
}

export async function getPossessionByLibelle(req, res) {
  try {
    const { libelle } = req.params;
    const { status: readStatus, data } = await readFile();

    if (readStatus === 'OK') {
      const patrimoineData = data.find(item => item.model === 'Patrimoine');

      if (patrimoineData && patrimoineData.data && patrimoineData.data.possessions) {
        const possession = patrimoineData.data.possessions.find(p => p.libelle === libelle);
        if (possession) {
          const valeurActuelle = calculateCurrentValue(
            possession.valeur,
            possession.tauxAmortissement,
            possession.dateDebut,
            possession.dateFin
          );
          res.json({ ...possession, valeurActuelle });
        } else {
          res.status(404).json({ error: 'Possession non trouvée' });
        }
      } else {
        res.status(404).json({ error: 'Données de patrimoine introuvables' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la possession' });
  }
}
