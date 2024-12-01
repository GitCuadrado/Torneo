export interface Game {
  id: number,
  date: Date,
  venue: string,
  homeTeam_id: number,
  awayTeam_id: number,
  startTimeUTC: Date,
  finished: boolean,
  homeName: string,
  awayName: string,
}
export interface Grupo{
  nombre:string,
  id:string,
  puntos:string,
  grupoCerrado:boolean,
  opcionCorrecta:string;
  opciones:Opcion[]
}
export interface Opcion{
  id:string,
  nombre:string
  opcionSeleccionada:boolean
}
export interface Usuario{
  nombre:string,
  puntos:string
}
export interface Ranking{
  nombre:string,
  puntos:string,
  aciertos:string,
  gruposAcertados:Grupo[]
}
export interface Premio{
  nombre:string,
  gruposGanados:Grupo[]
}