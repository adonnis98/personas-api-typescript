import express from 'express';
import morgan from 'morgan';
import saludoRouter from './routes/saludo.route.js';
import personaRouter from './routes/persona.route.js';
import { miPrimerMiddleware, validarApiKey } from './middlewares/global.middleware.js';

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(miPrimerMiddleware);
app.use(express.json());
app.use(morgan('dev'));

app.use('/saludo', saludoRouter);
app.use('/persona', validarApiKey, personaRouter);

app.listen(PORT, () => {
  console.log(`API Personas está corriendo en el puerto ${PORT}`);
});
