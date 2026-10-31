interface Saludo {
  nombreRecibido: string;
  mensaje: string;
}

export async function crearSaludo(nombre: string): Promise<Saludo> {
  return { nombreRecibido: nombre, mensaje: `Hola ${nombre}` };
}
