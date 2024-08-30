import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import fs from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = resolve(__dirname, 'data.json');
export async function readFile() {
  try {
  const data = await fs.readFile(filePath, 'utf-8');
    return { status: 'OK', data: JSON.parse(data) };
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier:', error);
    return { status: 'ERROR', error: error.message };
  }
}
export async function writeFile(data) {
  try {
    if (typeof data !== 'object' || data === null) {
      throw new Error("Les données doivent être un objet JSON valide.");
    }
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { status: 'OK' };
  } catch (error) {
    console.error('Erreur lors de l\'écriture du fichier:', error);
    return { status: 'ERROR', error: error.message };
  }
}
