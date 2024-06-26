export interface Usuario {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  contrasena:string;
  estado: boolean;
  telefono:string,
  direccion:string,
  roles: { _id: string, nombre: string }[]; // roles es un array de objetos con una propiedad nombre
  // otros campos que puedas tener...
}
