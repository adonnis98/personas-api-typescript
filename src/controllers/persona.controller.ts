import { Request, Response } from 'express';
import * as service from '../services/persona.service.js';

export const obtenerTodos = async (req: Request, res: Response): Promise<void> => {
  const resultado = await service.obtenerTodos();
  res.json(resultado);
};

export const obtenerPorId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).send('El Id debe ser un número');
    return;
  }

  const parsedId = parseInt(id);
  const persona = await service.obtenerPorId(parsedId);

  if (!persona) {
    res.status(404).send(`Persona con id ${parsedId} no existe`);
    return;
  }

  res.json(persona);
};

export const crear = async (req: Request, res: Response): Promise<void> => {
  const persona = req.body;
  const personaCreada = await service.CrearPersona(persona);
  res.status(201).json({ mensaje: 'Persona creada', persona: personaCreada });
};

export const actualizar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const datos = req.body;
  const parsedId = parseInt(id);

  const personaExistente = await service.obtenerPorId(parsedId);
  if (!personaExistente) {
    res.status(404).json({ mensaje: `Persona con id ${parsedId} no existe` });
    return;
  }

  const personaActualizada = await service.actualizar(parsedId, datos);
  res.json({ mensaje: 'Persona fue actualizada', persona: personaActualizada });
};

export const eliminar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const parsedId = parseInt(id);

  const personaExistente = await service.obtenerPorId(parsedId);
  if (!personaExistente) {
    res.status(404).json({ mensaje: `Persona con id ${parsedId} no existe` });
    return;
  }

  await service.eliminar(parsedId);
  res.json({ mensaje: 'Persona eliminada' });
};
