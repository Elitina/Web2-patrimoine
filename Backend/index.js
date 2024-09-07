import express from 'express';
import bodyParser from 'body-parser'; 
import possessionRoute from './Route/possessionRoute.js'; 
import patrimoineRoute from './Route/patrimoineRoute.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/possession', possessionRoute);
app.use('/api/patrimoine', patrimoineRoute);

app.use((req, res, next) => {
  res.status(404).send('Route non trouvée');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});












