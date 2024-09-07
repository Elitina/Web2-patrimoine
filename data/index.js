import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, 'data.json');

export async function readFile() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    const patrimoineData = jsonData.find(item => item.model === 'Patrimoine');
    if (!patrimoineData) {
      throw new Error('Données de patrimoine non trouvées dans le fichier.');
    }

    const personneData = jsonData.find(item => item.model === 'Personne');
    if (!personneData) {
      throw new Error('Données de personne non trouvées dans le fichier.');
    }

    return { status: 'OK', data: jsonData };
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return { status: 'ERROR', error: error.message };
  }
}

export async function writeFile(data) {
  try {
    if (typeof data !== 'object' || data === null || !Array.isArray(data)) {
      throw new Error('Les données doivent être un tableau JSON valide.');
    }

    const patrimoineData = data.find(item => item.model === 'Patrimoine');
    if (!patrimoineData) {
      throw new Error('Données de patrimoine manquantes dans les données fournies.');
    }

    const personneData = data.find(item => item.model === 'Personne');
    if (!personneData) {
      throw new Error('Données de personne manquantes dans les données fournies.');
    }

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { status: 'OK' };
  } catch (error) {
    console.error('Erreur lors de l\'écriture du fichier:', error);
    return { status: 'ERROR', error: error.message };
  }
}
