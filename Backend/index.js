import express from 'express';
import cors from 'cors';
import possessionRoute from './Route/possessionRoute.js'; 
import patrimoineRoute from './Route/patrimoineRoute.js'

const app = express();
const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.88.242:3000', 'https://front-1xkb.onrender.com'],
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/possession', possessionRoute);
app.use('/api/patrimoine', patrimoineRoute);

app.use((req, res, next) => {
  res.status(404).send('Route non trouvée');
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});











