import { readFile, writeFile } from '../../data/index.js';

export async function getPossessions(req, res) {
  try {
    const { status, data } = await readFile();

    if (status === 'OK') {
      const possessionsWithCurrentValue = data.possessions.map(possession => {
        const valeurActuelle = calculateCurrentValue(
          possession.valeur,
          possession.taux,
          possession.dateDebut,
          possession.dateFin
        );
        return { ...possession, valeurActuelle };
      });

      res.json(possessionsWithCurrentValue);
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des possessions' });
  }
}

export function calculateCurrentValue(valeur, taux, dateDebut, dateFin) {
  const now = new Date();
  const startDate = new Date(dateDebut);
  const endDate = dateFin ? new Date(dateFin) : now;
  const monthsPassed = (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth();
  return valeur * Math.pow(1 + taux / 100, monthsPassed);
}

export async function addPossession(req, res) {
  try {
    const { libelle, valeur, dateDebut, taux, dateFin, possesseur, status } = req.body;
    const { status: readStatus, data } = await readFile();

    if (readStatus === 'OK') {
      const nouvellePossession = {
        libelle,
        valeur,
        dateDebut,
        taux,
        dateFin,
        possesseur,
        status,
        valeurActuelle: calculateCurrentValue(valeur, taux, dateDebut, dateFin)
      };

      data.possessions.push(nouvellePossession);
      await writeFile(data);
      res.status(201).json(nouvellePossession);
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la possession', details: error.message });
  }
}

export async function updatePossession(req, res) {
  try {
    const { libelle } = req.params;
    const updatedData = req.body;
    const { status: readStatus, data } = await readFile();

    if (readStatus === 'OK') {
      const possessionIndex = data.possessions.findIndex(p => p.libelle === libelle);

      if (possessionIndex !== -1) {
        const updatedPossession = { ...data.possessions[possessionIndex], ...updatedData };
        updatedPossession.valeurActuelle = calculateCurrentValue(
          updatedPossession.valeur,
          updatedPossession.taux,
          updatedPossession.dateDebut,
          updatedPossession.dateFin
        );
        data.possessions[possessionIndex] = updatedPossession;
        await writeFile(data);
        res.json(updatedPossession);
      } else {
        res.status(404).json({ error: 'Possession non trouvée' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la possession' });
  }
}

export async function deletePossession(req, res) {
  try {
    const { libelle } = req.params;
    const { status: readStatus, data } = await readFile();

    if (readStatus === 'OK') {
      const filteredPossessions = data.possessions.filter(p => p.libelle !== libelle);

      if (filteredPossessions.length < data.possessions.length) {
        data.possessions = filteredPossessions;
        await writeFile(data);
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'Possession non trouvée' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la possession', details: error.message });
  }
}

export async function closePossession(req, res) {
  try {
    const { libelle } = req.params;

    const { status: readStatus, data } = await readFile();

    if (readStatus === 'OK') {
      const possessionIndex = data.possessions.findIndex(p => p.libelle.trim() === libelle.trim());
      if (possessionIndex !== -1) {
        data.possessions[possessionIndex].dateFin = new Date().toISOString().split('T')[0];
        data.possessions[possessionIndex].status = 'clôturé';
        await writeFile(data);
        res.json({ message: 'Possession clôturée avec succès' });
      } else {
        res.status(404).json({ error: 'Possession non trouvée' });
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
      const possession = data.possessions.find(p => p.libelle === libelle);
      if (possession) {
        const valeurActuelle = calculateCurrentValue(
          possession.valeur,
          possession.taux,
          possession.dateDebut,
          possession.dateFin
        );
        res.json({ ...possession, valeurActuelle });
      } else {
        res.status(404).json({ error: 'Possession non trouvée' });
      }
    } else {
      res.status(500).json({ error: 'Erreur lors de la récupération des données' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la possession' });
  }
}
