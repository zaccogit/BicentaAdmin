import moment from "moment";

export function generateUniqueId() {
  const timestamp = Date.now().toString(36); // Convertir la marca de tiempo actual a base36
  const randomStr = Math.random().toString(36).substr(2, 5); // Generar un número aleatorio y convertirlo a base36
  return timestamp + randomStr; // Combinar la marca de tiempo y el número aleatorio
}

export function contieneLetras(texto: string) {
  // Expresión regular para verificar si el texto contiene al menos una letra
  const regex = /[a-zA-Z]/;
  return regex.test(texto);
}

export function eliminarNoDuplicados(arr1: any, arr2: any) {
  // Compara si los arrays son iguales
  const sonIguales =
    JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());

  // Si los arrays no son iguales, elimina los elementos que no están duplicados
  if (!sonIguales) {
    const set1 = new Set(arr1.map((item: any) => item.id));
    const set2 = new Set(arr2.map((item: any) => item.id));

    // Elimina los elementos que no están duplicados en arr1
    arr1 = arr1.filter((item: any) => set2.has(item.id));

    // Elimina los elementos que no están duplicados en arr2
    arr2 = arr2.filter((item: any) => set1.has(item.id));
  }

  return [arr1, arr2];
}

export function ordenarPorId(arr: any[]) {
  return arr.slice().sort((a, b) => a.id - b.id);
}
export function eliminarObjetosDuplicados(array: any[]) {
  const map = new Map();

  // Utilizamos el método filter() para crear un nuevo array que contenga solo objetos únicos
  const arraySinDuplicados = array.filter((objeto) => {
    // Convertimos el objeto a una cadena JSON para usarlo como clave en el mapa
    const objetoString = JSON.stringify(objeto);

    // Si el mapa ya contiene la cadena JSON, significa que ya hemos visto este objeto
    // y lo filtramos del array
    if (map.has(objetoString)) {
      return false;
    }

    // Si el objeto no está en el mapa, lo agregamos y lo conservamos en el nuevo array
    map.set(objetoString, true);
    return true;
  });

  return arraySinDuplicados;
}

export function validarTokenDate(givenDate:string):boolean {
  // Convertir la fecha proporcionada a un objeto Moment
  const date = moment(givenDate); 
  // Obtener la fecha y hora actual como objeto Moment
  const now = moment();

  // Calcular la diferencia en horas
  const differenceInHours = now.diff(date, 'hours');

  // Verificar si han pasado 12 horas
  return differenceInHours >= 12;
}
