export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
}

const personas: Persona[] = [
  { id: 1, nombre: 'Angel', apellido: 'Pincay', edad: 36 },
];

export async function obtenerTodos(): Promise<Persona[]> {
  return personas;
}

export async function obtenerPorId(id: number): Promise<Persona | undefined> {
  return personas.find((p) => p.id === id);
}

export async function CrearPersona(persona: Persona): Promise<Persona> {
  personas.push(persona);
  return persona;
}

export async function actualizar(id: number, datos: Partial<Persona>): Promise<Persona> {
  const personaExistente = (await obtenerPorId(id)) as Persona;
  const personaActualizada = { ...personaExistente, ...datos };
  const index = personas.indexOf(personaExistente);
  personas[index] = personaActualizada;
  return personaActualizada;
}

export async function eliminar(id: number): Promise<void> {
  const personaExistente = (await obtenerPorId(id)) as Persona;
  const index = personas.indexOf(personaExistente);
  personas.splice(index, 1);
}
